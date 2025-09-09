"use client"

import { useState, useMemo } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"
import { MetricsCards } from "../components/metrics-cards"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUsers, useUserMetrics, useUpdateUser, useCreateUser } from "../hooks/use-users"
import { EditUserModal } from "../components/edit-user-modal"
import { NewUserModal } from "../components/new-user-modal"
import type { User, UserRole } from "../types/demand"
import type { NewUserFormValues } from "../components/new-user-modal"
import { UserRowSkeleton } from "./user-row-skeleton"

export default function PermissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { data: users, isLoading: usersLoading } = useUsers()
  const { data: metrics, isLoading: metricsLoading } = useUserMetrics()
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser()
  const { mutate: createUser, isPending: isCreating } = useCreateUser()

  const handleMetricClick = (label: string) => {
    if (label === "Total Users") {
      setSelectedRole(null)
    } else {
      setSelectedRole(selectedRole === label ? null : label)
    }
  }

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleOpenNewUserModal = () => {
    setIsNewUserModalOpen(true)
  }

  const handleCloseNewUserModal = () => {
    setIsNewUserModalOpen(false)
  }

  const handleUpdateUser = (userId: string, updates: { newRole: UserRole }) => {
    updateUser(
      { userId, ...updates },
      {
        onSuccess: () => {
          handleCloseEditModal()
        },
      },
    )
  }

  const handleCreateUser = (data: NewUserFormValues) => {
    createUser(data, {
      onSuccess: () => {
        handleCloseNewUserModal()
      },
    })
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedRole(null)
  }

  const filteredUsers = useMemo(() => {
    let filtered = users || []

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }, [users, searchQuery, selectedRole])

  const roleMetrics = metrics
    ? Object.entries(metrics)
        .map(([key, value]) => ({
          label: key === "Total" ? "Total Users" : key,
          value,
        }))
        .sort((a, b) => {
          if (a.label === "Total Users") return -1
          if (b.label === "Total Users") return 1
          return a.label.localeCompare(b.label)
        })
    : []

  const areFiltersActive = searchQuery !== "" || selectedRole !== null

  return (
    <>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="md:pl-64 flex-1 flex flex-col">
          <MobileHeader />
          <main className="flex-1 overflow-y-auto">
            <div className="bg-card border-b border-border px-4 md:px-8 py-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">User Permissions</h1>
                  <p className="text-sm text-muted-foreground">Manage user roles and access levels</p>
                </div>
                <Button className="w-full md:w-auto" onClick={handleOpenNewUserModal}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </div>

            <div className="p-4 md:p-8">
              <MetricsCards
                metrics={roleMetrics}
                isLoading={metricsLoading}
                onMetricClick={handleMetricClick}
                selectedMetric={selectedRole}
              />

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                {areFiltersActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                    className="hover:border-red-200 hover:text-red-700 hover:bg-red-50 dark:hover:border-red-700 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-colors bg-transparent"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">All Users</h2>

                {usersLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <UserRowSkeleton key={index} />
                    ))}
                  </div>
                ) : filteredUsers.length > 0 ? (
                  <div className="space-y-3">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="bg-card border border-border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-muted text-muted-foreground">{user.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 self-end md:self-auto flex-wrap justify-end">
                          <Badge variant="outline" className="text-xs font-medium px-3 py-1">
                            {user.role}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditModal(user)}
                            className="text-primary border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent"
                          >
                            Edit User
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <div className="text-muted-foreground mb-4">No users found for the selected criteria.</div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleUpdateUser}
        isSaving={isUpdating}
      />
      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={handleCloseNewUserModal}
        onSave={handleCreateUser}
        isSaving={isCreating}
      />
    </>
  )
}
