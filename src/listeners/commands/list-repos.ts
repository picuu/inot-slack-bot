import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt'
import { getUserRepos } from '@/services'
import { Repositories } from '@/models'
import { Pagination } from '@/utils'
import type { Block } from '@/types'

type Args = AllMiddlewareArgs & SlackCommandMiddlewareArgs

const listRepos = async ({ client, ack, respond, logger, command }: Args) => {
  try {
    await ack()

    const [username] = command.text.split(' ')
    if (!username) return await respond('Please provide a username to search for.')

    const [error, resposResponse] = await getUserRepos(username)
    if (error) return await respond(error)
    if (resposResponse?.length === 0) return await respond(`No repos found for user ${username}`)

    const repos = new Repositories(resposResponse)
    const paginatedReposBlocksPageSize = 9
    const paginatedReposBlocks = new Pagination<Block>(repos.getDisplayBlocks(), paginatedReposBlocksPageSize)

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${repos.getAmount()}* repos found for user *${username}*`
        }
      },
      {
        type: 'divider'
      },
      ...paginatedReposBlocks.getFirstPage(),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              emoji: true,
              text: 'Next page'
            },
            value: JSON.stringify({
              username,
              paginatedReposBlocksPageSize,
              currentPageIndex: paginatedReposBlocks.getCurrentPageIndex()
            }),
            action_id: 'list-repos_next-page'
          }
        ]
      }
    ]

    await client.chat.postMessage({
      channel: command.channel_id,
      text: `*${repos.getAmount()}* repos found for user *${username}*`,
      blocks
    })
  } catch (error) {
    logger.error(error)
  }
}

export default listRepos
