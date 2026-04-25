"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Check, Copy, Star } from "lucide-react"

const installCommand = "npm install @haddhi/react"

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92v2.79c0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function CountUpNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 900
    const start = performance.now()
    let frame = 0

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(Math.round(value * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [value])

  return <span>{displayValue.toLocaleString()}</span>
}

export function InstallCommandBar({ stars }: { stars: number }) {
  const [copied, setCopied] = useState(false)

  const copyCommand = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex h-10 min-w-0 items-center rounded-lg bg-stone-950 text-sm text-white shadow-sm">
        <span className="px-3 font-mono text-muted-foreground">$</span>
        <code className="min-w-0 truncate pr-4 font-mono text-[13px]">
          {installCommand}
        </code>
        <button
          type="button"
          aria-label="Copy install command"
          onClick={copyCommand}
          className="flex h-10 items-center border-l border-white/10 px-3 text-stone-400 transition-colors hover:text-white"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>

      <Link
        href="https://github.com/MrPrince998/haddhi"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-950 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-stone-800"
      >
        <GitHubMark />
        <CountUpNumber value={stars} />
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
      </Link>
    </div>
  )
}
