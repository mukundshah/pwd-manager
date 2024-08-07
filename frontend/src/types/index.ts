export interface User {
  id: number
  email: string
  username: string
  avatar: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Password {
  id: number
  email?: string
  username?: string
  website_name: string
  password: string
  favicon?: string
  url: string
  category: Category | number
}
