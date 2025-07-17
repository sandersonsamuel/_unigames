import { env } from '@/env'
import { createClient } from '@/services/supabase/server'

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
  appJson: boolean = true
): Promise<T> {

  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const jwt = session?.access_token

  const response = await fetch(env.NEXT_PUBLIC_API_URL + url, {
    headers: {
      ...(appJson ? { 'Content-Type': 'application/json' } : {}),
      ...options?.headers,
      'Authorization': `Bearer ${jwt}`
    },
    ...options,
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new HttpError(response, data)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return null as T
  }

  return response.json()
}
