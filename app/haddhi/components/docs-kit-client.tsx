"use client"

import { useRef, useState, type ReactNode } from "react"
import {
  Check,
  CheckCheck,
  Copy,
  Globe,
  Lock,
  Maximize2,
  Minimize2,
  RefreshCw,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CodeBlockProps = {
  title?: string
  code: string
  language?: string
  showLineNumbers?: boolean
  maxHeight?: string
  className?: string
  variant?: "default" | "compact" | "bordered"
}

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
  const copiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      if (copiedTimeout.current) {
        clearTimeout(copiedTimeout.current)
      }

      copiedTimeout.current = setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const codeLines = code.split("\n")
  const lineCount = codeLines.length
  const languageColor =
    languageColors[language.toLowerCase()] ?? "bg-muted text-muted-foreground"
  const scrollStyle = maxHeight ? { maxHeight } : undefined

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
            maxHeight && "overflow-y-auto"
          )}
          style={scrollStyle}
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
            maxHeight && "overflow-y-auto"
          )}
          style={scrollStyle}
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
              {codeLines.map((_, index) => (
                <div key={index + 1} className="leading-5">
                  {index + 1}
                </div>
              ))}
            </div>
          )}
          <pre
            className={cn(
              "overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-5",
              showLineNumbers && lineCount > 1 && "pl-10",
              maxHeight && "overflow-y-auto"
            )}
            style={scrollStyle}
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
        <span className="text-xs">[]</span>
        <span className="text-xs">[]</span>
        <span className="text-xs">x</span>
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
  const controls = windowControls[variant]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 500)
  }

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
