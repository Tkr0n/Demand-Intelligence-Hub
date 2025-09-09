import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "../services/users-api"
import type { UserRole } from "../types/demand"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
    staleTime: 5 * 60 * 1000,
  })
}

export function useUserMetrics() {
  return useQuery({
    queryKey: ["user-metrics"],
    queryFn: usersApi.getUserMetrics,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userData: {
      firstName: string
      lastName: string
      email: string
      role: UserRole
    }) => usersApi.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user-metrics"] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      userId,
      newRole,
    }: {
      userId: string
      newRole?: UserRole
    }) => usersApi.updateUser(userId, { newRole }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user-metrics"] })
    },
  })
}
