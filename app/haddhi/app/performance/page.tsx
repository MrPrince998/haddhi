import {
  CodeBlock,
  MetricCard,
  PageHeader,
  PageShell,
  SectionHeading,
} from "@/components/docs-kit"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Gauge,
  Timer,
  Database,
  Layers,
  TrendingDown,
  Shield,
} from "lucide-react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/performance")

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Performance"
        title="Use fidelity where it pays for itself."
        description="Measured skeletons are most valuable on visible, high-trust surfaces. Repeated rows and simple details should use presets or variants."
      />

      {/* Rule of thumb alert */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
        <Zap className="h-4 w-4 text-amber-500" />
        <AlertTitle>Rule of thumb</AlertTitle>
        <AlertDescription>
          Use{" "}
          <Badge variant="outline" className="font-mono">
            auto
          </Badge>{" "}
          mode for unique surfaces,
          <Badge variant="outline" className="mx-1 font-mono">
            preset
          </Badge>{" "}
          for repeated lists, and
          <Badge variant="outline" className="ml-1 font-mono">
            delay
          </Badge>{" "}
          for loading states that may finish quickly.
        </AlertDescription>
      </Alert>

      {/* Key metrics */}
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="cache"
          value="on"
          detail="Avoid repeated measurement for stable layouts."
          icon={<Database className="h-4 w-4" />}
        />
        <MetricCard
          label="delay"
          value="0–300ms"
          detail="Prevent skeleton flash for fast transitions."
          icon={<Timer className="h-4 w-4" />}
        />
        <MetricCard
          label="maxDepth"
          value="8"
          detail="Limit traversal inside complex component trees."
          icon={<Layers className="h-4 w-4" />}
        />
      </section>

      {/* Performance comparison chart */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Performance characteristics"
          description="Different modes have different runtime costs"
        />
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-emerald-500">
                  ~0ms
                </div>
                <div className="text-sm font-medium">Preset / Variant</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  No measurement. Just renders.
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-blue-500">
                  ~16-32ms
                </div>
                <div className="text-sm font-medium">Auto (cached)</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  First measure + cache hit on subsequent renders
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-2xl font-bold text-amber-500">
                  ~50-100ms
                </div>
                <div className="text-sm font-medium">Auto (first paint)</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Initial measurement of complex trees
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Runtime knobs table */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Performance knobs" />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Prop</TableHead>
                  <TableHead>Use it when</TableHead>
                  <TableHead className="w-[100px]">Default</TableHead>
                  <TableHead className="w-[100px]">Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono font-medium">cache</TableCell>
                  <TableCell>
                    The component layout is stable between renders
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">true</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500"
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    cacheKey
                  </TableCell>
                  <TableCell>
                    One component can render multiple distinct shapes
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">generated</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500"
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">delay</TableCell>
                  <TableCell>
                    Fast requests should avoid a loading flash
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">0</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/10 text-green-500"
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    maxDepth
                  </TableCell>
                  <TableCell>
                    The child tree is large and deeply nested
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">8</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-500"
                    >
                      Medium
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Strategy cards */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-emerald-500" />
              <CardTitle>Prefer presets for lists</CardTitle>
            </div>
            <CardDescription>
              Repeated rows do not need repeated measurement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Feed rows, comments, search results, and menu items usually share
              a small number of shapes. Presets keep them cheap and consistent.
            </p>
            <div className="mt-3 rounded-md bg-muted/30 p-2 font-mono text-xs">
              Performance win: 0 measurement cost vs ~16ms per item
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-blue-500" />
              <CardTitle>Measure hero surfaces</CardTitle>
            </div>
            <CardDescription>
              High-value panels benefit from exact geometry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Dashboards, product panels, and profile summaries are good
              candidates because the skeleton anchors user attention.
            </p>
            <div className="mt-3 rounded-md bg-muted/30 p-2 font-mono text-xs">
              ROI: One-time measurement cost, reused across all loading states
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Delay explanation */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Why delay matters"
          description="Prevent skeleton flashing for fast network responses"
        />
        <Tabs defaultValue="without" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="without">Without delay</TabsTrigger>
            <TabsTrigger value="with">With delay (120ms)</TabsTrigger>
          </TabsList>
          <TabsContent value="without" className="mt-4">
            <CodeBlock
              title="Flashing occurs"
              code={`<Haddhi loading={isLoading}>
  <ExpensiveComponent />
</Haddhi>

// If data loads in 50ms, users see a flash of skeleton → real content
// This creates visual noise and perceived slowness`}
            />
          </TabsContent>
          <TabsContent value="with" className="mt-4">
            <CodeBlock
              title="Smooth transition"
              code={`<Haddhi loading={isLoading} delay={120}>
  <ExpensiveComponent />
</Haddhi>

// Skeleton only appears after 120ms of loading
// Fast loads (<120ms) show real content instantly with no flash`}
            />
          </TabsContent>
        </Tabs>

        <Alert>
          <Timer className="h-4 w-4" />
          <AlertTitle>Recommended delay values</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                • <strong>0-50ms</strong>: Very fast optimistic UI (no skeleton)
              </li>
              <li>
                • <strong>100-200ms</strong>: Typical API calls (prevents most
                flashes)
              </li>
              <li>
                • <strong>300ms+</strong>: Slow operations / large payloads
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      {/* Cache strategy */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Cache strategy"
          description="How Haddhi optimizes repeated measurements"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Default behavior
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Haddhi caches every measured layout using a hash of the
                component structure. Subsequent loading states render instantly
                from cache.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                When to disable cache
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Set <code className="rounded bg-muted px-1">cache=false</code>{" "}
                only if the component layout changes dramatically on every
                render — extremely rare.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Code example */}
      <CodeBlock
        title="Scoped measurement with all optimizations"
        code={`import { Haddhi } from "@haddhi/react"

export function OptimizedDashboard({ data, isLoading }) {
  return (
    <Haddhi 
      loading={isLoading}
      delay={120}        // Prevent flash for fast loads
      maxDepth={6}       // Limit traversal depth
      cacheKey="dashboard-v1" // Stable cache across sessions
    >
      <DashboardSummary data={data} />
    </Haddhi>
  )
}

// For list items — use preset mode
export function ProductGrid({ products, isLoading }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {isLoading ? (
        // Render 6 skeletons using preset (zero measurement)
        Array.from({ length: 6 }).map((_, i) => (
          <Haddhi key={i} loading preset="product" />
        ))
      ) : (
        products.map(product => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  )
}`}
      />

      {/* Performance checklist */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Performance checklist" />
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-center text-xs leading-5 text-emerald-500">
                  ✓
                </div>
                <div>
                  <span className="font-medium">Use presets for lists</span>
                  <p className="text-sm text-muted-foreground">
                    Feed items, comments, search results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-center text-xs leading-5 text-emerald-500">
                  ✓
                </div>
                <div>
                  <span className="font-medium">Add delay (100-200ms)</span>
                  <p className="text-sm text-muted-foreground">
                    Prevents skeleton flash on fast networks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-center text-xs leading-5 text-emerald-500">
                  ✓
                </div>
                <div>
                  <span className="font-medium">Use cacheKey for variants</span>
                  <p className="text-sm text-muted-foreground">
                    Different layouts need different caches
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-center text-xs leading-5 text-emerald-500">
                  ✓
                </div>
                <div>
                  <span className="font-medium">
                    Limit maxDepth on deep trees
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Prevents performance issues on huge components
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-amber-500/20 text-center text-xs leading-5 text-amber-500">
                  ⚠
                </div>
                <div>
                  <span className="font-medium">
                    Measure hero surfaces, not every item
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Auto mode on 100+ items will impact performance
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  )
}
