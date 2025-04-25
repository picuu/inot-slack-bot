import { Repository } from '@/models'
import type { Block, RepositoryResponse } from '@/types'

class Repositories {
  private repositories: Repository[]

  constructor(repositories: RepositoryResponse[]) {
    this.repositories = repositories.map((repository) => new Repository(repository))
  }

  getAmount() {
    return this.repositories.length
  }

  getNames() {
    return this.repositories.map((repo) => repo.name)
  }

  getDisplayBlocks = () => {
    const blocks: Block[] = []
    const divider = { type: 'divider' }

    this.repositories.forEach((repo) => {
      blocks.push(...repo.getDisplayBlocks(), divider)
    })

    return blocks
  }
}

export default Repositories
