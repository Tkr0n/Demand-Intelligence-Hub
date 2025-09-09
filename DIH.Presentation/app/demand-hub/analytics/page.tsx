"use client"

import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { NetworkAnalyticsCharts } from "@/components/network-analytics-charts"
import { NetworkComparisonTable } from "@/components/network-comparison-table"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64 flex-1 flex flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="bg-card border-b border-border px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Network Analytics</h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive performance analysis and network comparison metrics
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 space-y-8">
            <NetworkAnalyticsCharts />
            <NetworkComparisonTable />
          </div>
        </main>
      </div>
    </div>
  )
}
