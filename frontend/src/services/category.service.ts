import { APIService } from './api.service'

interface Category {
  id: number
  name: string
}

export class CategoryService extends APIService {
  constructor() {
    super({ auth: true })
  }

  async getAllCategories(): Promise<Category[]> {
    return this.api('categories/')
  }

  async getCategory(id: number): Promise<Category> {
    return this.api(`categories/${id}/`)
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    return this.api('categories/', {
      method: 'POST',
      body: category,
    })
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    return this.api(`categories/${id}/`, {
      method: 'PATCH',
      body: category,
    })
  }

  async deleteCategory(id: number): Promise<void> {
    return this.api(`categories/${id}/`, {
      method: 'DELETE',
    })
  }
}
