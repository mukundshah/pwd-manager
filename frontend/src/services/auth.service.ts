import Cookies from 'js-cookie'
import { APIService } from './api.service'

export class AuthService extends APIService {
  async login(body: { email: string, password: string }): Promise<any> {
    const response = await this.api('/auth/login/', {
      method: 'POST',
      body,
    })

    if (response && response.key) {
      Cookies.set('token', response.key)
    }

    return response
  }

  static get loggedIn(): boolean {
    return !!Cookies.get('token')
  }

  async register(body: { email: string, password: string, username: string }): Promise<any> {
    return this.api('/auth/register/', {
      method: 'POST',
      body,
    })
  }

  static logout({ redirectTo = '/sign-in/?next=/dashboard' } = {}): void {
    Cookies.remove('token')
    window.location.href = redirectTo
  }

  async getCurrentUser() {
    return this.api('/auth/user/', {
      headers: {
        Authorization: `Token ${Cookies.get('token')}`,
      },
    })
  }
}
