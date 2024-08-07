import Cookies from 'js-cookie'
import { ofetch } from 'ofetch'

import type { $Fetch } from 'ofetch'

export abstract class APIService {
  protected baseURL: string
  public readonly api: $Fetch

  constructor({ baseURL, auth }: { baseURL?: string, auth?: boolean } = {}) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || '/'

    this.api = ofetch.create({
      baseURL: this.baseURL,
      onRequest: async (context) => {
        const token = Cookies.get('token')
        context.options.headers = (context.options.headers || {}) as Record<string, string>

        if (auth) {
          context.options.headers.Authorization = `Token ${token}`
        }
      },

      onResponseError: async ({ response }) => {
        if (response.status === 401) {
          Cookies.remove('token')
          window.location.href = '/auth/login'
        }
      },
    })
  }
}
