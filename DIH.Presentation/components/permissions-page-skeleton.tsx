import { Sidebar } from "./sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { MetricsCards } from "./metrics-cards"
import { UserRowSkeleton } from "./user-row-skeleton"

export function PermissionsPageSkeleton() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="bg-card border-b border-border px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
        <div className="p-8">
          <MetricsCards isLoading={true} numColumns={4} />
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="mb-6">
            <Skeleton className="h-7 w-40 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <UserRowSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
