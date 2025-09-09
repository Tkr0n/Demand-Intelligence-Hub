"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Copy, Plus, Save, X } from "lucide-react"
import { mockFormats, mockGeos, mockNetworks } from "@/lib/mock-data"

interface AdFormData {
  name: string
  description: string
  appName: string
  bundleId: string
  platform: string
  format: string
  targetGeos: string[]
  targetEcpm: string
  preferredNetworks: string[]
  budget: string
  startDate: string
  endDate: string
}

export function NewAdForm() {
  const [formData, setFormData] = useState<AdFormData>({
    name: "",
    description: "",
    appName: "",
    bundleId: "",
    platform: "",
    format: "",
    targetGeos: [],
    targetEcpm: "",
    preferredNetworks: [],
    budget: "",
    startDate: "",
    endDate: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGeoChange = (geoCode: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        targetGeos: [...prev.targetGeos, geoCode],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        targetGeos: prev.targetGeos.filter((code) => code !== geoCode),
      }))
    }
  }

  const handleNetworkChange = (networkId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        preferredNetworks: [...prev.preferredNetworks, networkId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredNetworks: prev.preferredNetworks.filter(
          (id) => id !== networkId
        ),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Ad created:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      description: "",
      appName: "",
      bundleId: "",
      platform: "",
      format: "",
      targetGeos: [],
      targetEcpm: "",
      preferredNetworks: [],
      budget: "",
      startDate: "",
      endDate: "",
    })
  }

  const removeGeo = (geoCode: string) => {
    setFormData((prev) => ({
      ...prev,
      targetGeos: prev.targetGeos.filter((code) => code !== geoCode),
    }))
  }

  const removeNetwork = (networkId: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredNetworks: prev.preferredNetworks.filter(
        (id) => id !== networkId
      ),
    }))
  }

  const getAdFormatValueById = (id: string) => {
    // make a switch of ads
    switch (id) {
      case "1":
      case "2":
        return "banner"
      case "3":
        return "interstitial"
      case "4":
        return "rewarded"
      case "5":
        return "native"
      default:
        return "unknown"
    }
  }

  const handleCopyToExtension = () => {
    window.postMessage({
      action: "x-newry-payload-change",
      payload: {
        adUnit: {
          name: formData.name,
          description: formData.description,
          format: getAdFormatValueById(formData.format),
        },
        app: {
          name: formData.appName,
          bundleId: formData.bundleId,
          platform: formData.platform.toLowerCase(),
        },
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Ad Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter ad name"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your ad campaign"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="appName">App Name *</Label>
              <Input
                id="appName"
                value={formData.appName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, appName: e.target.value }))
                }
                placeholder="Enter app name"
                required
              />
            </div>

            <div>
              <Label htmlFor="bundleId">Bundle ID *</Label>
              <Input
                id="bundleId"
                value={formData.bundleId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bundleId: e.target.value }))
                }
                placeholder="com.example.app"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                App package identifier
              </p>
            </div>

            <div>
              <Label htmlFor="platform">Platform *</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, platform: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="ios">iOS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="format">Ad Format *</Label>
              <Select
                value={formData.format}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ad format" />
                </SelectTrigger>
                <SelectContent>
                  {mockFormats.map((format) => (
                    <SelectItem key={format.id} value={format.id}>
                      {format.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Targeting & Budget */}
        <Card>
          <CardHeader>
            <CardTitle>Targeting & Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="targetEcpm">Target eCPM *</Label>
              <Input
                id="targetEcpm"
                type="number"
                step="0.01"
                min="0"
                value={formData.targetEcpm}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    targetEcpm: e.target.value,
                  }))
                }
                placeholder="0.00"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                USD per 1000 impressions
              </p>
            </div>

            <div>
              <Label htmlFor="budget">Total Budget</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                value={formData.budget}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, budget: e.target.value }))
                }
                placeholder="0.00"
              />
              <p className="text-xs text-muted-foreground mt-1">USD</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Targeting */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Targeting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {mockGeos.map((geo) => (
                <div key={geo.code} className="flex items-center space-x-2">
                  <Checkbox
                    id={geo.code}
                    checked={formData.targetGeos.includes(geo.code)}
                    onCheckedChange={(checked) =>
                      handleGeoChange(geo.code, checked as boolean)
                    }
                  />
                  <Label htmlFor={geo.code} className="text-sm">
                    {geo.name}
                  </Label>
                </div>
              ))}
            </div>

            {formData.targetGeos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm font-medium">Selected:</span>
                {formData.targetGeos.map((geoCode) => {
                  const geo = mockGeos.find((g) => g.code === geoCode)
                  return (
                    <Badge
                      key={geoCode}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {geo?.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeGeo(geoCode)}
                      />
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Network Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferred Networks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockNetworks.map((network) => (
                <div key={network.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={network.id}
                    checked={formData.preferredNetworks.includes(network.id)}
                    onCheckedChange={(checked) =>
                      handleNetworkChange(network.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={network.id} className="text-sm">
                    {network.name}
                  </Label>
                </div>
              ))}
            </div>

            {formData.preferredNetworks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <span className="text-sm font-medium">Selected:</span>
                {formData.preferredNetworks.map((networkId) => {
                  const network = mockNetworks.find((n) => n.id === networkId)
                  return (
                    <Badge
                      key={networkId}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {network?.name}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeNetwork(networkId)}
                      />
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="button" variant="outline" onClick={handleCopyToExtension}>
          <Copy className="h-4 w-4 mr-2" />
          Copy to Extension
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Save className="h-4 w-4 mr-2 animate-spin" />
              Creating Ad...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Ad
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
