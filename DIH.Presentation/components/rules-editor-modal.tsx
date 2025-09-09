"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { DecisionRule, RuleCondition } from "@/types/demand-intelligence"

interface RulesEditorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  rule?: DecisionRule
  onSave: (rule: Partial<DecisionRule>) => void
}

export function RulesEditorModal({ open, onOpenChange, rule, onSave }: RulesEditorModalProps) {
  const [formData, setFormData] = useState<Partial<DecisionRule>>({
    name: rule?.name || "",
    description: rule?.description || "",
    priority: rule?.priority || 1,
    isActive: rule?.isActive ?? true,
    conditions: rule?.conditions || [],
    actions: rule?.actions || [],
  })

  const [newCondition, setNewCondition] = useState<Partial<RuleCondition>>({
    field: "",
    operator: "equals",
    value: "",
  })

  const addCondition = () => {
    if (newCondition.field && newCondition.value) {
      setFormData({
        ...formData,
        conditions: [
          ...(formData.conditions || []),
          {
            id: Date.now().toString(),
            field: newCondition.field!,
            operator: newCondition.operator!,
            value: newCondition.value!,
          },
        ],
      })
      setNewCondition({ field: "", operator: "equals", value: "" })
    }
  }

  const removeCondition = (conditionId: string) => {
    setFormData({
      ...formData,
      conditions: formData.conditions?.filter((c) => c.id !== conditionId) || [],
    })
  }

  const handleSave = () => {
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{rule ? "Edit Rule" : "Create New Rule"}</DialogTitle>
          <DialogDescription>
            Configure decision rules for network selection based on format, geography, and performance metrics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Rule Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., High eCPM Banner US"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="100"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe when this rule should be applied..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Conditions</Label>
              <Badge variant="secondary">{formData.conditions?.length || 0} conditions</Badge>
            </div>

            {formData.conditions && formData.conditions.length > 0 && (
              <div className="space-y-2">
                {formData.conditions.map((condition) => (
                  <div key={condition.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border">
                    <span className="text-sm font-medium">{condition.field}</span>
                    <span className="text-sm text-muted-foreground">{condition.operator}</span>
                    <span className="text-sm">{condition.value}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(condition.id)}
                      className="ml-auto h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-2">
              <Select
                value={newCondition.field}
                onValueChange={(value) => setNewCondition({ ...newCondition, field: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="format">Format</SelectItem>
                  <SelectItem value="geo">Geography</SelectItem>
                  <SelectItem value="ecpm">eCPM</SelectItem>
                  <SelectItem value="fillRate">Fill Rate</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={newCondition.operator}
                onValueChange={(value) => setNewCondition({ ...newCondition, operator: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="not_equals">Not Equals</SelectItem>
                  <SelectItem value="greater_than">Greater Than</SelectItem>
                  <SelectItem value="less_than">Less Than</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-1">
                <Input
                  value={newCondition.value}
                  onChange={(e) => setNewCondition({ ...newCondition, value: e.target.value })}
                  placeholder="Value"
                />
                <Button onClick={addCondition} size="sm" variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Actions</Label>
            <div className="p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <p className="text-sm text-muted-foreground text-center">
                Action configuration will be available in the next update
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.name}>
            {rule ? "Update Rule" : "Create Rule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
