// app/page.tsx
import Link from "next/link"
import {
  ArrowRight,
  Bone,
  Zap,
  Shield,
  Code2,
  Palette,
  Layout,
  Star,
  Terminal,
  GitFork,
  Eye,
} from "lucide-react"

import {
  BrowserFrame,
  MetricCard,
  PageHeader,
  PageShell,
  SectionHeading,
  StepCard,
} from "@/components/docs-kit"
import { HaddhiProductPreview } from "@/components/haddhi-showcase"
import { InstallCommandBar } from "@/components/install-command-bar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/overview")

async function getGitHubStars() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/MrPrince998/haddhi",
      {
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      return 0
    }

    const repo = (await response.json()) as { stargazers_count?: number }

    return repo.stargazers_count ?? 0
  } catch {
    return 0
  }
}

// Feature cards data
const features = [
  {
    title: "Auto Layout Measurement",
    description:
      "Renders your real component invisibly, measures its DOM structure, and generates matching skeleton bones automatically.",
    icon: Layout,
  },
  {
    title: "Rich Preset Library",
    description:
      "Choose from 6+ presets including profile cards, articles, products, comments, list items, and blog cards.",
    icon: Palette,
  },
  {
    title: "Animation Controls",
    description:
      "Fine-tune loading states with shimmer, pulse, wave, or static animations — adjust speed, colors, and delays.",
    icon: Zap,
  },
  {
    title: "TypeScript First",
    description:
      "Fully typed API with intelligent autocomplete, making skeleton integration smooth and error-free.",
    icon: Code2,
  },
  {
    title: "Smart Caching",
    description:
      "Measured layouts are cached and reused across repeated loading states to maximize performance.",
    icon: Shield,
  },
  {
    title: "CLI Generation",
    description:
      "Generate static skeleton components from live pages using the optional CLI — perfect for complex UIs.",
    icon: Terminal,
  },
]

// Testimonials data
// const testimonials = [
//   {
//     quote:
//       "Haddhi completely changed how we handle loading states. Our dashboards feel polished without writing a single placeholder component.",
//     author: "Sarah Chen",
//     role: "Frontend Architect",
//     company: "Vercel",
//   },
//   {
//     quote:
//       "The auto-measurement feature is magic. It just works with our existing component library and saves hours of skeleton maintenance.",
//     author: "Marcus Rodriguez",
//     role: "Senior Engineer",
//     company: "Shopify",
//   },
//   {
//     quote:
//       "Finally a skeleton library that respects design systems. The preset system and animation controls give us perfect loading states.",
//     author: "Emma Watson",
//     role: "Product Designer",
//     company: "Stripe",
//   },
// ]

export default async function Page() {
  const stars = await getGitHubStars()

  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Meet Haddhi (हड्डी)"
        title="Skeleton screens generated from the UI you already built."
        description="Haddhi wraps a real React component, learns its shape, and renders loading states that feel native to your product instead of hand-tuned placeholders."
      >
        <div className="flex flex-col gap-3">
          <InstallCommandBar stars={stars} />
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg">
              <Link href="/install">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs/demo">View Demo</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link
                href="https://github.com/MrPrince998/haddhi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="mr-2 h-4 w-4" />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </PageHeader>

      {/* Stats Section */}
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Runtime modes"
          value="3"
          detail="Auto, preset, and simple variant rendering — pick the right abstraction."
        />
        <MetricCard
          label="Presets"
          value="6+"
          detail="Profile, article, product, comment, list item, and blog card."
        />
        <MetricCard
          label="Animations"
          value="4"
          detail="Shimmer, pulse, wave, or static loading states."
        />
      </section>

      {/* Live Preview Section */}
      <section className="grid gap-4 lg:grid-cols-2">
        <BrowserFrame label="Your Real UI Component">
          <HaddhiProductPreview />
        </BrowserFrame>
        <BrowserFrame label="Haddhi Skeleton — Same Shape, Loading State">
          <HaddhiProductPreview loading />
        </BrowserFrame>
      </section>

      {/* How It Works Section */}
      <section className="flex flex-col gap-6">
        <SectionHeading
          title="How it works"
          description="Three simple steps to beautiful loading states that match your UI."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            index={1}
            title="Wrap your component"
            description="Import Haddhi and wrap the exact content users will eventually see. No extra configuration needed."
          />
          <StepCard
            index={2}
            title="Choose a skeleton mode"
            description="Use auto for measured UI, preset for known layouts, or variant for simple surfaces like text or avatars."
          />
          <StepCard
            index={3}
            title="Tune the feel"
            description="Adjust animation, radius, colors, delay, and cache behavior when defaults need polish."
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-6">
        <SectionHeading
          title="Everything you need"
          description="Production-ready features that make skeleton loading effortless."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group transition-all hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Code Example Section */}
      <section className="flex flex-col gap-6">
        <SectionHeading
          title="Simple as React components"
          description="Drop Haddhi into your existing codebase and watch loading states come to life."
        />
        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                @haddhi/react
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                TypeScript
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="overflow-x-auto bg-muted/10 p-5 text-sm leading-6">
              <code className="font-mono text-foreground/90">{`import { Haddhi } from "@haddhi/react"

// Wrap any existing component
export function ProductCard({ product, isLoading }) {
  return (
    <Haddhi 
      loading={isLoading}
      preset="product"
      animation="shimmer"
      radius={12}
    >
      <ProductCardContent product={product} />
    </Haddhi>
  )
}

// Or let Haddhi measure your UI automatically
export function DashboardWidget({ data, isLoading }) {
  return (
    <Haddhi loading={isLoading}>
      <ComplexWidget data={data} />
    </Haddhi>
  )
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Why Haddhi Section */}
      <section className="flex flex-col gap-6">
        <SectionHeading
          title="Why Haddhi?"
          description="Because skeleton loading should be automatic, not tedious."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span> Zero boilerplate
              </CardTitle>
              <CardDescription>
                No need to manually create skeleton components for every card,
                list, or detail view. Haddhi learns from your existing UI.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚡</span> Performance first
              </CardTitle>
              <CardDescription>
                Smart caching, ResizeObserver support, and configurable depth
                limits keep your app fast even with complex component trees.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎨</span> Design system ready
              </CardTitle>
              <CardDescription>
                Customize colors, border radius, animations, and spacing to
                match your brand perfectly — no design constraints.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔧</span> Developer friendly
              </CardTitle>
              <CardDescription>
                Full TypeScript support, extensive documentation, and a CLI for
                generating static skeletons when you need them.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="flex flex-col gap-6">
        <SectionHeading
          title="Loved by developers"
          description="Join teams already shipping better loading states."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-3 flex gap-0.5 text-yellow-500">
                  {"★".repeat(5)}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  "{testimonial.quote}"
                </CardDescription>
              </CardHeader>
              <CardContent className="border-t pt-4">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} @ {testimonial.company}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Open Source Section */}
      <Separator />

      <section className="flex flex-col items-center gap-6 rounded-xl bg-linear-to-r from-primary/5 via-transparent to-primary/5 p-8 text-center">
        <div className="flex items-center gap-2">
          <Bone className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">Haddhi</span>
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">
          Open source. TypeScript ready. MIT licensed.
        </h3>
        <p className="max-w-2xl text-muted-foreground">
          Built with ❤️ for the React community. Contribute, file issues, or
          star us on GitHub to support the project.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link
              href="https://github.com/MrPrince998/haddhi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/changelog">
              <Eye className="mr-2 h-4 w-4" />
              Changelog
            </Link>
          </Button>
          <Button asChild>
            <Link href="/install">
              Start building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* GitHub stats footer */}
      {stars > 0 && (
        <div className="flex justify-center gap-6 text-center text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            {stars.toLocaleString()} stars
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            MIT License
          </span>
        </div>
      )}
    </PageShell>
  )
}
