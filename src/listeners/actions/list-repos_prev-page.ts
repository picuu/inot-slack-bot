import { ApiError } from '@/errors'
import { Repositories } from '@/models'
import { getUserRepos } from '@/services'
import type { Block } from '@/types'
import { Pagination } from '@/utils'
import type { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt'

type Args = AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>

const listReposPrevPage = async ({ ack, respond, client, logger, payload, body }: Args) => {
  try {
    await ack()

    // @ts-expect-error - Value DOES exist in payload, but is not typed
    const { username, paginatedReposBlocksPageSize, currentPageIndex: prevPageIndex } = JSON.parse(payload.value)
    const currentPageIndex = prevPageIndex - 1

    const reposResponse = await getUserRepos(username)

    const repos = new Repositories(reposResponse)
    const paginatedReposBlocks = new Pagination<Block>(repos.getDisplayBlocks(), paginatedReposBlocksPageSize)

    const prevPageButton = {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Previous page'
      },
      value: JSON.stringify({
        username,
        paginatedReposBlocksPageSize,
        currentPageIndex: currentPageIndex
      }),
      action_id: 'list-repos_prev-page'
    }

    const nextPageButton = {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Next page'
      },
      value: JSON.stringify({
        username,
        paginatedReposBlocksPageSize,
        currentPageIndex: currentPageIndex
      }),
      action_id: 'list-repos_next-page'
    }

    const actions = {
      type: 'actions',
      elements: [nextPageButton]
    }

    if (currentPageIndex > 0) actions.elements.unshift(prevPageButton)

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:mag: *${repos.getAmount()}* repos found for user *${username}*`
        }
      },
      { type: 'divider' },
      ...paginatedReposBlocks.getPage(currentPageIndex),
      actions
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
    if (error instanceof ApiError) return respond(error.message)
    logger.error(error)
  }
}

export default listReposPrevPage
