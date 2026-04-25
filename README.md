[![npm version](https://img.shields.io/npm/v/@haddhi/react?logo=npm&color=cb3837&label=Haddhi)](https://www.npmjs.com/package/@haddhi/react)
[![npm version](https://img.shields.io/npm/v/@haddhi/react?logo=npm&color=cb3837&label=Haddhi-react)](https://www.npmjs.com/package/@haddhi/react)
[![license](https://img.shields.io/npm/l/@haddhi/react)](https://www.npmjs.com/package/@haddhi/react)
<br/>

# Haddhi

Skeleton loading UI for React, with an optional CLI that can generate skeleton components from your running app.

Haddhi helps you replace repetitive loading-state work with skeletons that match your real UI. Use `@haddhi/react` inside your app, and use `@haddhi/cli` when you want to inspect a page and generate a skeleton file.

NPM package: https://www.npmjs.com/package/@haddhi/react

## Packages

| Package | Use it for |
| --- | --- |
| `@haddhi/react` | React loading skeleton components. |
| `@haddhi/cli` | Command line skeleton generation. Exposes the `haddhi` command. |

## Install

Install the React package:

```bash
npm install @haddhi/react
```

```bash
pnpm add @haddhi/react
```

```bash
yarn add @haddhi/react
```

`react` and `react-dom` are peer dependencies.

## Quick Start

```tsx
import { Haddhi } from "@haddhi/react";

function ProjectCardView({ isLoading, project }) {
  return (
    <Haddhi loading={isLoading}>
      <ProjectCard project={project} />
    </Haddhi>
  );
}
```

When `loading` is true, Haddhi renders a skeleton. When `loading` is false, your real component is rendered.

## Preset Skeletons

Use a preset when you want a consistent skeleton shape without relying on DOM measurement.

```tsx
import { Haddhi } from "@haddhi/react";

function ProfileLoading() {
  return (
    <Haddhi loading preset="profile" animation="wave" radius={10}>
      <ProfileCard />
    </Haddhi>
  );
}
```

Available presets:

```txt
blog-card
profile
article
product
comment
list-item
```

## Variants

Use `variant` for simpler built-in skeleton shapes.

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

```txt
auto
text
card
avatar
```

`auto` measures the children and creates skeleton blocks that follow the rendered layout.

## Animations

```tsx
<Haddhi loading animation="shimmer">
  <Content />
</Haddhi>
```

Available animations:

```txt
shimmer
pulse
wave
static
```

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

You can also pass a class name to the skeleton wrapper:

```tsx
<Haddhi loading className="project-card-skeleton">
  <ProjectCard />
</Haddhi>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `loading` | `boolean` | `false` | Shows the skeleton when true. |
| `children` | `ReactNode` | required | Real UI rendered when not loading and measured in auto mode. |
| `className` | `string` | `""` | Class name for the skeleton wrapper. |
| `wrapper` | intrinsic element or component | `"div"` | Wrapper element used around the skeleton. |
| `preset` | `blog-card`, `profile`, `article`, `product`, `comment`, `list-item` | undefined | Named skeleton layout. |
| `variant` | `auto`, `text`, `card`, `avatar` | `auto` | Skeleton rendering mode. |
| `animation` | `shimmer`, `pulse`, `wave`, `static` | `shimmer` | Skeleton animation style. |
| `baseColor` | `string` | `#e5e7eb` | Base skeleton color. |
| `highlightColor` | `string` | `#f3f4f6` | Highlight color for animated skeletons. |
| `speed` | `number` | undefined | Alternative animation duration value in seconds. |
| `duration` | `number` | `1.4` | Animation duration in seconds. |
| `delay` | `number` | `0` | Delay in milliseconds before showing the skeleton. |
| `radius` | `number \| string` | variant based | Border radius for skeleton blocks. |
| `ariaLabel` | `string` | `Loading content` | Accessible loading label. |
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

## Generate Skeleton Files With The CLI

The CLI is published separately as `@haddhi/cli`. It exposes the command `haddhi`.

Start your app first:

```bash
pnpm dev
```

Then run the CLI against the local URL:

```bash
npx @haddhi/cli build --url http://localhost:5173 --component ProjectCard
```

```bash
pnpm dlx @haddhi/cli build --url http://localhost:5173 --component ProjectCard
```

The generated component is written to `./haddhi` by default.

### CLI Options

| Option | Description |
| --- | --- |
| `--url <url>` / `-u <url>` | Running page URL to inspect. Required. |
| `--component <name>` / `-c <name>` | Component name used for the generated skeleton. |
| `--out-dir <path>` | Output directory. Defaults to `haddhi`. |
| `--json` | Print captured DOM analysis instead of writing a component. |
| `--tailwind` | Generate Tailwind utility-based skeleton styles. |
| `--help` / `-h` | Show CLI help. |

Examples:

```bash
npx @haddhi/cli build --url http://localhost:3000 --component Dashboard
npx @haddhi/cli build -u http://localhost:5173 -c ProfileCard --out-dir src/skeletons
npx @haddhi/cli build -u http://localhost:5173 -c ProductCard --tailwind
npx @haddhi/cli build -u http://localhost:5173 --json
```

Install the CLI globally if you prefer the shorter command:

```bash
npm install -g @haddhi/cli
haddhi build --url http://localhost:5173 --component ProjectCard
```

## Why The CLI Is Separate

`@haddhi/cli` uses Playwright to inspect rendered pages. Keeping it separate means `@haddhi/react` stays lightweight for normal app installs.

## TypeScript

Haddhi ships TypeScript declarations. You can import component types directly:

```ts
import type { HaddhiProps, HaddhiPreset, HaddhiAnimation } from "@haddhi/react";
```

## Local Development

This repository uses pnpm workspaces.

```bash
pnpm install
pnpm build
```

Build individual packages:

```bash
pnpm --filter @haddhi/react build
pnpm --filter @haddhi/cli build
```

Run the playground:

```bash
pnpm --filter react-playground dev
```

Run the CLI locally:

```bash
pnpm --filter @haddhi/cli run cli --help
```

## Repository Structure

```txt
haddhi/
  packages/
    react/       # @haddhi/react
    cli/         # @haddhi/cli
  examples/
    react-playground/
```

## Roadmap

- More React presets
- Next.js examples
- Better generated component customization
- Visual editing for generated skeletons
- Vue support

## License

MIT
