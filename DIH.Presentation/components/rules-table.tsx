"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2, Plus, Settings } from "lucide-react"
import type { DecisionRule } from "@/types/demand-intelligence"
import { RulesEditorModal } from "./rules-editor-modal"

const mockRules: DecisionRule[] = [
  {
    id: "1",
    name: "High eCPM Banner US",
    description: "Prioritize premium networks for banner ads in US market",
    priority: 1,
    isActive: true,
    conditions: [
      { id: "c1", field: "format", operator: "equals", value: "banner" },
      { id: "c2", field: "geo", operator: "equals", value: "US" },
      { id: "c3", field: "ecpm", operator: "greater_than", value: "2.00" },
    ],
    actions: [{ id: "a1", type: "select_network", value: "admob-premium" }],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "EU GDPR Compliant",
    description: "Use GDPR-compliant networks for EU traffic",
    priority: 2,
    isActive: true,
    conditions: [{ id: "c4", field: "geo", operator: "contains", value: "EU" }],
    actions: [{ id: "a2", type: "filter_networks", value: "gdpr-compliant" }],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    name: "Low Fill Rate Fallback",
    description: "Fallback to secondary networks when fill rate is low",
    priority: 3,
    isActive: false,
    conditions: [{ id: "c5", field: "fillRate", operator: "less_than", value: "70" }],
    actions: [{ id: "a3", type: "fallback_network", value: "unity-ads" }],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
  },
]

export function RulesTable() {
  const [rules, setRules] = useState<DecisionRule[]>(mockRules)
  const [editingRule, setEditingRule] = useState<DecisionRule | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateRule = () => {
    setEditingRule(undefined)
    setIsModalOpen(true)
  }

  const handleEditRule = (rule: DecisionRule) => {
    setEditingRule(rule)
    setIsModalOpen(true)
  }

  const handleSaveRule = (ruleData: Partial<DecisionRule>) => {
    if (editingRule) {
      // Update existing rule
      setRules(rules.map((r) => (r.id === editingRule.id ? { ...r, ...ruleData, updatedAt: new Date() } : r)))
    } else {
      // Create new rule
      const newRule: DecisionRule = {
        id: Date.now().toString(),
        ...(ruleData as DecisionRule),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setRules([...rules, newRule])
    }
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((r) => r.id !== ruleId))
  }

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map((r) => (r.id === ruleId ? { ...r, isActive: !r.isActive, updatedAt: new Date() } : r)))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Decision Rules
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Configure rules that determine network selection for different scenarios
              </p>
            </div>
            <Button onClick={handleCreateRule}>
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{rule.name}</p>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {rule.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {rule.conditions.slice(0, 2).map((condition) => (
                          <Badge key={condition.id} variant="secondary" className="text-xs">
                            {condition.field} {condition.operator} {condition.value}
                          </Badge>
                        ))}
                        {rule.conditions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{rule.conditions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRuleStatus(rule.id)}
                        className="p-0 h-auto"
                      >
                        <Badge
                          variant={rule.isActive ? "default" : "secondary"}
                          className={rule.isActive ? "bg-success hover:bg-success/80" : ""}
                        >
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {rule.updatedAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditRule(rule)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRule(rule.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <RulesEditorModal open={isModalOpen} onOpenChange={setIsModalOpen} rule={editingRule} onSave={handleSaveRule} />
    </>
  )
}
