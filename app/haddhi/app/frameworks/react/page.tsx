import {
  BrowserFrame,
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
} from "@/components/docs-kit"
import { HaddhiProductPreview } from "@/components/haddhi-showcase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Zap,
  Shield,
  Layers,
  Code2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="React"
        title="A small wrapper for component-level loading."
        description="Use Haddhi where loading state already exists: cards, routes, table rows, profile summaries, feeds, and panels."
      />

      {/* Quick start alert */}
      <Alert className="border-primary/20 bg-primary/5">
        <Zap className="h-4 w-4 text-primary" />
        <AlertTitle>Quick start</AlertTitle>
        <AlertDescription>
          Wrap any component with{" "}
          <Badge variant="outline" className="font-mono">
            &lt;Haddhi&gt;
          </Badge>{" "}
          and pass a{" "}
          <Badge variant="outline" className="font-mono">
            loading
          </Badge>{" "}
          prop. That's it.
        </AlertDescription>
      </Alert>

      {/* Mode Tabs */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Three modes, one component"
          description="Choose the approach that fits your use case"
        />
        <Tabs defaultValue="auto" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auto">Auto mode</TabsTrigger>
            <TabsTrigger value="preset">Preset mode</TabsTrigger>
            <TabsTrigger value="variant">Variant mode</TabsTrigger>
          </TabsList>

          <TabsContent value="auto" className="mt-4 space-y-4">
            <CodeBlock
              title="Auto — measure your real UI"
              code={`import { Haddhi } from "@haddhi/react"

// Haddhi measures the actual InvoicePanel structure
// and generates matching skeleton bones automatically
export function InvoiceView({ invoice, isLoading }) {
  return (
    <Haddhi loading={isLoading}>
      <InvoicePanel invoice={invoice} />
    </Haddhi>
  )
}`}
            />
            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Perfect for
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Complex, unique layouts that would be tedious to manually
                    skeletonize — dashboards, detail panels, forms.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Performance note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Layout is cached by default. Add{" "}
                    <code className="rounded bg-muted px-1">cacheKey</code> to
                    separate different contexts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preset" className="mt-4 space-y-4">
            <CodeBlock
              title="Preset — use built-in layouts"
              code={`import { Haddhi } from "@haddhi/react"

// Choose from 6+ built-in skeleton layouts
export function ProfileCard({ user, isLoading }) {
  return (
    <Haddhi 
      loading={isLoading}
      preset="profile"
      animation="wave"
      radius={12}
    >
      <UserProfile user={user} />
    </Haddhi>
  )
}

// Available presets:
// profile, article, product, comment, list-item, blog-card`}
            />
            <div className="grid gap-3 md:grid-cols-3">
              <Card className="border-l-4 border-l-emerald-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Avatar + name + bio + stats
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">article</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Title + metadata + content blocks
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">product</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Image + title + price + rating
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="variant" className="mt-4 space-y-4">
            <CodeBlock
              title="Variant — simple shapes"
              code={`import { Haddhi } from "@haddhi/react"

// Lightweight skeleton for simple elements
export function AvatarSkeleton({ isLoading, children }) {
  return (
    <Haddhi 
      loading={isLoading}
      variant="avatar"
    >
      {children}
    </Haddhi>
  )
}

// Other variants: text, card, avatar, button`}
            />
            <div className="grid gap-3 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm">text</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    1-5 lines of placeholder text
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm">avatar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Circular placeholder for profile pictures
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-sm">card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Rectangular block with rounded corners
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Live Preview */}
      <section className="grid gap-4 lg:grid-cols-[0.9fr_1fr]">
        <BrowserFrame label="Your React Component">
          <HaddhiProductPreview />
        </BrowserFrame>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              React patterns
            </CardTitle>
            <CardDescription>
              Keep the loading wrapper local and boring.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="flex flex-col gap-3 text-sm leading-6">
              <li className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  Wrap <strong>one meaningful surface</strong>, not the whole
                  page.
                </span>
              </li>
              <li className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  Use <code className="rounded bg-muted px-1">suspense</code>{" "}
                  mode for route or section fallbacks.
                </span>
              </li>
              <li className="flex gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span>
                  Use{" "}
                  <code className="rounded bg-muted px-1">errorFallback</code>{" "}
                  around risky child trees.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Suspense Section */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Suspense integration"
          description="For route or section boundaries that already use Suspense, let Haddhi act as the fallback shape."
        />
        <CodeBlock
          title="Suspense mode"
          code={`import { Haddhi } from "@haddhi/react"
import { Suspense } from "react"

// Haddhi as a Suspense fallback
export function ArticlePage() {
  return (
    <Suspense fallback={<Haddhi suspense preset="article" />}>
      <ArticleContent />
    </Suspense>
  )
}

// Or use the suspense prop directly
export function ArticleWithFallback() {
  return (
    <Haddhi suspense preset="article">
      <Article />
    </Haddhi>
  )
}`}
        />
      </section>

      {/* Props API Table */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="API reference"
          description="All props available on the Haddhi component"
        />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-35">Prop</TableHead>
                  <TableHead className="w-25">Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">loading</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>
                    When true, renders skeleton. When false, renders children.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">preset</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    Use a built-in layout: profile, article, product, comment,
                    list-item, blog-card
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">variant</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    Simple shape: auto, text, avatar, card, button
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">animation</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    Animation style: shimmer, pulse, wave, static
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">radius</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>Border radius for skeleton bones (px)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">delay</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    Delay before showing skeleton (ms). Prevents flashing.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">cacheKey</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>Custom cache key for measured layouts</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">maxDepth</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    Maximum DOM traversal depth in auto mode
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">suspense</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>Use as Suspense fallback</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-sm">
                    errorFallback
                  </TableCell>
                  <TableCell>ReactNode</TableCell>
                  <TableCell>Custom error UI when children throw</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Tips & Best Practices */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Best practices"
          description="Tips for using Haddhi effectively in React"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
            <AlertTitle>Do: Keep it local</AlertTitle>
            <AlertDescription>
              Wrap individual components, not entire pages. This keeps loading
              states granular and prevents layout shifts.
            </AlertDescription>
          </Alert>
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Don't: Over-nest</AlertTitle>
            <AlertDescription>
              Avoid wrapping components that are already inside another Haddhi.
              One wrapper per loading boundary is enough.
            </AlertDescription>
          </Alert>
          <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20">
            <Zap className="h-4 w-4 text-emerald-500" />
            <AlertTitle>Do: Use presets for lists</AlertTitle>
            <AlertDescription>
              For repeated items like feed entries or product cards, presets are
              more performant than auto-measurement.
            </AlertDescription>
          </Alert>
          <Alert variant="default">
            <Code2 className="h-4 w-4" />
            <AlertTitle>Don't: Forget cacheKey</AlertTitle>
            <AlertDescription>
              When the same component appears in different contexts, add a
              cacheKey to prevent incorrect cached layouts.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Next Steps */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Next steps" />
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <a href="/examples" className="block p-4">
              <CardTitle className="text-base">View examples →</CardTitle>
              <CardDescription className="mt-1">
                See Haddhi in action with real-world patterns
              </CardDescription>
            </a>
          </Card>
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <a href="/demo" className="block p-4">
              <CardTitle className="text-base">Live demo →</CardTitle>
              <CardDescription className="mt-1">
                Interactive demo of all features
              </CardDescription>
            </a>
          </Card>
        </div>
      </section>
    </PageShell>
  )
}
