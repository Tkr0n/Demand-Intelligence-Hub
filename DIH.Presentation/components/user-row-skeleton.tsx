import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserRowSkeleton() {
  return (
    <Card className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
    </Card>
  )
}
