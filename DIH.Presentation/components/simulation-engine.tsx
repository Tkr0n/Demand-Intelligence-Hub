"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Play, RotateCcw, Settings, TrendingUp, Activity, Zap, Target, Network, Globe } from "lucide-react"

interface SimulationConfig {
  impressions: number
  targetEcpm: number
  geoDistribution: { [key: string]: number }
  formatDistribution: { [key: string]: number }
  timeHorizon: number
  optimizationGoal: "revenue" | "fillRate" | "balanced"
}

interface SimulationResult {
  networkAllocation: { network: string; percentage: number; ecpm: number; fillRate: number }[]
  projectedMetrics: {
    totalRevenue: number
    avgEcpm: number
    avgFillRate: number
    wasteReduction: number
  }
  scenarioComparison: {
    current: { revenue: number; fillRate: number }
    optimized: { revenue: number; fillRate: number }
    improvement: { revenue: number; fillRate: number }
  }
}

const mockSimulationResult: SimulationResult = {
  networkAllocation: [
    { network: "AdMob Premium", percentage: 35, ecpm: 3.45, fillRate: 89 },
    { network: "Facebook Audience", percentage: 28, ecpm: 4.12, fillRate: 76 },
    { network: "Unity Ads", percentage: 22, ecpm: 2.89, fillRate: 94 },
    { network: "AppLovin MAX", percentage: 15, ecpm: 2.34, fillRate: 87 },
  ],
  projectedMetrics: {
    totalRevenue: 67850,
    avgEcpm: 3.21,
    avgFillRate: 86.5,
    wasteReduction: 12.3,
  },
  scenarioComparison: {
    current: { revenue: 58200, fillRate: 82.1 },
    optimized: { revenue: 67850, fillRate: 86.5 },
    improvement: { revenue: 16.6, fillRate: 5.4 },
  },
}

export function SimulationEngine() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<SimulationResult | null>(null)
  const [config, setConfig] = useState<SimulationConfig>({
    impressions: 1000000,
    targetEcpm: 2.5,
    geoDistribution: { US: 40, EU: 30, APAC: 20, LATAM: 10 },
    formatDistribution: { banner: 50, interstitial: 30, rewarded: 20 },
    timeHorizon: 30,
    optimizationGoal: "balanced",
  })

  const runSimulation = async () => {
    setIsRunning(true)
    setProgress(0)
    setResults(null)

    // Simulate processing with progress updates
    const steps = 10
    for (let i = 0; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress((i / steps) * 100)
    }

    setResults(mockSimulationResult)
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setResults(null)
    setProgress(0)
    setIsRunning(false)
  }

  const chartData = results?.networkAllocation.map((item) => ({
    name: item.network,
    value: item.percentage,
    ecpm: item.ecpm,
    fillRate: item.fillRate,
  }))

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Network Selection Simulation
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button onClick={runSimulation} disabled={isRunning} className="bg-primary hover:bg-primary/90">
                {isRunning ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetSimulation} disabled={isRunning}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Config</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Total Impressions</Label>
                  <Input
                    type="number"
                    value={config.impressions}
                    onChange={(e) => setConfig({ ...config, impressions: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target eCPM ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={config.targetEcpm}
                    onChange={(e) => setConfig({ ...config, targetEcpm: Number.parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Optimization Goal</Label>
                  <Select
                    value={config.optimizationGoal}
                    onValueChange={(value) => setConfig({ ...config, optimizationGoal: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Maximize Revenue</SelectItem>
                      <SelectItem value="fillRate">Maximize Fill Rate</SelectItem>
                      <SelectItem value="balanced">Balanced Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Time Horizon (days)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[config.timeHorizon]}
                      onValueChange={(value) => setConfig({ ...config, timeHorizon: value[0] })}
                      max={90}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>1 day</span>
                      <span>{config.timeHorizon} days</span>
                      <span>90 days</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium">Geographic Distribution</Label>
                    <div className="space-y-2 mt-2">
                      {Object.entries(config.geoDistribution).map(([geo, percentage]) => (
                        <div key={geo} className="flex items-center justify-between">
                          <span className="text-sm">{geo}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-8">{percentage}%</span>
                            <Slider
                              value={[percentage]}
                              onValueChange={(value) =>
                                setConfig({
                                  ...config,
                                  geoDistribution: { ...config.geoDistribution, [geo]: value[0] },
                                })
                              }
                              max={100}
                              min={0}
                              step={5}
                              className="w-20"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Format Distribution</Label>
                    <div className="space-y-2 mt-2">
                      {Object.entries(config.formatDistribution).map(([format, percentage]) => (
                        <div key={format} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{format}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-8">{percentage}%</span>
                            <Slider
                              value={[percentage]}
                              onValueChange={(value) =>
                                setConfig({
                                  ...config,
                                  formatDistribution: { ...config.formatDistribution, [format]: value[0] },
                                })
                              }
                              max={100}
                              min={0}
                              step={5}
                              className="w-20"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Scenario comparison will be available in the next update</p>
              </div>
            </TabsContent>
          </Tabs>

          {isRunning && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing simulation...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {results && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Projected Revenue</p>
                    <p className="text-2xl font-bold">${results.projectedMetrics.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-xs text-success">
                        +{results.scenarioComparison.improvement.revenue.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg eCPM</p>
                    <p className="text-2xl font-bold">${results.projectedMetrics.avgEcpm.toFixed(2)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">Target: ${config.targetEcpm}</span>
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
                    <p className="text-2xl font-bold">{results.projectedMetrics.avgFillRate.toFixed(1)}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-xs text-success">
                        +{results.scenarioComparison.improvement.fillRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-info/10 rounded-lg">
                    <Network className="h-4 w-4 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Waste Reduction</p>
                    <p className="text-2xl font-bold">{results.projectedMetrics.wasteReduction.toFixed(1)}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-success">Inventory optimization</span>
                    </div>
                  </div>
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Globe className="h-4 w-4 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimal Network Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="space-y-2 mt-4">
                  {results.networkAllocation.map((network, index) => (
                    <div key={network.network} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm font-medium">{network.network}</span>
                      </div>
                      <Badge variant="secondary">{network.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Revenue</span>
                      <span className="text-sm text-success">
                        +{results.scenarioComparison.improvement.revenue.toFixed(1)}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Current: ${results.scenarioComparison.current.revenue.toLocaleString()}</span>
                        <span>Optimized: ${results.scenarioComparison.optimized.revenue.toLocaleString()}</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Fill Rate</span>
                      <span className="text-sm text-success">
                        +{results.scenarioComparison.improvement.fillRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Current: {results.scenarioComparison.current.fillRate.toFixed(1)}%</span>
                        <span>Optimized: {results.scenarioComparison.optimized.fillRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Key Recommendations</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• Increase Facebook Audience allocation for premium inventory</li>
                      <li>• Reduce dependency on low-performing networks</li>
                      <li>• Implement dynamic eCPM thresholds by geography</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
