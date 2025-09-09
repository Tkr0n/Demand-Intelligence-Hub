"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { SidebarContent } from "./sidebar-content"

export function MobileHeader() {
  return (
    <header className="md:hidden flex items-center h-14 px-4 border-b bg-background sticky top-0 z-30">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-r-0">
          <div className="bg-sidebar h-full overflow-y-auto flex flex-col">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
      {/* We can add a page title here later if needed */}
    </header>
  )
}
