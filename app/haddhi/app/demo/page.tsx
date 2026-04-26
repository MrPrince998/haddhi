import {
  BrowserFrame,
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
} from "@/components/docs-kit"
import { HaddhiDashboardPreview } from "@/components/haddhi-showcase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  TrendingUp,
  ListChecks,
  User,
  Layers,
  Sparkles,
  Code,
  Zap,
} from "lucide-react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/demo")

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Complex example"
        title="Compose a real product screen with Haddhi."
        description="A dashboard usually has repeated metric cards, list rows, and one or two custom panels. The demo below uses the actual Haddhi component instead of hardcoded loading markup."
      />

      {/* Live Demo Comparison */}
      <section className="grid gap-4 lg:grid-cols-2">
        <BrowserFrame label="Loaded dashboard — real data">
          <HaddhiDashboardPreview />
        </BrowserFrame>
        <BrowserFrame label="Haddhi loading dashboard — same shape">
          <HaddhiDashboardPreview loading />
        </BrowserFrame>
      </section>

      {/* Strategy Map */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Strategy map"
          description="Use the Haddhi mode that fits each part of the screen."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <CardTitle>Metrics Cards</CardTitle>
              </div>
              <CardDescription>
                Use{" "}
                <Badge variant="outline" className="font-mono">
                  preset=&quot;product&quot;
                </Badge>{" "}
                for repeated metric cards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Revenue, users, orders — all share the same product card
                skeleton. Zero measurement overhead, perfect for 3-6 repeated
                items.
              </p>
              <div className="mt-3 rounded-md bg-muted/30 p-2 font-mono text-xs">
                Performance: ~0ms per card
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-blue-500" />
                <CardTitle>Activity Feed</CardTitle>
              </div>
              <CardDescription>
                Use{" "}
                <Badge variant="outline" className="font-mono">
                  preset=&quot;list-item&quot;
                </Badge>{" "}
                for repeated rows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Transaction history, notifications, comments — each row uses the
                same list-item preset for consistent loading states.
              </p>
              <div className="mt-3 rounded-md bg-muted/30 p-2 font-mono text-xs">
                8 rows × 0ms = instant render
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-500" />
                <CardTitle>Customer Panel</CardTitle>
              </div>
              <CardDescription>
                Use{" "}
                <Badge variant="outline" className="font-mono">
                  auto
                </Badge>{" "}
                mode for unique panels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Customer details, order summaries, and unique layouts benefit
                from exact measurement to match their specific shape.
              </p>
              <div className="mt-3 rounded-md bg-muted/30 p-2 font-mono text-xs">
                One-time measurement → cached
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Full Code Example */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Complete implementation"
          description="How the dashboard is built with Haddhi"
        />
        <CodeBlock
          title="Composed Haddhi loading state — Dashboard.tsx"
          code={`import { Haddhi } from "@haddhi/react"
import { MetricGrid } from "./metric-grid"
import { ActivityFeed } from "./activity-feed"
import { CustomerPanel } from "./customer-panel"

export function Dashboard({ data, isLoading }) {
  return (
    <div className="space-y-6">
      {/* Section 1: Metric Cards — All use product preset */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Haddhi loading={isLoading} preset="product">
            <RevenueCard revenue={data.revenue} />
          </Haddhi>
          <Haddhi loading={isLoading} preset="product">
            <UsersCard users={data.users} />
          </Haddhi>
          <Haddhi loading={isLoading} preset="product">
            <OrdersCard orders={data.orders} />
          </Haddhi>
        </div>
      </section>

      {/* Section 2: Activity Feed — Uses list-item preset */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <div className="space-y-3">
          {isLoading ? (
            // Show 6 skeleton rows
            Array.from({ length: 6 }).map((_, i) => (
              <Haddhi key={i} loading preset="list-item" />
            ))
          ) : (
            data.activities.map(activity => (
              <ActivityRow key={activity.id} activity={activity} />
            ))
          )}
        </div>
      </section>

      {/* Section 3: Customer Panel — Auto mode for unique layout */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Customer Details</h2>
        <Haddhi loading={isLoading} cacheKey="customer-panel">
          <CustomerDetails customer={data.customer} />
        </Haddhi>
      </section>
    </div>
  )
}`}
        />
      </section>

      {/* Performance Analysis */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Performance breakdown"
          description="Why this composition is optimal"
        />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Measurement cost</TableHead>
                  <TableHead>Cache behavior</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">3 Metric Cards</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      preset=&quot;product&quot;
                    </Badge>
                  </TableCell>
                  <TableCell>~0ms each</TableCell>
                  <TableCell>N/A (no measurement)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">6 Activity Rows</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      preset=&quot;list-item&quot;
                    </Badge>
                  </TableCell>
                  <TableCell>~0ms each</TableCell>
                  <TableCell>N/A (no measurement)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Customer Panel</TableCell>
                  <TableCell>
                    <Badge variant="secondary">auto</Badge>
                  </TableCell>
                  <TableCell>~32ms (first render)</TableCell>
                  <TableCell>Cached for subsequent loads</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20">
          <Zap className="h-4 w-4 text-emerald-500" />
          <AlertTitle>Total cost: ~32ms for the whole dashboard</AlertTitle>
          <AlertDescription>
            After initial measurement, all subsequent loading states render
            instantly from cache. Compare this to manual skeleton components
            that would require ~200ms+ of development time per component and
            runtime bundle overhead.
          </AlertDescription>
        </Alert>
      </section>

      {/* Alternative approaches */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Alternative approaches"
          description="Different strategies for different scales"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Single Haddhi wrapper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                Wrap the entire dashboard — simpler but loses granular control.
              </p>
              <CodeBlock
                variant="compact"
                code={`<Haddhi loading={isLoading}>
  <Dashboard />
</Haddhi>`}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                ⚠️ Measures the entire dashboard as one unit. Less control over
                individual sections.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Granular per-section
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">
                As shown above — each section loads independently.
              </p>
              <CodeBlock
                variant="compact"
                code={`<>
  <MetricSkeleton />
  <ActivitySkeleton />
  <CustomerSkeleton />
</>`}
              />
              <p className="mt-3 text-xs text-muted-foreground">
                ✅ Best UX, independent loading states, optimal performance.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Live editing note */}
      <Alert>
        <Code className="h-4 w-4" />
        <AlertTitle>Try it yourself</AlertTitle>
        <AlertDescription>
          The demo above uses the real Haddhi component. You can inspect the DOM
          to see how it measures your UI and generates matching skeleton bones.
          Open DevTools to watch the measurement process.
        </AlertDescription>
      </Alert>

      {/* Additional resources */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Related resources" />
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <a href="/frameworks/react" className="block p-4">
              <CardTitle className="text-sm">React Guide →</CardTitle>
              <CardDescription className="mt-1 text-xs">
                Deep dive into React integration
              </CardDescription>
            </a>
          </Card>
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <a href="/performance" className="block p-4">
              <CardTitle className="text-sm">Performance →</CardTitle>
              <CardDescription className="mt-1 text-xs">
                Optimization strategies
              </CardDescription>
            </a>
          </Card>
          <Card className="group cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <a href="/examples" className="block p-4">
              <CardTitle className="text-sm">More Examples →</CardTitle>
              <CardDescription className="mt-1 text-xs">
                Common patterns and recipes
              </CardDescription>
            </a>
          </Card>
        </div>
      </section>
    </PageShell>
  )
}
