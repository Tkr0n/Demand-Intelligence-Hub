"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface NetworkMetrics {
  id: string
  name: string
  ecpm: number
  ecpmChange: number
  fillRate: number
  fillRateChange: number
  revenue: number
  revenueChange: number
  impressions: number
  ctr: number
  status: "active" | "paused" | "testing"
  tier: "premium" | "standard" | "fallback"
}

const networkData: NetworkMetrics[] = [
  {
    id: "1",
    name: "AdMob Premium",
    ecpm: 3.45,
    ecpmChange: 12.3,
    fillRate: 89.2,
    fillRateChange: -2.1,
    revenue: 18750,
    revenueChange: 15.7,
    impressions: 543000,
    ctr: 2.8,
    status: "active",
    tier: "premium",
  },
  {
    id: "2",
    name: "Unity Ads",
    ecpm: 2.89,
    ecpmChange: 8.4,
    fillRate: 94.1,
    fillRateChange: 3.2,
    revenue: 15680,
    revenueChange: 11.2,
    impressions: 542000,
    ctr: 3.1,
    status: "active",
    tier: "standard",
  },
  {
    id: "3",
    name: "Facebook Audience",
    ecpm: 4.12,
    ecpmChange: -5.2,
    fillRate: 76.8,
    fillRateChange: -8.1,
    revenue: 20600,
    revenueChange: -2.3,
    impressions: 500000,
    ctr: 2.4,
    status: "active",
    tier: "premium",
  },
  {
    id: "4",
    name: "AppLovin MAX",
    ecpm: 2.34,
    ecpmChange: 6.7,
    fillRate: 87.5,
    fillRateChange: 1.8,
    revenue: 12890,
    revenueChange: 8.9,
    impressions: 551000,
    ctr: 2.9,
    status: "active",
    tier: "standard",
  },
  {
    id: "5",
    name: "IronSource",
    ecpm: 1.98,
    ecpmChange: -1.2,
    fillRate: 91.3,
    fillRateChange: 0.5,
    revenue: 10780,
    revenueChange: 2.1,
    impressions: 544000,
    ctr: 2.6,
    status: "testing",
    tier: "fallback",
  },
]

type SortField = keyof NetworkMetrics
type SortDirection = "asc" | "desc"

export function NetworkComparisonTable() {
  const [sortField, setSortField] = useState<SortField>("revenue")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filterTier, setFilterTier] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredAndSortedData = networkData
    .filter((network) => filterTier === "all" || network.tier === filterTier)
    .filter((network) => filterStatus === "all" || network.status === filterStatus)
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-success" />
    if (change < 0) return <TrendingDown className="h-3 w-3 text-destructive" />
    return <Minus className="h-3 w-3 text-muted-foreground" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-success"
    if (change < 0) return "text-destructive"
    return "text-muted-foreground"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      paused: "secondary",
      testing: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTierBadge = (tier: string) => {
    const colors = {
      premium: "bg-primary/10 text-primary border-primary/20",
      standard: "bg-info/10 text-info border-info/20",
      fallback: "bg-muted text-muted-foreground border-muted-foreground/20",
    }

    return (
      <Badge variant="secondary" className={colors[tier as keyof typeof colors]}>
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Network Performance Comparison</CardTitle>
          <div className="flex gap-2">
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="fallback">Fallback</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Network</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("ecpm")}
                    className="h-auto p-0 font-medium"
                  >
                    eCPM <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("fillRate")}
                    className="h-auto p-0 font-medium"
                  >
                    Fill Rate <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("revenue")}
                    className="h-auto p-0 font-medium"
                  >
                    Revenue <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((network) => (
                <TableRow key={network.id}>
                  <TableCell className="font-medium">{network.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">${network.ecpm.toFixed(2)}</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(network.ecpmChange)}
                        <span className={`text-xs ${getTrendColor(network.ecpmChange)}`}>
                          {Math.abs(network.ecpmChange).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{network.fillRate.toFixed(1)}%</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(network.fillRateChange)}
                        <span className={`text-xs ${getTrendColor(network.fillRateChange)}`}>
                          {Math.abs(network.fillRateChange).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">${network.revenue.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(network.revenueChange)}
                        <span className={`text-xs ${getTrendColor(network.revenueChange)}`}>
                          {Math.abs(network.revenueChange).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{network.impressions.toLocaleString()}</TableCell>
                  <TableCell>{network.ctr.toFixed(1)}%</TableCell>
                  <TableCell>{getStatusBadge(network.status)}</TableCell>
                  <TableCell>{getTierBadge(network.tier)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
