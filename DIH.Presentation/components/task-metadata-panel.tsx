"use client"

import { ExternalLink } from 'lucide-react'

interface TaskMetadataItem {
  label: string
  value: string
  isLink?: boolean
}

interface TaskMetadataPanelProps {
  metadata: {
    diagnosticCodes: string
    remedyCodes: string
    taskType: string
    appId: string
    bundleId: string
    buildVersion: string
    storeVersion: string
    tdd: string
    language: string
    project: string
    figmaLink: string
    bitbucketLink: string
    storePage: string
    selectedProvider: string
    storeAccount: string
    vendor: string
  }
}

export function TaskMetadataPanel({ metadata }: TaskMetadataPanelProps) {
  const firstRowItems: TaskMetadataItem[] = [
    { label: "Diagnostic Codes", value: metadata.diagnosticCodes },
    { label: "Remedy Codes", value: metadata.remedyCodes },
    { label: "Task Type", value: metadata.taskType },
    { label: "App ID", value: metadata.appId, isLink: true },
    { label: "Bundle ID", value: metadata.bundleId },
    { label: "Build Version", value: metadata.buildVersion },
    { label: "Store Version", value: metadata.storeVersion },
    { label: "TDD", value: metadata.tdd, isLink: true },
    { label: "Language", value: metadata.language },
  ]

  const secondRowItems: TaskMetadataItem[] = [
    { label: "Project", value: metadata.project },
    { label: "Figma Link", value: metadata.figmaLink, isLink: true },
    { label: "Bitbucket Link", value: metadata.bitbucketLink, isLink: true },
    { label: "Store Page", value: metadata.storePage, isLink: true },
    { label: "Selected Provider", value: metadata.selectedProvider },
    { label: "Store Account", value: metadata.storeAccount },
    { label: "Vendor", value: metadata.vendor },
  ]

  const renderMetadataItem = (item: TaskMetadataItem) => (
    <div key={item.label} className="flex flex-col space-y-2">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{item.label}</span>{" "}
      {/* Changed from text-gray-500 */}
      <div
        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-muted text-foreground border border-border ${
          item.isLink ? "cursor-pointer hover:bg-accent" : ""
        }`}
      >
        <span className={item.isLink ? "hover:underline" : ""}>{item.value}</span>
        {item.isLink && <ExternalLink className="h-3 w-3 ml-1" />}
      </div>
    </div>
  )

  return null
}
