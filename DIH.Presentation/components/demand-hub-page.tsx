"use client"

import { useState } from "react"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  BarChart3,
  Settings,
  AlertTriangle,
  Play,
  TrendingUp,
  Network,
  Globe,
  DollarSign,
  Activity,
  Zap,
} from "lucide-react"
import { mockNetworks, mockFormats, mockGeos } from "@/lib/mock-data"
import Link from "next/link"

export default function DemandHubPage() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [selectedGeo, setSelectedGeo] = useState<string>("")
  const [targetEcpm, setTargetEcpm] = useState<string>("")
  const [preferredNetworks, setPreferredNetworks] = useState<string[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  const safeFormats = mockFormats || []
  const safeGeos = mockGeos || []
  const safeNetworks = mockNetworks || []

  const handleFormatChange = (formatId: string, checked: boolean) => {
    if (checked) {
      setSelectedFormats([...selectedFormats, formatId])
    } else {
      setSelectedFormats(selectedFormats.filter((id) => id !== formatId))
    }
  }

  const handleNetworkChange = (networkId: string, checked: boolean) => {
    if (checked) {
      setPreferredNetworks([...preferredNetworks, networkId])
    } else {
      setPreferredNetworks(preferredNetworks.filter((id) => id !== networkId))
    }
  }

  const runSimulation = () => {
    setIsSimulating(true)
    Promise.resolve().then(() => {
      setTimeout(() => setIsSimulating(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-64 flex-1 flex flex-col">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="bg-card border-b border-border px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Demand Intelligence Hub</h1>
                <p className="text-sm text-muted-foreground">
                  Analyze network performance and optimize ad inventory distribution
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Engine Active
                </Badge>
                <Link href="/demand-hub/rules">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure Rules
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 space-y-6">
            <Alert className="border-warning bg-warning/5">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning">
                <strong>Rule Inconsistency Detected:</strong> Banner format rules conflict between US and EU regions.
                <Link href="/demand-hub/rules">
                  <Button variant="link" className="p-0 h-auto text-warning underline ml-1">
                    Review Rules
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Format Selector (A) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Ad Formats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {safeFormats.map((format) => (
                    <div key={format.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={format.id}
                        checked={selectedFormats.includes(format.id)}
                        onCheckedChange={(checked) => handleFormatChange(format.id, checked as boolean)}
                      />
                      <Label htmlFor={format.id} className="text-sm">
                        {format.name}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Geo Selector (B) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Geography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedGeo} onValueChange={setSelectedGeo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {safeGeos.map((geo) => (
                        <SelectItem key={geo.code} value={geo.code}>
                          {geo.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Target eCPM (C) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Target eCPM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={targetEcpm}
                      onChange={(e) => setTargetEcpm(e.target.value)}
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground">USD per 1000 impressions</p>
                  </div>
                </CardContent>
              </Card>

              {/* Preferred Networks (D) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Network className="h-4 w-4" />
                    Preferred Networks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {safeNetworks.slice(0, 4).map((network) => (
                    <div key={network.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={network.id}
                        checked={preferredNetworks.includes(network.id)}
                        onCheckedChange={(checked) => handleNetworkChange(network.id, checked as boolean)}
                      />
                      <Label htmlFor={network.id} className="text-sm">
                        {network.name}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Simulation Module (F) */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Network Selection Simulation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Current Configuration</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedFormats.length} formats, {selectedGeo || "All"} regions
                        </p>
                      </div>
                      <Button
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {isSimulating ? (
                          <>
                            <Activity className="h-4 w-4 mr-2 animate-spin" />
                            Simulating...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Simulation
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-foreground">87.3%</p>
                          <p className="text-xs text-muted-foreground">Predicted Fill Rate</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-success">$2.45</p>
                          <p className="text-xs text-muted-foreground">Projected eCPM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Projected Impact (G) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Revenue Impact</span>
                      <span className="text-sm font-medium text-success">+12.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Fill Rate</span>
                      <span className="text-sm font-medium">87.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Waste Reduction</span>
                      <span className="text-sm font-medium text-success">-8.7%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Top Recommended Network</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">AdMob Premium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Network Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Run advanced simulations to test different network allocation strategies and optimize performance.
                  </p>
                  <Link href="/demand-hub/simulation">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Zap className="h-4 w-4 mr-2" />
                      Open Simulation Engine
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Network Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View comprehensive analytics and performance metrics across all advertising networks.
                  </p>
                  <Link href="/demand-hub/analytics">
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rules Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure decision rules for network selection based on format, geography, and eCPM targets.
                  </p>
                  <Link href="/demand-hub/rules">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Open Rules Editor
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Decision Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View recent network selection decisions and their performance outcomes.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Activity className="h-4 w-4 mr-2" />
                    View Decision History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
