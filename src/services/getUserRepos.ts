import { ApiError } from '@/errors'
import type { RepositoryResponse } from '@/types'

const getUserRepos = async (username: string): Promise<[null | string, RepositoryResponse[]]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)

    if (!response.ok) throw new ApiError(`Error: ${response.statusText}`)

    const repos = await response.json()
    return [null, repos]
  } catch (error) {
    if (error instanceof ApiError) return [error.message, []]
    throw error
  }
}

export default getUserRepos
