import type { User, UserRole, UserMetrics } from "../types/demand"

const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alice Smith",
    initials: "AS",
    avatar: "/placeholder.svg?height=32&width=32&text=AS",
    email: "alice.s@example.com",
    role: "Admin",
  },
  {
    id: "user-2",
    name: "Bob Johnson",
    initials: "BJ",
    avatar: "/placeholder.svg?height=32&width=32&text=BJ",
    email: "bob.j@example.com",
    role: "Editor",
  },
  {
    id: "user-3",
    name: "Charlie Brown",
    initials: "CB",
    avatar: "/placeholder.svg?height=32&width=32&text=CB",
    email: "charlie.b@example.com",
    role: "Viewer",
  },
  {
    id: "user-4",
    name: "Diana Prince",
    initials: "DP",
    avatar: "/placeholder.svg?height=32&width=32&text=DP",
    email: "diana.p@example.com",
    role: "Editor",
  },
  {
    id: "user-5",
    name: "Eve Adams",
    initials: "EA",
    avatar: "/placeholder.svg?height=32&width=32&text=EA",
    email: "eve.a@example.com",
    role: "Admin",
  },
  {
    id: "user-6",
    name: "Frank White",
    initials: "FW",
    avatar: "/placeholder.svg?height=32&width=32&text=FW",
    email: "frank.w@example.com",
    role: "Viewer",
  },
]

const calculateUserMetrics = (users: User[]): UserMetrics => {
  const metrics: UserMetrics = { Total: users.length }
  users.forEach((user) => {
    if (!metrics[user.role]) {
      metrics[user.role] = 0
    }
    metrics[user.role]++
  })
  return metrics
}

const generateInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockUsers
  },

  getUserMetrics: async (): Promise<UserMetrics> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return calculateUserMetrics(mockUsers)
  },

  createUser: async (userData: {
    firstName: string
    lastName: string
    email: string
    role: UserRole
  }): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Check if email already exists
    const existingUser = mockUsers.find((user) => user.email === userData.email)
    if (existingUser) {
      throw new Error("A user with this email already exists")
    }

    const newUser: User = {
      id: `user-${mockUsers.length + 1}`,
      name: `${userData.firstName} ${userData.lastName}`,
      initials: generateInitials(userData.firstName, userData.lastName),
      avatar: `/placeholder.svg?height=32&width=32&text=${generateInitials(userData.firstName, userData.lastName)}`,
      email: userData.email,
      role: userData.role,
    }

    mockUsers.push(newUser)
    return newUser
  },

  updateUser: async (userId: string, updates: { newRole?: UserRole }): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const userIndex = mockUsers.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }
    if (updates.newRole) {
      mockUsers[userIndex].role = updates.newRole
    }
    return mockUsers[userIndex]
  },
}
