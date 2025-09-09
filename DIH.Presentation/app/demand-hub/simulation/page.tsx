"use client"

import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { SimulationEngine } from "@/components/simulation-engine"

export default function SimulationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64 flex-1 flex flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="bg-card border-b border-border px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Network Simulation</h1>
                <p className="text-sm text-muted-foreground">
                  Run advanced simulations to optimize network selection and maximize revenue
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <SimulationEngine />
          </div>
        </main>
      </div>
    </div>
  )
}
