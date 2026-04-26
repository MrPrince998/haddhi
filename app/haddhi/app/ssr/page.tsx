import {
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
  StepCard,
} from "@/components/docs-kit"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Cpu,
  Globe,
  Zap,
  Layout,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  FileJson,
} from "lucide-react"
import Link from "next/link"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/ssr")

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Server-Side Rendering"
        title="Keep browser measurement behind a client boundary."
        description="Auto mode needs the DOM. In server-rendered apps, put Haddhi in client components and use presets when you want predictable server-friendly fallback shapes."
      />

      {/* Architecture diagram as cards */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-500" />
              <CardTitle>Server Component</CardTitle>
            </div>
            <CardDescription>
              No Haddhi import here — just data fetching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              variant="compact"
              code={`// app/page.tsx (Server Component)
import { Suspense } from "react"
import { ArticleSkeleton } from "./client-wrapper"

export default async function Page() {
  const data = await fetchData()
  
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContent data={data} />
    </Suspense>
  )
}`}
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-emerald-500" />
              <CardTitle>Client Wrapper</CardTitle>
            </div>
            <CardDescription>use client boundary with Haddhi</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              variant="compact"
              code={`// app/client-wrapper.tsx (Client Component)
"use client"

import { Haddhi } from "@haddhi/react"

export function ArticleSkeleton() {
  return <Haddhi loading preset="article" />
}`}
            />
          </CardContent>
        </Card>
      </section>

      {/* Critical alert for Next.js */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Next.js App Router — Critical</AlertTitle>
        <AlertDescription>
          Files that import Haddhi directly should start with the{" "}
          <Badge
            variant="outline"
            className="bg-amber-100 font-mono dark:bg-amber-900"
          >
            {'"use client"'}
          </Badge>{" "}
          directive. Server components can pass children into that boundary, but
          cannot use Haddhi directly due to auto-measurement requiring the DOM.
        </AlertDescription>
      </Alert>

      {/* Code examples with tabs */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Implementation patterns"
          description="Three ways to use Haddhi with SSR frameworks"
        />
        <Tabs defaultValue="wrapper" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wrapper">Client Wrapper</TabsTrigger>
            <TabsTrigger value="preset">Preset Pattern</TabsTrigger>
            <TabsTrigger value="suspense">Suspense Pattern</TabsTrigger>
          </TabsList>

          <TabsContent value="wrapper" className="mt-4 space-y-4">
            <CodeBlock
              title="✅ Best practice: Isolated client component"
              code={`// components/loading-boundary.tsx
"use client"

import { Haddhi } from "@haddhi/react"

export function LoadingBoundary({ 
  loading, 
  children,
  preset,
  variant 
}: { 
  loading: boolean
  children: React.ReactNode
  preset?: string
  variant?: string
}) {
  return (
    <Haddhi loading={loading} preset={preset} variant={variant}>
      {children}
    </Haddhi>
  )
}

// app/page.tsx (Server Component)
import { LoadingBoundary } from "@/components/loading-boundary"

export default function Page() {
  return (
    <LoadingBoundary loading={isLoading}>
      <MyComponent />
    </LoadingBoundary>
  )
}`}
            />
          </TabsContent>

          <TabsContent value="preset" className="mt-4 space-y-4">
            <CodeBlock
              title="🎨 Presets work in Server Components"
              code={`// ✅ This works because presets don't need DOM measurement
// app/components/article-skeleton.tsx
import { Haddhi } from "@haddhi/react"

export function ArticleSkeleton() {
  return <Haddhi loading preset="article" animation="shimmer" />
}

// app/page.tsx
import { ArticleSkeleton } from "./components/article-skeleton"

export default function Page() {
  return (
    <div>
      <ArticleSkeleton />
      {/* Preset is safe for SSR — no measurement required */}
    </div>
  )
}`}
            />
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <AlertTitle>Presets are SSR-safe</AlertTitle>
              <AlertDescription>
                Presets and variants do not require DOM measurement, so they can
                be used directly in Server Components without the{" "}
                <code className="rounded bg-muted px-1">{'"use client"'}</code>{" "}
                directive.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="suspense" className="mt-4 space-y-4">
            <CodeBlock
              title="🔄 Suspense integration"
              code={`// app/page.tsx (Server Component)
import { Suspense } from "react"
import { Haddhi } from "@haddhi/react"

// Haddhi as Suspense fallback
export default function ArticlePage() {
  return (
    <Suspense fallback={<Haddhi suspense preset="article" />}>
      <SlowArticleContent />
    </Suspense>
  )
}

// Or with a custom wrapper
import { LoadingBoundary } from "@/components/loading-boundary"

export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingBoundary loading preset="product" />}>
      <DashboardContent />
    </Suspense>
  )
}`}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* SSR Checklist */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="SSR checklist" />
        <div className="grid gap-4">
          <StepCard
            index={1}
            title="Create a small client wrapper"
            description="Keep 'use client' close to Haddhi instead of pushing it through the whole route. This minimizes client bundle size."
            variant="detailed"
          >
            <div className="mt-2 text-xs text-muted-foreground">
              ✅ Bundle impact: Only ~5KB added to client bundle
            </div>
          </StepCard>

          <StepCard
            index={2}
            title="Preserve child shape"
            description="Avoid swapping unrelated markup before hydration when the loading state changes — this prevents layout shifts and hydration mismatches."
            variant="detailed"
          />

          <StepCard
            index={3}
            title="Use Suspense for async sections"
            description="For route segments and async data fetching, let React Suspense handle when the fallback appears for better loading UX."
            variant="detailed"
          />
        </div>
      </section>

      {/* Framework-specific notes */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Next.js (App Router)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md bg-muted/30 p-3 text-sm">
              <span className="font-mono text-xs">✅</span> Presets work in
              Server Components
              <br />
              <span className="font-mono text-xs">⚠️</span> Auto mode needs
              client component
              <br />
              <span className="font-mono text-xs">✅</span> Use Suspense for
              streaming skeletons
            </div>
            <Link
              href="/examples"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View example in Next.js <ExternalLink className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-primary" />
              <CardTitle>Other frameworks</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md bg-muted/30 p-3 text-sm">
              <span className="font-mono text-xs">✅</span> Remix: Use
              client-only patterns
              <br />
              <span className="font-mono text-xs">✅</span> Gatsby: Works with
              client-side rendering
              <br />
              <span className="font-mono text-xs">⚠️</span> Astro: Client
              component island
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Common pitfalls */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Common pitfalls"
          description="Avoid these mistakes when using Haddhi with SSR"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Hydration mismatch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Using auto mode in a Server Component will cause hydration
                errors because the server does not know the DOM structure.
                Always wrap auto mode in{" "}
                <code className="rounded bg-muted px-1">{'"use client"'}</code>.
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-amber-500" />
                Bundle size bloat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Importing Haddhi in many Server Components without a shared
                wrapper can duplicate code. Create a single client wrapper and
                reuse it.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Suspense example */}
      <CodeBlock
        title="Suspense fallback with preset"
        code={`import { Suspense } from "react"
          import { Haddhi } from "@haddhi/react"

          // Server Component with streaming
          export default async function BlogPage() {
            return (
              <Suspense fallback={<Haddhi suspense preset="article" />}>
                <BlogPost />
              </Suspense>
            )
          }

          // The preset renders instantly on the server,
          // then streams the real content when ready`}
      />

      {/* Advanced: Partial hydration */}
      <Alert
        variant="default"
        className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
      >
        <Layout className="h-4 w-4 text-blue-500" />
        <AlertTitle>Advanced: Partial hydration</AlertTitle>
        <AlertDescription>
          For maximum performance, consider splitting your page into multiple
          Suspense boundaries. Each can have its own Haddhi skeleton, allowing
          content to stream progressively.
        </AlertDescription>
      </Alert>

      <CodeBlock
        title="Progressive loading example"
        code={`// app/dashboard/page.tsx
          import { Suspense } from "react"
          import { Haddhi } from "@haddhi/react"

          export default function Dashboard() {
            return (
              <div>
                {/* Header streams first */}
                <Suspense fallback={<Haddhi suspense preset="profile" />}>
                  <DashboardHeader />
                </Suspense>
                
                {/* Main content streams second */}
                <Suspense fallback={<Haddhi suspense preset="product" />}>
                  <DashboardContent />
                </Suspense>
                
                {/* Sidebar streams last */}
                <Suspense fallback={<Haddhi suspense variant="card" />}>
                  <DashboardSidebar />
                </Suspense>
              </div>
            )
          }`}
      />
    </PageShell>
  )
}
