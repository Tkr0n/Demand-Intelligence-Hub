"use client"

import { BarChart3, Lock, Moon, Sun, Settings, Zap, TrendingUp, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "INTELLIGENCE",
    items: [
      { name: "Dashboard", icon: BarChart3, href: "/demand-hub" },
      { name: "Analytics", icon: TrendingUp, href: "/demand-hub/analytics" },
      { name: "Simulation", icon: Zap, href: "/demand-hub/simulation" },
      { name: "Rules", icon: Settings, href: "/demand-hub/rules" },
      { name: "New Ad", icon: Plus, href: "/demand-hub/new-ad" },
    ],
  },
  {
    title: "SECURITY",
    items: [{ name: "Permissions", icon: Lock, href: "/security/permissions" }],
  },
]

export function SidebarContent() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-foreground">Demand Intelligence Hub</span>
        </div>

        <nav className="space-y-8">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal",
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      {/* Profile Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="space-y-4">
          {/* Dark/Light Mode Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-sidebar-foreground">Theme</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 p-0"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Profile Section */}
          <div className="pt-2 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john.doe@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
