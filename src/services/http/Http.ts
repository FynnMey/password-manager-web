import { useUserStore } from "@/stores/userStore";
import { ReturnType } from "@/types/Request/ReturnType";

export class Http {
  private readonly baseUrl: string

  constructor(baseUrl: string = 'http://localhost:5000') {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, isRetry = false): Promise<T> {
    const user = useUserStore()
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    try {
      const response = await fetch(url, { ...options, headers, credentials: 'include' })

      if (response.status === 401 && !isRetry && !endpoint.includes('/api/auth/')) {
        const refreshed = await user.refreshToken()

        if (refreshed) {
          const retryHeaders = {
            ...headers,
            'Authorization': `Bearer ${user.accessToken}`
          }
          return await this.request<T>(endpoint, { ...options, headers: retryHeaders }, true)
        } else {
          await user.resetAuth()
          return {
            success: false,
            data: null,
            error: 'Sitzung abgelaufen'
          } as unknown as T
        }
      }

      const text = await response.text()
      let data: any = text

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json') && text) {
        data = JSON.parse(text)
      }

      if (!response.ok) {
        if (data && typeof data === 'object' && 'success' in data) {
          return data as T
        }
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
      }

      if (!text) return {} as T
      return data as T

    } catch (error) {
      console.error(`[HTTP Adapter] Fehler bei ${options.method || 'GET'} ${url}`, error)
      throw error
    }
  }

  public post<T>(endpoint: string, body: unknown, headers?: HeadersInit): Promise<ReturnType<T>> {
    const user = useUserStore()
    const defaultHeaders: Record<string, string> = {}
    if (user.accessToken) {
      defaultHeaders['Authorization'] = `Bearer ${user.accessToken}`
    }

    return this.request<ReturnType<T>>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        ...defaultHeaders,
        ...(headers as Record<string, string>)
      }
    })
  }
}
