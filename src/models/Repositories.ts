import type { RepositoryResponse, Block } from '@/types'
import { Repository } from '@/models'

class Repositories {
  #repositories: Repository[]

  constructor(repositories: RepositoryResponse[]) {
    this.#repositories = repositories.map((repository) => new Repository(repository))
  }

  getAmount() {
    return this.#repositories.length
  }

  getNames() {
    return this.#repositories.map((repo) => repo.name)
  }

  getDisplayBlocks = () => {
    const blocks: Block[] = []
    const divider = { type: 'divider' }

    this.#repositories.forEach((repo) => {
      const section = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*<${repo.url}|${repo.name}>*\n${repo.description || 'No description provided'}` // TODO: remove description if not provided
        }
      }

      const context = {
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `🏷️ *Topics:* ${repo.topics?.join(' | ')}` }]
      }

      blocks.push(section)
      if (repo.hasTopics()) blocks.push(context)
      blocks.push(divider)
    })

    return blocks
  }
}

export default Repositories
