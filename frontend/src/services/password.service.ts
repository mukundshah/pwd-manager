import process from 'node:process'
import CryptoJS from 'crypto-js'
import { APIService } from './api.service'

import type { TGeneratePasswordSchema } from '@/validators/generate-password-schema'
import type { Password } from '@/types'

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

  async generatePassword(data: TGeneratePasswordSchema): Promise<string> {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const digitsChars = '0123456789'
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?'

    const { length, lowercase, uppercase, digits, specialCharacters } = data

    const availableChars = []
    if (lowercase) availableChars.push(...lowercaseChars)
    if (uppercase) availableChars.push(...uppercaseChars)
    if (digits) availableChars.push(...digitsChars)
    if (specialCharacters) availableChars.push(...specialChars)

    if (availableChars.length === 0) {
      throw new Error('At least one character type must be selected')
    }

    // Ensure we have at least one of each selected type
    const requiredChars = []
    if (lowercase) requiredChars.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)])
    if (uppercase) requiredChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)])
    if (digits) requiredChars.push(digitsChars[Math.floor(Math.random() * digitsChars.length)])
    if (specialCharacters) requiredChars.push(specialChars[Math.floor(Math.random() * specialChars.length)])

    // Fill the remaining length of the password
    const remainingLength = length - requiredChars.length
    const password = [...requiredChars]

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length)
      password.push(availableChars[randomIndex])
    }

    // Shuffle the password array
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[password[i], password[j]] = [password[j], password[i]]
    }

    return password.join('')
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

  async createPassword(password: Omit<Password, 'id' | 'website' | 'favicon'>): Promise<Password> {
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
