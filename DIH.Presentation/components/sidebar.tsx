"use client"

import { SidebarContent } from "./sidebar-content"

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto flex-col fixed top-0 left-0 z-40">
      <SidebarContent />
    </aside>
  )
}
