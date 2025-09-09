"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

function RedirectingLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  )
}

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/demand-hub")
  }, [router])

  return <RedirectingLoader />
}
