import type { RepositoryResponse } from '@/types'
import { SimpleUser } from '@/models'

class Repository {
  id: number
  name: string
  full_name: string
  owner: SimpleUser
  html_url: string
  url: string
  description: string | null
  topics?: string[]

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
}

export default Repository
