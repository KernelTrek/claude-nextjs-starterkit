// User types
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Auth types
export interface AuthSession {
  user: User | null
  isLoading: boolean
  error: string | null
}

// Common response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}
