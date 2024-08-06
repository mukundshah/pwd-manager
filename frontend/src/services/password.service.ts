import process from 'node:process'
import CryptoJS from 'crypto-js'
import { APIService } from './api.service'

interface Password {
  id: number
  title: string
  username: string
  password: string
  url: string
  notes: string
  category: number
}

export class PasswordService extends APIService {
  private encryptionKey: string

  constructor() {
    super({ auth: true })
    // You should store this key securely, perhaps in an environment variable
    this.encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY || 'default-key'
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.encryptionKey).toString()
  }

  private decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  async getAllPasswords(): Promise<Password[]> {
    const passwords = await this.api<Password[]>('passwords/')
    return passwords.map(pwd => ({
      ...pwd,
      password: this.decrypt(pwd.password),
    }))
  }

  async getPassword(id: number): Promise<Password> {
    const password = await this.api<Password>(`passwords/${id}/`)
    return {
      ...password,
      password: this.decrypt(password.password),
    }
  }

  async createPassword(password: Omit<Password, 'id'>): Promise<Password> {
    const encryptedPassword = {
      ...password,
      password: this.encrypt(password.password),
    }
    const createdPassword = await this.api('passwords/', {
      method: 'POST',
      body: encryptedPassword,
    })
    return {
      ...createdPassword,
      password: password.password, // Return the original, unencrypted password
    }
  }

  async updatePassword(id: number, password: Partial<Password>): Promise<Password> {
    const updateData = { ...password }
    if (updateData.password) {
      updateData.password = this.encrypt(updateData.password)
    }
    const updatedPassword = await this.api(`passwords/${id}/`, {
      method: 'PATCH',
      body: updateData,
    })
    return {
      ...updatedPassword,
      password: password.password ? password.password : this.decrypt(updatedPassword.password),
    }
  }

  async deletePassword(id: number): Promise<void> {
    return this.api(`passwords/${id}/`, {
      method: 'DELETE',
    })
  }
}
