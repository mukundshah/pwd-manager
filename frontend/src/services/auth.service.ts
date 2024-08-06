import Cookies from 'js-cookie'
import { APIService } from './api.service'

export class AuthService extends APIService {
  async login(data: { email: string, password: string }): Promise<any> {
    return this.api('/web/admin_sessions', {
      method: 'POST',
      body: { admin_user: data },
      onResponse: async ({ response }) => {
        if (response.ok && response._data?.token) {
          Cookies.set('token', response._data?.token)
        }
      },
    })
  }

  static logout({ redirectTo = '/auth/login?next=/app/dashboard' } = {}): void {
    Cookies.remove('token')
    window.location.href = redirectTo
  }
}
