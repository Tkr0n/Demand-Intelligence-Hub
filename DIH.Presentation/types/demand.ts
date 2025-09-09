export type UserRole = "Admin" | "Editor" | "Viewer"

export interface User {
  id: string
  name: string
  avatar?: string
  initials: string
  email: string
  role: UserRole
}

export interface UserMetrics {
  [key: string]: number
  Total: number
}
