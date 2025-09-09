"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Activity, Network, Globe } from "lucide-react"
import { useState } from "react"

const networkPerformanceData = [
  { network: "AdMob", ecpm: 2.45, fillRate: 87, revenue: 12450, impressions: 508000 },
  { network: "Unity Ads", ecpm: 1.89, fillRate: 92, revenue: 9876, impressions: 523000 },
  { network: "Facebook", ecpm: 3.12, fillRate: 78, revenue: 15600, revenue: 500000 },
  { network: "AppLovin", ecpm: 2.01, fillRate: 85, revenue: 10800, impressions: 537000 },
  { network: "IronSource", ecpm: 1.67, fillRate: 94, revenue: 8900, impressions: 533000 },
]

const timeSeriesData = [
  { date: "Jan", admob: 2.1, unity: 1.8, facebook: 2.9, applovin: 1.9 },
  { date: "Feb", admob: 2.3, unity: 1.7, facebook: 3.1, applovin: 2.0 },
  { date: "Mar", admob: 2.4, unity: 1.9, facebook: 3.0, applovin: 2.1 },
  { date: "Apr", admob: 2.5, unity: 1.8, facebook: 3.2, applovin: 2.0 },
  { date: "May", admob: 2.4, unity: 1.9, facebook: 3.1, applovin: 2.1 },
  { date: "Jun", admob: 2.5, unity: 1.9, facebook: 3.1, applovin: 2.0 },
]

const geoPerformanceData = [
  { geo: "US", value: 35, color: "hsl(var(--chart-1))" },
  { geo: "EU", value: 28, color: "hsl(var(--chart-2))" },
  { geo: "APAC", value: 22, color: "hsl(var(--chart-3))" },
  { geo: "LATAM", value: 15, color: "hsl(var(--chart-4))" },
]

const chartConfig = {
  admob: { label: "AdMob", color: "hsl(var(--chart-1))" },
  unity: { label: "Unity Ads", color: "hsl(var(--chart-2))" },
  facebook: { label: "Facebook", color: "hsl(var(--chart-3))" },
  applovin: { label: "AppLovin", color: "hsl(var(--chart-4))" },
}

export function NetworkAnalyticsCharts() {
  const [timeRange, setTimeRange] = useState("6m")
  const [selectedMetric, setSelectedMetric] = useState("ecpm")

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$57,626</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+12.3%</span>
                </div>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg eCPM</p>
                <p className="text-2xl font-bold">$2.23</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+5.7%</span>
                </div>
              </div>
              <div className="p-2 bg-success/10 rounded-lg">
                <Activity className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fill Rate</p>
                <p className="text-2xl font-bold">87.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  <span className="text-xs text-destructive">-2.1%</span>
                </div>
              </div>
              <div className="p-2 bg-warning/10 rounded-lg">
                <Network className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Networks</p>
                <p className="text-2xl font-bold">12</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">2 new this month</span>
                </div>
              </div>
              <div className="p-2 bg-info/10 rounded-lg">
                <Globe className="h-4 w-4 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Performance Bar Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Network Performance</CardTitle>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecpm">eCPM</SelectItem>
                  <SelectItem value="fillRate">Fill Rate</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={networkPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="network" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey={selectedMetric} fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Geography</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={geoPerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {geoPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {geoPerformanceData.map((item) => (
                <div key={item.geo} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.geo}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* eCPM Trends Over Time */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>eCPM Trends</CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="admob" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="unity" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="facebook" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="applovin" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
