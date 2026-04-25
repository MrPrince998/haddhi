# @haddhi/react

React skeleton loading components for Haddhi.

Use this package when you want to render polished loading placeholders in a React app. The companion CLI package is `@haddhi/cli`, which exposes the `haddhi` command for generating skeleton files from a running page.

## Installation

```bash
npm install @haddhi/react
```

```bash
pnpm add @haddhi/react
```

`react` and `react-dom` are peer dependencies and must already be installed in your app.

## Quick Start

```tsx
import { Haddhi } from "@haddhi/react";

export function ProjectCardView({ isLoading, project }) {
  return (
    <Haddhi loading={isLoading}>
      <ProjectCard project={project} />
    </Haddhi>
  );
}
```

When `loading` is true, Haddhi renders a skeleton. When `loading` is false, it renders the children.

## Presets

Presets give you stable skeleton layouts without measuring the child DOM.

```tsx
import { Haddhi } from "@haddhi/react";

export function ProfileSkeleton() {
  return (
    <Haddhi loading preset="profile" animation="wave" radius={10}>
      <ProfileCard />
    </Haddhi>
  );
}
```

Available presets:

- `blog-card`
- `profile`
- `article`
- `product`
- `comment`
- `list-item`

## Variants

Use `variant` for simple built-in shapes:

```tsx
<Haddhi loading variant="text">
  <ArticleTitle />
</Haddhi>

<Haddhi loading variant="card">
  <ProductCard />
</Haddhi>

<Haddhi loading variant="avatar">
  <UserAvatar />
</Haddhi>
```

Available variants:

- `auto`
- `text`
- `card`
- `avatar`

`auto` measures the child layout and creates skeleton blocks that match the rendered UI.

## Animations

```tsx
<Haddhi loading animation="shimmer">
  <Content />
</Haddhi>
```

Available animations:

- `shimmer`
- `pulse`
- `wave`
- `static`

## Styling

```tsx
<Haddhi
  loading
  baseColor="#e5e7eb"
  highlightColor="#f8fafc"
  duration={1.2}
  radius="12px"
>
  <DashboardCard />
</Haddhi>
```

You can also pass `className` to the wrapper:

```tsx
<Haddhi loading className="my-skeleton">
  <Content />
</Haddhi>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | Shows the skeleton when true. |
| `children` | `ReactNode` | required | Real UI rendered when not loading and measured in auto mode. |
| `className` | `string` | `""` | Class name for the skeleton wrapper. |
| `wrapper` | intrinsic element or component | `"div"` | Wrapper element used around the skeleton. |
| `preset` | `HaddhiPreset` | undefined | Named skeleton layout. |
| `variant` | `"auto" \| "text" \| "card" \| "avatar"` | `"auto"` | Skeleton rendering mode. |
| `animation` | `"shimmer" \| "pulse" \| "wave" \| "static"` | `"shimmer"` | Skeleton animation style. |
| `baseColor` | `string` | `"#e5e7eb"` | Base skeleton color. |
| `highlightColor` | `string` | `"#f3f4f6"` | Highlight color for animated skeletons. |
| `speed` | `number` | undefined | Alias-style animation duration value in seconds. |
| `duration` | `number` | `1.4` | Animation duration in seconds. |
| `delay` | `number` | `0` | Delay in milliseconds before showing the skeleton. |
| `radius` | `number \| string` | variant based | Border radius for skeleton blocks. |
| `ariaLabel` | `string` | `"Loading content"` | Accessible loading label. |
| `debug` | `boolean` | `false` | Adds debug styling around measured bones. |
| `cache` | `boolean` | `true` | Caches measured auto layouts. |
| `cacheKey` | `string` | generated | Manual key for layout caching. |
| `maxDepth` | `number` | `8` | Maximum DOM depth to inspect in auto mode. |
| `suspense` | `boolean` | `false` | Uses React Suspense fallback behavior. |
| `catchErrors` | `boolean` | `false` | Catches render errors from children. |
| `errorFallback` | `ReactNode` | undefined | Fallback UI for caught errors. |
| `onError` | `(error, info) => void` | undefined | Error callback. |

## Suspense

```tsx
<Haddhi suspense preset="article">
  <Article />
</Haddhi>
```

## Error Fallback

```tsx
<Haddhi
  catchErrors
  errorFallback={<p>Could not load this section.</p>}
  onError={(error) => console.error(error)}
>
  <RiskySection />
</Haddhi>
```

## Generated Skeletons

To generate a skeleton component from a running page, use the CLI package:

```bash
pnpm dlx @haddhi/cli build --url http://localhost:5173 --component ProjectCard
```

The CLI is separate from this React package so normal React installs do not include Playwright.

## Local Development

From the repository root:

```bash
pnpm --filter @haddhi/react build
```

Run the playground:

```bash
pnpm --filter react-playground dev
```

## License

MIT
