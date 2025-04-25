import { ApiError } from '@/errors'
import type { RepositoryResponse } from '@/types'
import Redis from 'ioredis'

process.loadEnvFile()

const cache = new Redis(process.env.REDIS_URL || '')

const getUserRepos = async (username: string): Promise<RepositoryResponse[]> => {
  const cachedRepos = await cache.get(`repos:${username}`)
  if (cachedRepos) return JSON.parse(cachedRepos) as RepositoryResponse[]
  const response = await fetch(`https://api.github.com/users/${username}/repos`)
  if (!response.ok) throw new ApiError(`Error: ${response.statusText}`)

  const repos = await response.json()
  if (repos.length === 0) throw new ApiError(`No repos found for user ${username}`)

  await cache.set(`repos:${username}`, JSON.stringify(repos))
  return repos
}

export default getUserRepos
