import { env } from '@/env'

class HttpError extends Error {
  response: Response
  data: {
    message: string
  }

  constructor(response: Response, data: { message:string }) {
    super(`HTTP error ${response.status}: ${data.message || 'Something went wrong'}`)
    this.response = response
    this.data = data
  }
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(env.NEXT_PUBLIC_API_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new HttpError(response, data)
  }
  
  // if response is empty, return null
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return null as T
  }

  return response.json()
}
