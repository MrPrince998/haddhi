// components/docs-kit/code-block.tsx
"use client"

import { useState } from "react"
import { Check, Copy, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Maximize2, Minimize2, RefreshCw, Lock, Globe } from "lucide-react"

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <article className="flex max-w-4xl flex-col gap-10 px-1 md:px-6">
      {children}
    </article>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <header className="flex max-w-3xl flex-col gap-5">
      <Badge variant="secondary" className="w-fit">
        {eyebrow}
      </Badge>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl leading-tight font-semibold text-balance md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
      {children}
    </header>
  )
}

export function SectionHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

type CodeBlockProps = {
  title?: string
  code: string
  language?: string
  showLineNumbers?: boolean
  maxHeight?: string
  className?: string
  variant?: "default" | "compact" | "bordered"
}

export function CodeBlock({
  title,
  code,
  language = "tsx",
  showLineNumbers = false,
  maxHeight,
  className,
  variant = "default",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [copiedTimeout, setCopiedTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      if (copiedTimeout) clearTimeout(copiedTimeout)
      const timeout = setTimeout(() => setCopied(false), 2000)
      setCopiedTimeout(timeout)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Split code into lines for line numbers
  const codeLines = code.split("\n")
  const lineCount = codeLines.length

  // Language badge colors
  const languageColors: Record<string, string> = {
    tsx: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    jsx: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    javascript:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    typescript:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    bash: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    json: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    css: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    html: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    txt: "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400",
  }

  const languageColor =
    languageColors[language.toLowerCase()] || "bg-muted text-muted-foreground"

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("group relative", className)}>
        <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 gap-1.5 text-xs"
          >
            {copied ? (
              <>
                <CheckCheck className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
        <pre
          className={cn(
            "overflow-x-auto rounded-lg bg-muted/50 p-3 text-xs leading-5",
            maxHeight && `max-h-[${maxHeight}] overflow-y-auto`
          )}
        >
          <code className="font-mono">{code}</code>
        </pre>
        {language && (
          <div className="absolute right-2 bottom-2">
            <Badge variant="outline" className="text-[10px] uppercase">
              {language}
            </Badge>
          </div>
        )}
      </div>
    )
  }

  // Bordered variant
  if (variant === "bordered") {
    return (
      <div className={cn("overflow-hidden rounded-lg border", className)}>
        {title && (
          <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
            <span className="text-sm font-medium">{title}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-7 gap-1 text-xs"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        )}
        <pre
          className={cn(
            "overflow-x-auto p-4 text-xs leading-5",
            maxHeight && `max-h-[${maxHeight}] overflow-y-auto`
          )}
        >
          <code className="font-mono">{code}</code>
        </pre>
        {!title && language && (
          <div className="border-t bg-muted/30 px-4 py-1.5 text-right">
            <span className="font-mono text-[10px] text-muted-foreground">
              {language}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden", className)}>
      {(title || language) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            {title && <CardTitle className="text-base">{title}</CardTitle>}
            {language && (
              <CardDescription className="text-xs">{language}</CardDescription>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-8 gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </CardHeader>
      )}
      <CardContent className={!title && !language ? "pt-6" : ""}>
        <div className="relative">
          {showLineNumbers && lineCount > 1 && (
            <div className="absolute top-3 left-3 flex flex-col text-right font-mono text-xs text-muted-foreground/50">
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i + 1} className="leading-5">
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          <pre
            className={cn(
              "overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-5",
              showLineNumbers && lineCount > 1 && "pl-10",
              maxHeight && `max-h-[${maxHeight}] overflow-y-auto`
            )}
          >
            <code className="font-mono whitespace-pre">{code}</code>
          </pre>
        </div>
        {language && !title && (
          <div className="mt-2 flex justify-end">
            <Badge
              variant="outline"
              className={cn("text-[10px] uppercase", languageColor)}
            >
              {language}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

type BrowserFrameProps = {
  url?: string
  label?: string
  children: ReactNode
  variant?: "default" | "mac" | "windows" | "minimal"
  isLoading?: boolean
  showRefresh?: boolean
  showUrlBar?: boolean
  className?: string
  contentClassName?: string
}

export function BrowserFrame({
  url = "localhost:3000",
  label,
  children,
  variant = "mac",
  isLoading = false,
  showRefresh = false,
  showUrlBar = true,
  className,
  contentClassName,
}: BrowserFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 500)
  }

  // Window controls based on variant
  const windowControls = {
    mac: {
      buttons: (
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-green-500/80 shadow-sm" />
        </div>
      ),
      urlBarBg: "bg-muted/50",
    },
    windows: {
      buttons: (
        <div className="flex items-center gap-0.5 text-muted-foreground">
          <span className="text-xs">□</span>
          <span className="text-xs">□</span>
          <span className="text-xs">✕</span>
        </div>
      ),
      urlBarBg: "bg-muted/30",
    },
    minimal: {
      buttons: null,
      urlBarBg: "bg-transparent",
    },
    default: {
      buttons: (
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full border border-muted-foreground/30" />
          <div className="h-2.5 w-2.5 rounded-full border border-muted-foreground/30" />
          <div className="h-2.5 w-2.5 rounded-full border border-muted-foreground/30" />
        </div>
      ),
      urlBarBg: "bg-muted/40",
    },
  }

  const controls = windowControls[variant]

  // Fullscreen mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center gap-3">
              {controls.buttons}
              {showUrlBar && (
                <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs">{url}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {showRefresh && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRefresh}
                  className="h-7 w-7 p-0"
                >
                  <RefreshCw
                    className={cn("h-3.5 w-3.5", refreshing && "animate-spin")}
                  />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsFullscreen(false)}
                className="h-7 w-7 p-0"
              >
                <Minimize2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        className
      )}
    >
      <CardHeader
        className={cn("border-b p-3", variant === "minimal" && "border-b-0")}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {controls.buttons}
              {showUrlBar && (
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1",
                    controls.urlBarBg
                  )}
                >
                  <Lock className="h-2.5 w-2.5 text-emerald-500" />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {url}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              {showRefresh && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRefresh}
                  className="h-6 w-6 p-0"
                >
                  <RefreshCw
                    className={cn("h-3 w-3", refreshing && "animate-spin")}
                  />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsFullscreen(true)}
                className="h-6 w-6 p-0"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          {label && (
            <CardDescription className="text-xs">
              {label}
              {isLoading && (
                <Badge variant="secondary" className="ml-2 text-[10px]">
                  loading
                </Badge>
              )}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn("p-4", contentClassName)}>
        <div className={cn(isLoading && "opacity-50 transition-opacity")}>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

type MetricCardProps = {
  label: string
  value: string | number
  detail?: string
  icon?: ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  variant?: "default" | "gradient" | "bordered"
  className?: string
  valueClassName?: string
  size?: "sm" | "default" | "lg"
}

export function MetricCard({
  label,
  value,
  detail,
  icon,
  trend,
  trendValue,
  variant = "default",
  className,
  valueClassName,
  size = "default",
}: MetricCardProps) {
  // Size mappings
  const sizeClasses = {
    sm: {
      card: "p-3",
      title: "text-xl",
      label: "text-xs",
      detail: "text-[10px]",
    },
    default: {
      card: "p-4",
      title: "text-2xl",
      label: "text-xs",
      detail: "text-xs",
    },
    lg: {
      card: "p-5",
      title: "text-3xl",
      label: "text-sm",
      detail: "text-sm",
    },
  }

  // Trend icons and colors
  const trendConfig = {
    up: {
      icon: "↑",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    down: {
      icon: "↓",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    neutral: {
      icon: "→",
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  }

  const currentSize = sizeClasses[size]
  const currentTrend = trend ? trendConfig[trend] : null

  // Variant styles
  const variantClasses = {
    default: "",
    gradient:
      "bg-gradient-to-br from-primary/5 via-primary/0 to-transparent border-primary/20",
    bordered: "border-2 border-primary/10 shadow-none",
  }

  return (
    <Card
      className={cn(
        "group transition-all hover:shadow-md",
        variantClasses[variant],
        className
      )}
    >
      <CardHeader className={cn("space-y-1", currentSize.card)}>
        <div className="flex items-center justify-between">
          <CardDescription className={cn("font-medium", currentSize.label)}>
            {label}
          </CardDescription>
          {icon && (
            <div className="text-muted-foreground transition-colors group-hover:text-primary">
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <CardTitle
            className={cn(
              "font-bold tracking-tight",
              currentSize.title,
              valueClassName
            )}
          >
            {value}
          </CardTitle>
          {trend && trendValue && (
            <Badge
              variant="secondary"
              className={cn(
                "font-mono text-[10px]",
                currentTrend?.bg,
                currentTrend?.color
              )}
            >
              {currentTrend?.icon} {trendValue}
            </Badge>
          )}
        </div>
      </CardHeader>
      {detail && (
        <CardContent className={cn(currentSize.card, "pt-0")}>
          <p className={cn("text-muted-foreground", currentSize.detail)}>
            {detail}
          </p>
        </CardContent>
      )}
    </Card>
  )
}

type StepCardProps = {
  index: number
  title: string
  description: string
  children?: ReactNode
  icon?: ReactNode
  className?: string
  variant?: "default" | "compact" | "detailed"
}

export function StepCard({
  index,
  title,
  description,
  children,
  icon,
  className,
  variant = "default",
}: StepCardProps) {
  // Format index with leading zero for two-digit numbers
  const formattedIndex = index.toString().padStart(2, "0")

  // Gradient colors based on index
  const gradientColors = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-violet-500",
    "from-rose-500 to-amber-500",
  ]
  const gradient = gradientColors[(index - 1) % gradientColors.length]

  // Compact variant
  if (variant === "compact") {
    return (
      <Card className={cn("group transition-all hover:shadow-md", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br font-mono text-base font-bold text-white shadow-sm",
                gradient
              )}
            >
              {formattedIndex}
            </div>
            <div className="flex-1">
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="mt-1 text-sm leading-relaxed">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        {children && <CardContent className="pt-0">{children}</CardContent>}
      </Card>
    )
  }

  // Detailed variant
  if (variant === "detailed") {
    return (
      <Card
        className={cn(
          "group overflow-hidden transition-all hover:shadow-md",
          className
        )}
      >
        <div className="relative">
          {/* Decorative gradient bar */}
          <div
            className={cn(
              "absolute top-0 left-0 h-1 w-full bg-linear-to-r",
              gradient
            )}
          />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "h-7 w-7 rounded-full p-0 text-center font-mono text-xs font-semibold",
                    "border-primary/30 bg-primary/5 text-primary"
                  )}
                >
                  {index}
                </Badge>
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
              {icon && <div className="text-muted-foreground">{icon}</div>}
            </div>
            <CardDescription className="mt-2 text-sm leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>
          {children && (
            <CardContent className="border-t bg-muted/20 pt-4">
              {children}
            </CardContent>
          )}
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={cn("group transition-all hover:shadow-md", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className={cn(
              "h-6 w-6 rounded-full p-0 text-center font-mono text-xs transition-all group-hover:border-primary group-hover:text-primary",
              "border-border"
            )}
          >
            {index}
          </Badge>
          <CardTitle className="text-base">{title}</CardTitle>
          {icon && <div className="ml-auto text-muted-foreground">{icon}</div>}
        </div>
        <CardDescription className="mt-2 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {children && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  )
}
