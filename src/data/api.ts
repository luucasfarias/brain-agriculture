import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const prefix = '/api'
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(prefix.concat(path), baseUrl)

  return fetch(url, init)
}