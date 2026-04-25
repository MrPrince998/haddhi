import {
  BrowserFrame,
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
} from "@/components/docs-kit"
import { HaddhiProductPreview } from "@/components/haddhi-showcase"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  Smartphone,
  Tablet,
  Monitor,
  RefreshCw,
  Layout,
  Grid3x3,
  Eye,
  HelpCircle,
  Zap,
} from "lucide-react"

const widths = [
  {
    label: "Mobile",
    width: "w-full max-w-[280px]",
    copy: "Stacked media and text",
    icon: Smartphone,
    containerWidth: 280,
  },
  {
    label: "Tablet",
    width: "w-full max-w-[480px]",
    copy: "Compact two-column shape",
    icon: Tablet,
    containerWidth: 480,
  },
  {
    label: "Desktop",
    width: "w-full max-w-[720px]",
    copy: "Room for richer content",
    icon: Monitor,
    containerWidth: 720,
  },
]

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Responsive design"
        title="Skeletons should follow the container, not the viewport alone."
        description="Auto mode re-measures when layout changes. Presets keep repeated layouts predictable when every breakpoint is already known."
      />

      {/* Responsive behavior alert */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <RefreshCw className="h-4 w-4 text-blue-500" />
        <AlertTitle>Auto mode adapts to you</AlertTitle>
        <AlertDescription>
          Haddhi uses ResizeObserver to detect container size changes and
          automatically re-measures your component. No manual breakpoint
          configuration needed.
        </AlertDescription>
      </Alert>

      {/* Live responsive demo */}
      <section className="flex flex-col gap-6">
        <SectionHeading
          title="Same component, different widths"
          description="The loading state should preserve the shape users expect at each breakpoint."
        />
        <div className="flex flex-col gap-6">
          {widths.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label} className="overflow-hidden">
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <CardTitle>{item.label}</CardTitle>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <span>{item.containerWidth}px container</span>
                    </Badge>
                    <Badge variant="secondary" className="ml-auto">
                      {item.copy}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className={item.width}>
                    <BrowserFrame label={`${item.label} viewport`}>
                      <div className="p-3">
                        <HaddhiProductPreview loading />
                      </div>
                    </BrowserFrame>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Mode comparison */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-blue-500" />
              <CardTitle>Auto mode</CardTitle>
            </div>
            <CardDescription>
              Best when the component changes shape with real layout.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>Observes container size changes automatically</span>
              </li>
              <li className="flex gap-2">
                <Eye className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>Re-measures hidden content when layout shifts</span>
              </li>
              <li className="flex gap-2">
                <Grid3x3 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>Updates skeleton without manual breakpoint files</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Grid3x3 className="h-5 w-5 text-emerald-500" />
              <CardTitle>Preset mode</CardTitle>
            </div>
            <CardDescription>
              Best when repeated surfaces need predictable placeholder geometry.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>Zero measurement overhead — just renders shapes</span>
              </li>
              <li className="flex gap-2">
                <Grid3x3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>Perfect for list items, comments, product cards</span>
              </li>
              <li className="flex gap-2">
                <Layout className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>Consistent across all screen sizes by definition</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Responsive strategies table */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Responsive strategies"
          description="Choose the right approach based on your layout behavior"
        />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-30">Strategy</TableHead>
                  <TableHead>When to use</TableHead>
                  <TableHead>How Haddhi handles it</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    auto + cache
                  </TableCell>
                  <TableCell>
                    Layout changes significantly at breakpoints
                  </TableCell>
                  <TableCell>
                    Re-measures on resize + caches per container size
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    cacheKey
                  </TableCell>
                  <TableCell>
                    Different layouts based on props (e.g., isCompact)
                  </TableCell>
                  <TableCell>
                    Separate cached skeletons for each cacheKey value
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    preset
                  </TableCell>
                  <TableCell>Layout is the same at all breakpoints</TableCell>
                  <TableCell>No measurement — instant response</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono font-medium">
                    variant
                  </TableCell>
                  <TableCell>Simple shapes like text or avatar</TableCell>
                  <TableCell>Size-agnostic — works everywhere</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Code example with cacheKey */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Using cacheKey for responsive variants"
          description="When your component has different layouts at different breakpoints"
        />
        <CodeBlock
          title="Responsive cache keys"
          code={`import { Haddhi } from "@haddhi/react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ResponsiveCard({ data, isLoading }) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")
  
  const cacheKey = isMobile ? "card-mobile" : isTablet ? "card-tablet" : "card-desktop"

  return (
    <Haddhi 
      loading={isLoading}
      cacheKey={cacheKey}
    >
      <CardContentComponent 
        data={data} 
        variant={isMobile ? "stacked" : "horizontal"} 
      />
    </Haddhi>
  )
}`}
        />
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertTitle>Why cacheKey matters for responsive UIs</AlertTitle>
          <AlertDescription>
            Without a unique cacheKey, Haddhi might reuse a mobile skeleton
            layout after resizing to desktop, causing mismatched shapes. Always
            provide cacheKey when the component structure changes meaningfully.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Best practices */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Best practices"
          description="Tips for responsive skeleton loading"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                ✅ Do: Test at all breakpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your skeleton should visually match the real UI at every screen
                size. Use browser devtools to verify.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                ✅ Do: Use presets for repeating items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For product grids or comment lists, presets are faster and more
                predictable than measuring each item individually.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                ⚠️ Consider: Measurement cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Auto mode on many items simultaneously can impact performance.
                Consider presets for large lists.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                🚫 Avoid: Wrapping layout containers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Do not wrap responsive grid containers themselves. Wrap the
                individual items inside for better measurement accuracy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional code example */}
      <CodeBlock
        title="Conditional preset based on viewport"
        code={`import { Haddhi } from "@haddhi/react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function AdaptiveSkeleton({ isLoading, children }) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  
  // Use different preset for mobile vs desktop
  const preset = isMobile ? "list-item" : "product"
  
  return (
    <Haddhi 
      loading={isLoading}
      preset={preset}
      animation="shimmer"
    >
      {children}
    </Haddhi>
  )
}`}
      />
    </PageShell>
  )
}
