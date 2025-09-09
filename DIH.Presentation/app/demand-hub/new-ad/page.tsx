"use client"

import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { NewAdForm } from "@/components/new-ad-form"

export default function NewAdPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64 flex-1 flex flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="bg-card border-b border-border px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create New Ad</h1>
                <p className="text-sm text-muted-foreground">
                  Configure a new ad campaign with targeting and network preferences
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8">
            <NewAdForm />
          </div>
        </main>
      </div>
    </div>
  )
}
