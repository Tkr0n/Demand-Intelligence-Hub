import type { AdFormat, Geography, AdNetwork, DemandRule, Alert, DashboardMetrics } from "@/types/demand-intelligence"

export const mockFormats: AdFormat[] = [
  { id: "1", name: "Banner 320x50", description: "Mobile banner", isActive: true },
  { id: "2", name: "Banner 728x90", description: "Desktop leaderboard", isActive: true },
  { id: "3", name: "Interstitial", description: "Full screen ad", isActive: true },
  { id: "4", name: "Rewarded Video", description: "Video with reward", isActive: true },
  { id: "5", name: "Native", description: "Native content ad", isActive: true },
]

export const mockGeographies: Geography[] = [
  { id: "1", code: "US", name: "United States", region: "North America", flag: "🇺🇸" },
  { id: "2", code: "MX", name: "Mexico", region: "North America", flag: "🇲🇽" },
  { id: "3", code: "BR", name: "Brazil", region: "South America", flag: "🇧🇷" },
  { id: "4", code: "GB", name: "United Kingdom", region: "Europe", flag: "🇬🇧" },
  { id: "5", code: "DE", name: "Germany", region: "Europe", flag: "🇩🇪" },
  { id: "6", code: "JP", name: "Japan", region: "Asia", flag: "🇯🇵" },
  { id: "7", code: "IN", name: "India", region: "Asia", flag: "🇮🇳" },
]

export const mockGeos = mockGeographies

export const mockNetworks: AdNetwork[] = [
  {
    id: "1",
    name: "AdMob",
    isActive: true,
    status: "online",
    fillRate: 0.85,
    averageEcpm: 2.45,
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Meta Audience Network",
    isActive: true,
    status: "online",
    fillRate: 0.78,
    averageEcpm: 3.12,
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Unity Ads",
    isActive: true,
    status: "online",
    fillRate: 0.92,
    averageEcpm: 1.89,
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "AppLovin",
    isActive: false,
    status: "maintenance",
    fillRate: 0.67,
    averageEcpm: 2.78,
    lastUpdated: new Date(),
  },
  {
    id: "5",
    name: "IronSource",
    isActive: true,
    status: "online",
    fillRate: 0.81,
    averageEcpm: 2.34,
    lastUpdated: new Date(),
  },
]

export const mockRules: DemandRule[] = [
  {
    id: "1",
    name: "US Premium Banner",
    description: "High eCPM rule for US banner traffic",
    isActive: true,
    priority: 1,
    conditions: {
      formats: ["1", "2"],
      geos: ["1"],
      minEcpm: 2.5,
      preferredNetworks: ["2", "4"],
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    createdBy: "john.doe@company.com",
  },
  {
    id: "2",
    name: "LATAM Video Optimization",
    description: "Optimized for video ads in Latin America",
    isActive: true,
    priority: 2,
    conditions: {
      formats: ["4"],
      geos: ["2", "3"],
      minEcpm: 1.8,
      preferredNetworks: ["1", "3"],
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    createdBy: "maria.garcia@company.com",
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Low Fill Rate Detected",
    message: "AppLovin network showing 45% fill rate drop in US market",
    severity: "medium",
    isRead: false,
    createdAt: new Date(),
    relatedGeo: "1",
  },
  {
    id: "2",
    type: "error",
    title: "Rule Conflict",
    message: "Multiple rules targeting same geo/format combination",
    severity: "high",
    isRead: false,
    createdAt: new Date(),
    relatedRuleId: "1",
  },
]

export const mockDashboardMetrics: DashboardMetrics = {
  totalRevenue: 125430.5,
  totalImpressions: 2847392,
  averageEcpm: 2.34,
  averageFillRate: 0.82,
  activeRules: 12,
  activeNetworks: 8,
  revenueChange: 0.15,
  impressionsChange: 0.08,
  period: "Last 7 days",
}
