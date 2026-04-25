import {
  BrowserFrame,
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
  StepCard,
} from "@/components/docs-kit"
import { HaddhiProductPreview } from "@/components/haddhi-showcase"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  Ruler,
  Paintbrush,
  Zap,
  Cpu,
  Shield,
  Layers,
  RefreshCw,
} from "lucide-react"

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="How it works"
        title="Haddhi turns rendered UI into a loading blueprint."
        description="Auto mode measures the child tree in the browser, converts visible boxes into skeleton bones, and reuses the result while your data is loading."
      />

      {/* Live Preview Comparison */}
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <BrowserFrame label="Step 1: Your Real UI Component">
          <div className="p-4">
            <HaddhiProductPreview />
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              <span>Haddhi measures this in a hidden layer</span>
            </div>
          </div>
        </BrowserFrame>
        <BrowserFrame label="Step 2: Haddhi Skeleton Output">
          <div className="p-4">
            <HaddhiProductPreview loading />
            <div className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Paintbrush className="h-3 w-3" />
              <span>Matching skeleton with your chosen animation</span>
            </div>
          </div>
        </BrowserFrame>
      </section>

      {/* Under the Hood Steps */}
      <section className="flex flex-col gap-6">
        <SectionHeading
          title="Under the hood"
          description="The runtime path is intentionally small: render, inspect, cache, paint."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            index={1}
            title="Render"
            description="The child component remains the source of truth. Haddhi mounts it in a hidden measuring layer while loading is active — no visual flicker."
            icon={<Eye className="h-5 w-5" />}
          />
          <StepCard
            index={2}
            title="Measure"
            description="Visible text, images, buttons, and layout boxes are read with modern browser layout APIs. Haddhi captures dimensions, positions, and spacing."
            icon={<Ruler className="h-5 w-5" />}
          />
          <StepCard
            index={3}
            title="Paint"
            description="The measured boxes become rounded skeleton bones with your selected animation style — shimmer, pulse, wave, or static."
            icon={<Paintbrush className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Detailed Flow Diagram as Cards */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Detailed runtime flow"
          description="What happens inside Haddhi when loading state changes"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle>1. Mount phase</CardTitle>
              <CardDescription>
                Haddhi checks if loading is true and determines which mode to
                use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    A
                  </Badge>
                  <span>
                    Auto mode → mounts children in hidden measuring container
                  </span>
                </li>
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    B
                  </Badge>
                  <span>Preset mode → loads pre-defined skeleton layout</span>
                </li>
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    C
                  </Badge>
                  <span>
                    Variant mode → renders simple text/avatar/card shapes
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Cpu className="h-5 w-5" />
              </div>
              <CardTitle>2. Measurement &amp; cache</CardTitle>
              <CardDescription>
                Auto mode extracts layout and stores it for future use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    1
                  </Badge>
                  <span>Traverse DOM tree up to maxDepth</span>
                </li>
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    2
                  </Badge>
                  <span>Extract bounding boxes for visible elements</span>
                </li>
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    3
                  </Badge>
                  <span>Cache result with cacheKey (or auto key)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <CardTitle>3. Animation &amp; render</CardTitle>
              <CardDescription>
                Skeleton bones come to life with motion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    S
                  </Badge>
                  <span>Shimmer — moving gradient across bones</span>
                </li>
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    P
                  </Badge>
                  <span>Pulse — opacity breathing effect</span>
                </li>
                <li className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="h-5 w-5 rounded-full p-0 text-xs"
                  >
                    W
                  </Badge>
                  <span>Wave — continuous wave pattern</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle>4. Responsive re-measure</CardTitle>
              <CardDescription>
                Adapts to layout changes automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <span>ResizeObserver detects container size changes</span>
                </li>
                <li className="flex gap-2">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <span>Font load events trigger re-measure</span>
                </li>
                <li className="flex gap-2">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <span>Debounced updates prevent performance issues</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modes Comparison Table */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Modes explained"
          description="Choose the right approach for your use case"
        />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Mode</TableHead>
                  <TableHead>Best for</TableHead>
                  <TableHead>How it works</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono font-medium">auto</TableCell>
                  <TableCell>Complex, unique layouts</TableCell>
                  <TableCell>Measures real DOM structure</TableCell>
                  <TableCell>Cached, but initial measure cost</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    preset
                  </TableCell>
                  <TableCell>
                    Common patterns (profile, article, etc.)
                  </TableCell>
                  <TableCell>Uses pre-defined skeleton</TableCell>
                  <TableCell>Zero measurement overhead</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    variant
                  </TableCell>
                  <TableCell>Simple elements (text, avatar, card)</TableCell>
                  <TableCell>Renders basic shapes</TableCell>
                  <TableCell>Fastest — no measurement</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Code Examples with Tabs */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Implementation examples"
          description="Different modes for different scenarios"
        />
        <Tabs defaultValue="auto" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auto">Auto mode</TabsTrigger>
            <TabsTrigger value="preset">Preset mode</TabsTrigger>
            <TabsTrigger value="variant">Variant mode</TabsTrigger>
          </TabsList>
          <TabsContent value="auto" className="mt-4">
            <CodeBlock
              title="Auto layout — measures your component"
              code={`import { Haddhi } from "@haddhi/react"

// Perfect for unique, complex UIs that you don't want to manually skeletonize
export function DashboardWidget({ data, isLoading }) {
  return (
    <Haddhi 
      loading={isLoading}
      cacheKey="dashboard-widget"
      maxDepth={10}
    >
      <ComplexChartWidget data={data} />
    </Haddhi>
  )
}`}
            />
            <Alert className="mt-3">
              <Eye className="h-4 w-4" />
              <AlertTitle>Auto mode tip</AlertTitle>
              <AlertDescription>
                Use <code className="rounded bg-muted px-1">cacheKey</code> when
                the same component appears in different contexts to avoid
                re-measuring.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="preset" className="mt-4">
            <CodeBlock
              title="Preset — use built-in layouts"
              code={`import { Haddhi } from "@haddhi/react"

// Great for common patterns that repeat across your app
export function UserProfile({ user, isLoading }) {
  return (
    <Haddhi 
      loading={isLoading}
      preset="profile"
      animation="pulse"
      radius={12}
    >
      <ProfileCard user={user} />
    </Haddhi>
  )
}

// Available presets: profile, article, product, comment, list-item, blog-card`}
            />
          </TabsContent>
          <TabsContent value="variant" className="mt-4">
            <CodeBlock
              title="Variant — simple shapes"
              code={`import { Haddhi } from "@haddhi/react"

// Lightweight option for basic loading states
export function SimpleSkeleton({ isLoading, children }) {
  return (
    <Haddhi 
      loading={isLoading}
      variant="text"
      lines={3}
    >
      {children}
    </Haddhi>
  )
}

// Other variants: avatar, card, text, button`}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Performance Considerations */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Performance first"
          description="Haddhi is built to be lightweight and efficient"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Smart caching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Measured layouts are cached by default. The same component
                structure won't be measured twice, saving CPU cycles on repeated
                loading states.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configurable depth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use <code className="rounded bg-muted px-1">maxDepth</code> to
                limit how deep Haddhi traverses your component tree. Perfect for
                large, nested UIs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Debounced updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Window resize and font load events are debounced to prevent
                excessive re-measurement during rapid layout changes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Zero runtime in production</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When{" "}
                <code className="rounded bg-muted px-1">loading=false</code>,
                Haddhi renders children directly with almost no overhead — the
                skeleton logic is completely bypassed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Basic Usage */}
      <CodeBlock
        title="Basic usage"
        code={`<Haddhi loading={isLoading} cacheKey="project-card">
  <ProjectCard project={project} />
</Haddhi>`}
      />

      <Separator className="my-6" />

      {/* Call to action */}
      <Alert className="border-primary/20 bg-primary/5">
        <Zap className="h-4 w-4 text-primary" />
        <AlertTitle>Ready to use Haddhi?</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <span>
            Install the package and start adding beautiful loading states today.
          </span>
          <Badge variant="outline" className="border-primary text-primary">
            npm install @haddhi/react
          </Badge>
        </AlertDescription>
      </Alert>
    </PageShell>
  )
}
