export interface AdFormat {
  id: string
  name: string
  description: string
  isActive: boolean
}

export interface Geography {
  id: string
  code: string // "US", "MX", etc.
  name: string
  region: string
  flag?: string
}

export interface AdNetwork {
  id: string
  name: string
  isActive: boolean
  status: "online" | "offline" | "maintenance"
  fillRate: number
  averageEcpm: number
  lastUpdated: Date
}

export interface DemandRule {
  id: string
  name: string
  description?: string
  isActive: boolean
  priority: number
  conditions: {
    formats: string[] // AdFormat IDs
    geos: string[] // Geography IDs
    minEcpm?: number
    preferredNetworks?: string[] // AdNetwork IDs
  }
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface DecisionLog {
  id: string
  timestamp: Date
  impressionId: string
  geo: string
  format: string
  selectedNetwork: string
  reason: string
  ecpm: number
  ruleId?: string
}

export interface NetworkMetrics {
  networkId: string
  networkName: string
  impressions: number
  revenue: number
  ecpm: number
  fillRate: number
  period: "hour" | "day" | "week" | "month"
  timestamp: Date
}

export interface SimulationRequest {
  geo: string
  format: string
  targetEcpm?: number
  preferredNetworks?: string[]
}

export interface SimulationResult {
  recommendedNetwork: AdNetwork
  alternativeNetworks: AdNetwork[]
  rejectedNetworks: Array<{
    network: AdNetwork
    reason: string
  }>
  projectedEcpm: number
  confidence: number
}

export interface ProjectedImpact {
  currentMetrics: {
    revenue: number
    fillRate: number
    ecpm: number
    impressions: number
  }
  projectedMetrics: {
    revenue: number
    fillRate: number
    ecpm: number
    impressions: number
  }
  improvement: {
    revenueChange: number
    fillRateChange: number
    ecpmChange: number
    impressionsChange: number
  }
}

export interface Alert {
  id: string
  type: "warning" | "error" | "info"
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  isRead: boolean
  createdAt: Date
  relatedRuleId?: string
  relatedGeo?: string
  relatedFormat?: string
}

export interface DashboardMetrics {
  totalRevenue: number
  totalImpressions: number
  averageEcpm: number
  averageFillRate: number
  activeRules: number
  activeNetworks: number
  revenueChange: number
  impressionsChange: number
  period: string
}
