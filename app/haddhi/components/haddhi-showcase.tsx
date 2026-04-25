import {
  Haddhi,
  type HaddhiPreset,
} from "../../../packages/react/dist/index.js"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ProductCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
      <div className="flex aspect-square items-end rounded-lg bg-muted p-3">
        <span className="text-xs font-medium text-muted-foreground">
          Product image
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold">Compact task board</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            A dense product card with title, description, actions, and media.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Haddhi</Badge>
          <Badge variant="outline">Auto measured</Badge>
        </div>
      </div>
    </div>
  )
}

export function HaddhiProductPreview({
  loading = false,
}: {
  loading?: boolean
}) {
  return (
    <Haddhi loading={loading} animation="shimmer" cacheKey="docs-product-card">
      <ProductCard />
    </Haddhi>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>
          Events from the last deployment window.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span>Haddhi captured route {row}</span>
              <Badge variant="outline">ready</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function HaddhiDashboardPreview({
  loading = false,
}: {
  loading?: boolean
}) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <Haddhi
          loading={loading}
          animation="pulse"
          cacheKey="docs-dashboard-revenue"
          className="block"
        >
          <Metric label="Revenue" value="$42.8k" />
        </Haddhi>
        <Haddhi
          loading={loading}
          animation="pulse"
          cacheKey="docs-dashboard-users"
          className="block"
        >
          <Metric label="Users" value="8,402" />
        </Haddhi>
        <Haddhi
          loading={loading}
          animation="pulse"
          cacheKey="docs-dashboard-latency"
          className="block"
        >
          <Metric label="Latency" value="124ms" />
        </Haddhi>
      </div>
      <Haddhi
        loading={loading}
        animation="wave"
        cacheKey="docs-dashboard-activity"
        className="block"
      >
        <ActivityFeed />
      </Haddhi>
    </div>
  )
}

function RecipeCard({
  name,
  preset,
  detail,
}: {
  name: string
  preset: HaddhiPreset
  detail: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{name}</CardTitle>
          <Badge variant="outline">{preset}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}

export function HaddhiRecipePreview({
  name,
  preset,
  detail,
}: {
  name: string
  preset: HaddhiPreset
  detail: string
}) {
  return (
    <Haddhi
      loading
      preset={preset}
      animation="shimmer"
      className="block min-h-36"
    >
      <RecipeCard name={name} preset={preset} detail={detail} />
    </Haddhi>
  )
}
