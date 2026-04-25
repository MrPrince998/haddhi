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

export { BrowserFrame, CodeBlock } from "@/components/docs-kit-client"

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

const metricSizeClasses = {
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

const trendConfig = {
  up: {
    icon: "up",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  down: {
    icon: "down",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  neutral: {
    icon: "flat",
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
}

const metricVariantClasses = {
  default: "",
  gradient:
    "bg-gradient-to-br from-primary/5 via-primary/0 to-transparent border-primary/20",
  bordered: "border-2 border-primary/10 shadow-none",
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
  const currentSize = metricSizeClasses[size]
  const currentTrend = trend ? trendConfig[trend] : null

  return (
    <Card
      className={cn(
        "group transition-all hover:shadow-md",
        metricVariantClasses[variant],
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

const stepGradientColors = [
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-amber-500",
]

export function StepCard({
  index,
  title,
  description,
  children,
  icon,
  className,
  variant = "default",
}: StepCardProps) {
  const formattedIndex = index.toString().padStart(2, "0")
  const gradient = stepGradientColors[(index - 1) % stepGradientColors.length]

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

  if (variant === "detailed") {
    return (
      <Card
        className={cn(
          "group overflow-hidden transition-all hover:shadow-md",
          className
        )}
      >
        <div className="relative">
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
