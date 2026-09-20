import {useUserStore} from "@/stores/userStore";

export class Http {
  private readonly baseUrl: string

  constructor(baseUrl: string = 'http://localhost:5000') {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await fetch(url, { ...options, headers, credentials: 'include' })

      if (!response.ok)
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)

      const text = await response.text()
      if (!text) return {} as T

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return JSON.parse(text) as T
      }

      return text as unknown as T

    } catch (error) {
      console.error(`[HTTP Adapter] Fehler bei ${options.method || 'GET'} ${url}`, error)
      throw error
    }
  }

  public post<T>(endpoint: string, body: unknown, headers?: HeadersInit): Promise<T> {
    const user = useUserStore()

    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...(headers ? { headers } : {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })
    })
  }
}
