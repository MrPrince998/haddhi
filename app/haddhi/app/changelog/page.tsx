import {
  CodeBlock,
  PageHeader,
  PageShell,
  SectionHeading,
} from "@/components/docs-kit"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tag,
  Rocket,
  Wrench,
  Bug,
  Sparkles,
  Package,
  AlertCircle,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react"
import version from "../../../../packages/react/package.json"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/changelog")

const releases = [
  {
    version: version.version,
    label: "Latest",
    date: "2026-04-25",
    type: "patch",
    items: [
      "Refactored Haddhi internals for better readability and maintenance",
      "Aligned the monorepo and `@haddhi/react` package versions at 0.1.2",
    ],
    improvements: [
      "Centralized hidden measurement styling for the invisible layout pass",
      "Preserved the existing public React API while tightening implementation details",
    ],
    fixes: ["Fixed hidden element handling during skeleton measurement"],
  },
  {
    version: "0.1.1",
    label: "Package polish",
    date: "2026-04-25",
    type: "patch",
    items: [
      "Updated package metadata with npm links, repository information, and license details",
      "Added project governance files including LICENSE and Code of Conduct",
      "Expanded README documentation for installation, usage, and component examples",
    ],
    improvements: [
      "Improved package names and installation instructions for `@haddhi/react` and `@haddhi/cli`",
      "Added CodeQL analysis workflow configuration",
      "Enhanced README badges and npm package discoverability",
    ],
    fixes: ["Corrected package version metadata and package.json formatting"],
  },
  {
    version: "0.1.0",
    label: "Initial release",
    date: "2026-04-25",
    type: "major",
    items: [
      "Introduced the main `Haddhi` React package source",
      "Added auto-measured skeleton rendering for real component layouts",
      "Added built-in presets for profile, article, product, comment, list item, and blog card shapes",
      "Added animation controls for shimmer, pulse, wave, and static loading states",
      "Added TypeScript support and package build output",
      "Added the CLI package for generating skeleton loading components from rendered UI",
    ],
    improvements: [
      "Added smart layout caching with configurable cache keys",
      "Added React playground setup and resolved JSX runtime typing",
    ],
    fixes: [],
  },
]

const roadmap = [
  {
    version: "0.2.0",
    eta: "Planned",
    items: [
      "Continue hardening auto measurement across complex layouts",
      "Improve docs examples from real package usage",
      "Expand CLI guidance once the workflow stabilizes",
      "Keep React 18+ and React 19 compatibility covered",
    ],
  },
]

export default function Page() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "major":
        return <Rocket className="h-4 w-4 text-emerald-500" />
      case "minor":
        return <Sparkles className="h-4 w-4 text-blue-500" />
      default:
        return <Wrench className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "major":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
            Major
          </Badge>
        )
      case "minor":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            Minor
          </Badge>
        )
      default:
        return <Badge variant="outline">Patch</Badge>
    }
  }

  return (
    <PageShell>
      {/* Hero Section */}
      <PageHeader
        eyebrow="Changelog"
        title="A compact history of the public surface."
        description="Track the runtime, docs, presets, and CLI workflow as the package matures."
      />

      {/* Current version alert */}
      <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20">
        <Package className="h-4 w-4 text-emerald-500" />
        <AlertTitle>Currently on v{version.version}</AlertTitle>
        <AlertDescription>
          You are viewing documentation for the latest stable release. Run{" "}
          <code className="rounded bg-muted px-1">
            npm install @haddhi/react@latest
          </code>{" "}
          to update.
        </AlertDescription>
      </Alert>

      {/* Releases timeline */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SectionHeading title="Version history" />
          <Badge variant="outline" className="gap-1">
            <ArrowUpDown className="h-3 w-3" />
            Newest first
          </Badge>
        </div>
        <div className="flex flex-col gap-4">
          {releases.map((release, idx) => (
            <Card key={release.version} className="relative overflow-hidden">
              {/* Version badge ribbon for latest */}
              {idx === 0 && (
                <div className="absolute top-0 right-0">
                  <div className="bg-emerald-500 px-3 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                    LATEST
                  </div>
                </div>
              )}
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="font-mono text-lg">
                        v{release.version}
                      </CardTitle>
                    </div>
                    {getTypeBadge(release.type)}
                    <Badge variant="outline" className="font-mono text-xs">
                      {release.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{release.date}</span>
                  </div>
                </div>
                <CardDescription>
                  {release.type === "major" &&
                    "Major release with new features and improvements"}
                  {release.type === "minor" &&
                    "Minor release with new features"}
                  {release.type === "patch" && "Patch release with fixes"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    {getTypeIcon(release.type)}
                    <span className="text-sm font-medium">Highlights</span>
                  </div>
                  <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                    {release.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                {release.improvements.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Improvements</span>
                    </div>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                      {release.improvements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bug fixes */}
                {release.fixes.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Bug className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Bug fixes</span>
                    </div>
                    <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                      {release.fixes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Roadmap */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <SectionHeading title="Roadmap" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {roadmap.map((item) => (
            <Card key={item.version}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono">v{item.version}</CardTitle>
                  <Badge variant="outline">ETA {item.eta}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.items.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Migration Guide */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Migration guides" />
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upgrading within v0.1.x</AlertTitle>
          <AlertDescription className="space-y-2">
            <p className="mt-2">
              The v0.1.x releases keep the same public component API. Upgrade to
              pick up package metadata updates, documentation polish, and the
              hidden measurement fix from v0.1.2.
            </p>
            <ul className="ml-6 list-disc space-y-1 text-sm">
              <li>
                Run{" "}
                <code className="rounded bg-muted px-1">
                  npm install @haddhi/react@latest
                </code>{" "}
                to install the latest React package
              </li>
              <li>
                No component prop changes are required when moving from v0.1.1
                to v0.1.2
              </li>
              <li>
                Existing auto, preset, animation, and cache usage remains
                compatible
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </section>

      {/* Version compatibility */}
      <section className="flex flex-col gap-4">
        <SectionHeading title="Compatibility" />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Haddhi Version</TableHead>
                  <TableHead>React</TableHead>
                  <TableHead>Next.js</TableHead>
                  <TableHead>TypeScript</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">v0.1.x</TableCell>
                  <TableCell>18.0+</TableCell>
                  <TableCell>13.0+</TableCell>
                  <TableCell>5.0+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Check version command */}
      <CodeBlock
        title="Check installed version"
        language="bash"
        code="pnpm list @haddhi/react"
      />

      {/* GitHub releases link */}
      <Alert variant="default">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Full changelog</AlertTitle>
        <AlertDescription>
          See the complete history of all releases on{" "}
          <a
            href="https://github.com/MrPrince998/haddhi/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            GitHub Releases
          </a>
          .
        </AlertDescription>
      </Alert>
    </PageShell>
  )
}
