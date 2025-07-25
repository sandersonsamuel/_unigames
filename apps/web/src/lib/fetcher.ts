import { getSession } from '@/app/actions/user'
import { env } from '@/env'

class HttpError extends Error {
  response: Response
  data: {
    message: string
  }

  constructor(response: Response, data: { message: string }) {
    super(data.message || 'Something went wrong')
    this.response = response
    this.data = data
  }
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
  appJson: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {

  const session = await getSession()
  const jwt = session?.access_token

  const response = await fetch(env.NEXT_PUBLIC_API_URL + url, {
    headers: {
      ...appJson,
      ...options?.headers,
      'Authorization': `Bearer ${jwt}`
    },
    ...options,
  })

  if (!response.ok) {
    const data = await response.json().catch()
    throw new HttpError(response, data)
  }

  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    return response.blob() as Promise<T>
  }

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  return null as T
}
