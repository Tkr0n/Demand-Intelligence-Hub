import { cn } from "@/lib/utils"

interface MetricsCardsProps {
  metrics: { label: string; value: number }[]
  isLoading?: boolean
  numColumns?: number
  onMetricClick?: (label: string) => void
  selectedMetric?: string | null
}

export function MetricsCards({
  metrics,
  isLoading,
  numColumns = 5,
  onMetricClick,
  selectedMetric,
}: MetricsCardsProps) {
  const skeletonCount = numColumns || 5

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4 text-center">
            <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
      {metrics.map((item) => (
        <button
          key={item.label}
          onClick={() => onMetricClick?.(item.label)}
          disabled={!onMetricClick}
          className={cn(
            "bg-card rounded-lg border p-4 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            onMetricClick ? "cursor-pointer hover:border-primary/50 hover:shadow-sm" : "cursor-default",
            selectedMetric === item.label
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border",
          )}
        >
          <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </button>
      ))}
    </div>
  )
}
