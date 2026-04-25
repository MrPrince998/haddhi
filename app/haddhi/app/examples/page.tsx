import {
  BrowserFrame,
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
} from "@/components/docs-kit"
import {
  HaddhiProductPreview,
  HaddhiRecipePreview,
} from "@/components/haddhi-showcase"
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
import { Separator } from "@/components/ui/separator"
import {
  User,
  FileText,
  MessageSquare,
  List,
  Layout,
  Sparkles,
  Code2,
  CheckCircle2,
  Zap,
} from "lucide-react"

const recipes = [
  {
    name: "Profile",
    preset: "profile" as const,
    detail: "Avatar, title, byline, and account metadata.",
    icon: User,
    bestFor: "User cards, author bios, account summaries",
  },
  {
    name: "Article",
    preset: "article" as const,
    detail: "Heading, author row, and long text rhythm.",
    icon: FileText,
    bestFor: "Blog posts, documentation pages, changelogs",
  },
  {
    name: "Comment",
    preset: "comment" as const,
    detail: "Avatar with stacked message lines.",
    icon: MessageSquare,
    bestFor: "Replies, reviews, discussion threads",
  },
  {
    name: "List item",
    preset: "list-item" as const,
    detail: "Rows in feeds, menus, and search results.",
    icon: List,
    bestFor: "Feeds, playlists, search results, menus",
  },
]

const variants = [
  {
    name: "Text",
    variant: "text" as const,
    detail: "1-5 lines of placeholder text",
    icon: FileText,
  },
  {
    name: "Avatar",
    variant: "avatar" as const,
    detail: "Circular placeholder for profile pictures",
    icon: User,
  },
  {
    name: "Card",
    variant: "card" as const,
    detail: "Rectangular block with rounded corners",
    icon: Layout,
  },
]

export default function Page() {
  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Examples"
        title="Haddhi examples organized by UI shape."
        description="These examples use Haddhi presets and auto mode directly. Pick the smallest mode that makes the loading state feel like the final component."
      />

      {/* Preset Gallery */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SectionHeading
            title="Preset gallery"
            description="Six built-in layouts for common UI patterns"
          />
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Zero measurement
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {recipes.map((recipe) => (
            <HaddhiRecipePreview key={recipe.name} {...recipe} />
          ))}
        </div>
      </section>

      {/* Variants Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SectionHeading
            title="Simple variants"
            description="Lightweight skeletons for basic elements"
          />
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            Fastest option
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {variants.map((variant) => {
            const Icon = variant.icon
            return (
              <Card key={variant.name} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base">{variant.name}</CardTitle>
                  </div>
                  <CardDescription className="text-xs">
                    {variant.detail}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted/30 p-3">
                    <div className="flex items-center gap-3">
                      {variant.variant === "avatar" && (
                        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                      )}
                      {variant.variant === "text" && (
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                        </div>
                      )}
                      {variant.variant === "card" && (
                        <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
                      )}
                    </div>
                  </div>
                  <CodeBlock
                    variant="compact"
                    code={`<Haddhi loading variant="${variant.variant}" />`}
                    className="mt-3"
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Auto Mode Example */}
      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <BrowserFrame label="Auto-measured product card">
          <div className="p-2">
            <HaddhiProductPreview loading />
          </div>
        </BrowserFrame>
        <div className="flex flex-col gap-3">
          <SectionHeading
            title="When to use auto mode"
            description="Use measured Haddhi loading for components whose shape is unusual enough that a preset would look wrong."
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Perfect for</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Custom dashboards with unique layouts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Complex forms with irregular field arrangements
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Any component that does not match existing presets
                </li>
              </ul>
            </CardContent>
          </Card>
          <CodeBlock
            title="Auto mode usage"
            code={`<Haddhi loading={loading}>
  <ProductCard product={product} />
</Haddhi>`}
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Choosing the right approach"
          description="Compare modes to pick the best fit for your use case"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle className="text-sm">Preset</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-xs text-muted-foreground">
                Best for: Common layouts used repeatedly
              </p>
              <ul className="space-y-1 text-xs">
                <li>✓ Zero measurement overhead</li>
                <li>✓ Consistent across all instances</li>
                <li>✓ SSR-compatible out of the box</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-sm">Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-xs text-muted-foreground">
                Best for: Simple, atomic elements
              </p>
              <ul className="space-y-1 text-xs">
                <li>✓ Fastest possible skeleton</li>
                <li>✓ Perfect for text/avatar/card</li>
                <li>✓ Zero configuration needed</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-sm">Auto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-xs text-muted-foreground">
                Best for: Unique, complex layouts
              </p>
              <ul className="space-y-1 text-xs">
                <li>✓ Exact match to your UI</li>
                <li>✓ Automatic responsive updates</li>
                <li>✓ Smart caching included</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Live Demo Tabs */}
      <section className="flex flex-col gap-4">
        <SectionHeading
          title="Interactive examples"
          description="See each mode in action"
        />
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="article">Article</TabsTrigger>
            <TabsTrigger value="comment">Comment</TabsTrigger>
            <TabsTrigger value="list">List Item</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <HaddhiRecipePreview
                  name="Profile"
                  preset="profile"
                  detail="Live preview — this skeleton matches the exact profile layout"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <HaddhiRecipePreview
                  name="Article"
                  preset="article"
                  detail="Live preview — article skeleton with title, metadata, and content"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comment" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <HaddhiRecipePreview
                  name="Comment"
                  preset="comment"
                  detail="Live preview — comment skeleton with avatar and message lines"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <HaddhiRecipePreview
                  name="List item"
                  preset="list-item"
                  detail="Live preview — list item skeleton for feeds and menus"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Quick Reference */}
      <Alert className="border-primary/20 bg-primary/5">
        <Code2 className="h-4 w-4 text-primary" />
        <AlertTitle>Quick reference</AlertTitle>
        <AlertDescription>
          <div className="mt-2 grid gap-2 text-sm">
            <div>
              <code className="rounded bg-muted px-1">
                {'preset="profile"'}
              </code>{" "}
              — User cards, account headers
            </div>
            <div>
              <code className="rounded bg-muted px-1">
                {'preset="article"'}
              </code>{" "}
              — Blog posts, documentation
            </div>
            <div>
              <code className="rounded bg-muted px-1">
                {'preset="product"'}
              </code>{" "}
              — E-commerce, metrics
            </div>
            <div>
              <code className="rounded bg-muted px-1">
                {'preset="comment"'}
              </code>{" "}
              — Reviews, replies
            </div>
            <div>
              <code className="rounded bg-muted px-1">
                {'preset="list-item"'}
              </code>{" "}
              — Feeds, search results
            </div>
            <div>
              <code className="rounded bg-muted px-1">
                {'preset="blog-card"'}
              </code>{" "}
              — Article previews
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Next Steps */}
      <div className="flex justify-between gap-3 pt-4">
        <Card className="group flex-1 cursor-pointer transition-all hover:border-primary hover:shadow-md">
          <a href="/demo" className="block p-4">
            <CardTitle className="text-sm">← Complex Example</CardTitle>
            <CardDescription className="mt-1 text-xs">
              See a full dashboard implementation
            </CardDescription>
          </a>
        </Card>
        <Card className="group flex-1 cursor-pointer transition-all hover:border-primary hover:shadow-md">
          <a href="/frameworks/react" className="block p-4 text-right">
            <CardTitle className="text-sm">React Guide →</CardTitle>
            <CardDescription className="mt-1 text-xs">
              Deep dive into React integration
            </CardDescription>
          </a>
        </Card>
      </div>
    </PageShell>
  )
}
