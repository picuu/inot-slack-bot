import { Repositories } from '@/models'
import { getUserRepos } from '@/services'
import type { Block } from '@/types'
import { Pagination } from '@/utils'
import type { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt'

type Args = AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>

const listReposNextPage = async ({ ack, respond, client, logger, payload, body }: Args) => {
  try {
    await ack()

    logger.info('Next page button clicked')
    logger.info(payload)

    // @ts-expect-error - Value DOES exist in payload, but is not typed
    const { username, paginatedReposBlocksPageSize, currentPageIndex } = JSON.parse(payload.value)

    const [error, resposResponse] = await getUserRepos(username)
    if (error) return await respond(error)
    if (resposResponse?.length === 0) return await respond(`No repos found for user ${username}`)

    const repos = new Repositories(resposResponse)
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
      ...paginatedReposBlocks.getPage(currentPageIndex + 1),
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
              currentPageIndex: currentPageIndex + 1
            }),
            action_id: 'list-repos_next-page'
          }
        ]
      }
    ]

    await client.chat.update({
      // biome-ignore lint/style/noNonNullAssertion: channel may be undefined, depending on the source of this action (did it come from an action within a conversation message or a modal?). take care!
      channel: body.channel!.id,
      // biome-ignore lint/style/noNonNullAssertion: message may be undefined, depending on the source of this action (did it come from an action within a conversation message or a modal?). take care!
      ts: body.message!.ts,
      text: `*${'repos.getAmount()'}* repos found for user *${'username'}*`,
      blocks
    })
  } catch (error) {
    logger.error(error)
  }
}

export default listReposNextPage
