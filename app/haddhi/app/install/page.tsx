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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  Package,
  Terminal,
  Zap,
  Shield,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/install")

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Installation"
        title="Add Haddhi to a React app in a few minutes."
        description="Install the runtime package, wrap a component, then decide whether the runtime should measure, use a preset, or render a simple variant."
      />

      {/* Package Manager Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Choose your package manager
          </CardTitle>
          <CardDescription>
            Install the core package in any React project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            <TabsContent value="npm" className="mt-4">
              <CodeBlock code="npm install @haddhi/react" language="bash" />
            </TabsContent>
            <TabsContent value="yarn" className="mt-4">
              <CodeBlock code="yarn add @haddhi/react" language="bash" />
            </TabsContent>
            <TabsContent value="pnpm" className="mt-4">
              <CodeBlock code="pnpm add @haddhi/react" language="bash" />
            </TabsContent>
            <TabsContent value="bun" className="mt-4">
              <CodeBlock code="bun add @haddhi/react" language="bash" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Installation Steps */}
      <section className="grid gap-4">
        <StepCard
          index={1}
          title="Install the runtime"
          description="Install the core package using your preferred package manager. The package includes the Haddhi component, all presets, and TypeScript types."
          variant="detailed"
        >
          <div className="space-y-3">
            <CodeBlock code="pnpm add @haddhi/react" language="bash" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Zero dependencies aside from React & React DOM</span>
            </div>
          </div>
        </StepCard>

        <StepCard
          index={2}
          title="Wrap your component"
          description="Import Haddhi and wrap any React component. The wrapper controls only the loading state; normal content still renders as children when not loading."
          variant="detailed"
        >
          <CodeBlock
            code={`import { Haddhi } from "@haddhi/react"

export function ProjectCardView({ isLoading, project }) {
  return (
    <Haddhi loading={isLoading}>
      <ProjectCard project={project} />
    </Haddhi>
  )
}`}
          />
        </StepCard>

        <StepCard
          index={3}
          title="Choose your mode"
          description="Select the skeleton mode that fits your needs — auto measurement, preset layouts, or simple variants."
          variant="detailed"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">auto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Measures your real component and generates matching bones
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">preset</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Uses built-in layouts like profile, article, or product
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">variant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Renders simple shapes: text, avatar, or card
                </p>
              </CardContent>
            </Card>
          </div>
        </StepCard>
      </section>

      {/* CLI Installation (Optional) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-muted-foreground" />
          <SectionHeading title="CLI (optional)" />
          <Badge variant="secondary" className="ml-2">
            Advanced
          </Badge>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Generate skeleton components from live pages</CardTitle>
            <CardDescription>
              The CLI is separate so Playwright does not ship with normal React
              installs. Perfect for generating static skeleton components from
              existing UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock code="pnpm add -D @haddhi/cli" language="bash" />
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Usage example</AlertTitle>
              <AlertDescription>
                <CodeBlock
                  code="pnpm dlx @haddhi/cli build --url http://localhost:5173 --component ProjectCard --output ./components/skeletons"
                  language="bash"
                  className="mt-2"
                />
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>

      {/* Next.js Specific Setup */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-muted-foreground" />
          <SectionHeading title="Next.js setup" />
        </div>
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <AlertTitle className="flex items-center gap-2">
            Client Component Required
          </AlertTitle>
          <AlertDescription>
            In Next.js App Router, you need to add the{" "}
            <Badge variant="outline" className="font-mono">
              {'"use client"'}
            </Badge>{" "}
            directive to files that import and use Haddhi directly.
          </AlertDescription>
        </Alert>

        <CodeBlock
          title="✅ Correct: Client component wrapper"
          code={`"use client"

import { Haddhi } from "@haddhi/react"

export function ClientSkeleton({ loading, children }) {
  return <Haddhi loading={loading}>{children}</Haddhi>
}`}
        />

        <Alert
          variant="default"
          className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <AlertTitle>Tip for Server Components</AlertTitle>
          <AlertDescription>
            You can still use presets and variants that do not require
            measurement in Server Components. Only{" "}
            <code className="rounded bg-muted px-1">auto</code> mode needs
            client-side measurement.
          </AlertDescription>
        </Alert>
      </section>

      {/* Peer Dependencies */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Peer dependencies" />
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="py-1 text-sm">
                react ≥ 18.0.0
              </Badge>
              <Badge variant="outline" className="py-1 text-sm">
                react-dom ≥ 18.0.0
              </Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Make sure React and React DOM are already installed in your
              project. Haddhi works with React 18+ and React 19.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Verification */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Verify installation" />
        <CodeBlock
          language="txt"
          code={`your-app/
  ├── node_modules/
  │   └── @haddhi/
  │       └── react/          # ✅ Runtime package
  ├── app/
  │   └── page.tsx
  ├── components/
  │   └── ProjectCard.tsx
  └── package.json            # "@haddhi/react": "^0.1.0"`}
        />

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>TypeScript support included</AlertTitle>
          <AlertDescription>
            No additional type packages needed. Haddhi ships with full
            TypeScript definitions.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Next Steps */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Next steps" />
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <Link href="/how-it-works" className="block p-4">
              <CardTitle className="flex items-center justify-between text-base">
                Learn how it works
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </CardTitle>
              <CardDescription className="mt-1">
                Understand the auto-measurement and caching system
              </CardDescription>
            </Link>
          </Card>
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <Link href="/examples" className="block p-4">
              <CardTitle className="flex items-center justify-between text-base">
                See examples
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </CardTitle>
              <CardDescription className="mt-1">
                Explore real-world usage patterns
              </CardDescription>
            </Link>
          </Card>
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <Link href="/frameworks/react" className="block p-4">
              <CardTitle className="flex items-center justify-between text-base">
                React guide
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </CardTitle>
              <CardDescription className="mt-1">
                Deep dive into React integration
              </CardDescription>
            </Link>
          </Card>
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <Link href="/demo" className="block p-4">
              <CardTitle className="flex items-center justify-between text-base">
                Live demo
                <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </CardTitle>
              <CardDescription className="mt-1">
                See Haddhi in action
              </CardDescription>
            </Link>
          </Card>
        </div>
      </section>
    </PageShell>
  )
}
