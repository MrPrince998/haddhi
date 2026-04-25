import { Geist_Mono, Inter } from "next/font/google"
import { Metadata, Viewport } from "next"
import Link from "next/link"
import { MoveRight, Bone, Sparkles } from "lucide-react"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import version from "../../../packages/react/package.json"
import Asidebar from "@/components/asidebar"
import { FaGithub } from "react-icons/fa"
import Footer from "@/components/footer"
import { MobileNav } from "@/components/mobile-nav"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

// Metadata for better SEO
export const metadata: Metadata = {
  title: {
    default: "Haddhi · Skeleton UI for React",
    template: "%s | Haddhi",
  },
  description:
    "Haddhi generates skeleton loading screens that match your existing React UI. Auto-measurement, presets, animations, and TypeScript support.",
  keywords: [
    "react",
    "skeleton",
    "loading",
    "ui",
    "placeholder",
    "haddhi",
    "bone",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "MrPrince998" }],
  openGraph: {
    title: "Haddhi · Skeleton UI for React",
    description:
      "Generate skeleton screens from the UI you already built. Auto-measure, presets, animations — zero boilerplate.",
    type: "website",
    locale: "en_US",
    siteName: "Haddhi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haddhi · Skeleton UI for React",
    description: "Generate skeleton screens from the UI you already built.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
}

// Get GitHub stars (could be fetched in a server component, but keeping simple)
const GITHUB_REPO = "https://github.com/MrPrince998/haddhi"

// Version banner component
const VersionBanner = () => {
  return (
    <Link
      href="/changelog"
      className="group fixed top-0 right-0 left-0 z-50 hidden w-full items-center justify-center gap-2 bg-linear-to-r from-stone-900 via-stone-800 to-stone-900 px-4 py-2.5 text-[13px] text-stone-300 transition-all duration-300 hover:text-white md:flex"
    >
      <Sparkles className="size-3.5 text-emerald-400" />
      <span className="font-medium">
        <span className="text-emerald-400">{`v${version.version}`}</span>
      </span>
      <span className="hidden sm:inline">— What&apos;s new?</span>
      <span className="inline sm:hidden">Changelog</span>
      <MoveRight className="size-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:-rotate-45" />
    </Link>
  )
}

// Mobile header component (visible on smaller screens)
const MobileHeader = () => {
  return (
    <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
      <div className="flex items-center gap-2">
        <MobileNav />

        <Link href="/overview" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/70 shadow-sm">
            <Bone className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-tight">Haddhi</span>
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />

        <Link
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub repository"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FaGithub className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

// Desktop header (version banner)
const DesktopHeader = () => {
  return <VersionBanner />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, inter.variable)}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DesktopHeader />

          <div className="mx-auto flex h-screen max-w-300">
            <Asidebar />

            <main className="relative no-scrollbar flex min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {/* Mobile header */}
              <MobileHeader />

              {/* Main content area with proper padding for version banner */}
              <div className="flex-1 pt-4 md:pt-16">
                <div className="container mx-auto px-4 md:px-6">{children}</div>
              </div>

              {/* Footer */}
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
