import Cookies from 'js-cookie'
import { APIService } from './api.service'

export class AuthService extends APIService {
  async login(body: { email: string, password: string }): Promise<any> {
    return this.api('/web/admin_sessions', {
      method: 'POST',
      body,
      onResponse: async ({ response }) => {
        if (response.ok && response._data?.token) {
          Cookies.set('token', response._data?.token)
        }
      },
    })
  }

  async register(body: { email: string, password: string }): Promise<any> {
    return this.api('/web/admin_users', {
      method: 'POST',
      body,
    })
  }

  static logout({ redirectTo = '/sign-in/?next=/dashboard' } = {}): void {
    Cookies.remove('token')
    window.location.href = redirectTo
  }

  async getCurrentUser() {
    return this.api('current-user/')
  }
}
