import { ApiError } from '@/errors'
import { Repositories } from '@/models'
import { getUserRepos } from '@/services'
import type { Block } from '@/types'
import { Pagination } from '@/utils'
import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt'

type Args = AllMiddlewareArgs & SlackCommandMiddlewareArgs

const listRepos = async ({ client, ack, respond, logger, command }: Args) => {
  try {
    await ack()

    const [username] = command.text.split(' ')
    if (!username) return await respond('Please provide a username to search for.')

    const reposResponse = await getUserRepos(username)

    const repos = new Repositories(reposResponse)
    const paginatedReposBlocksPageSize = 9 // TODO: improve this (when no labels are present, the blocks amount is less, so groups arent of 3 anymore)
    const paginatedReposBlocks = new Pagination<Block>(repos.getDisplayBlocks(), paginatedReposBlocksPageSize)

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:mag: *${repos.getAmount()}* repos found for user *${username}*`
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
    if (error instanceof ApiError) return respond(error.message)
    logger.error(error)
  }
}

export default listRepos
