"use client"

import Image from "next/image"
import { Inter } from "next/font/google"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function NotFound() {
  const router = useRouter()

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen bg-background text-center p-4",
        inter.className,
      )}
    >
      <div className={cn("max-w-md flex flex-col items-center")}>
        <Image
          src="/404-illustration.png"
          alt="Vectorial illustration of a lost robot holding a map with a 404 sign"
          width={400}
          height={300}
          className="mb-8"
        />
        <h1 className="text-4xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => router.push("/demand-hub")}>Go to Homepage</Button>
      </div>
    </div>
  )
}
