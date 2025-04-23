import type { RepositoryResponse } from '@/types'
import { SimpleUser } from '@/models'

class Repository {
  public readonly id: number
  public readonly name: string
  public readonly full_name: string
  public readonly owner: SimpleUser
  public readonly html_url: string
  public readonly url: string
  public readonly description: string | null
  public readonly topics?: string[]

  constructor(repository: RepositoryResponse) {
    this.id = repository.id
    this.name = repository.name
    this.full_name = repository.full_name
    this.owner = new SimpleUser(repository.owner)
    this.html_url = repository.html_url
    this.url = repository.url
    this.description = repository.description
    this.topics = repository.topics || []
  }

  hasTopics() {
    return this.topics && this.topics.length > 0
  }

  getDisplayBlocks() {
    const blocks = []

    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<${this.url}|${this.name}>*\n${this.description ? this.description : ''}`
      }
    })

    if (this.hasTopics())
      blocks.push({
        type: 'context',
        elements: [{ type: 'mrkdwn', text: `🏷️ *Topics:* ${this.topics?.join(' | ')}` }]
      })

    return blocks
  }
}

export default Repository
