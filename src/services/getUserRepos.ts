import { ApiError } from '@/errors'
import type { RepositoryResponse } from '@/types'

const getUserRepos = async (username: string): Promise<RepositoryResponse[]> => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`)

  if (!response.ok) throw new ApiError(`Error: ${response.statusText}`)

  const repos = await response.json()

  if (repos.length === 0) throw new ApiError(`No repos found for user ${username}`)

  return repos
}

export default getUserRepos
