import type { Metadata } from "next"

export const siteConfig = {
  name: "Haddhi",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://haddhi.vercel.app"
  ).replace(/\/$/, ""),
  title: "Haddhi · Skeleton UI for React",
  description:
    "Haddhi generates skeleton loading screens that match your existing React UI with auto-measurement, presets, animations, and TypeScript support.",
  repository: "https://github.com/MrPrince998/haddhi",
  npmPackage: "https://www.npmjs.com/package/@haddhi/react",
  author: "MrPrince998",
  keywords: [
    "Haddhi",
    "React skeleton loading",
    "skeleton UI",
    "loading placeholders",
    "React loading component",
    "Next.js skeleton",
    "TypeScript skeleton component",
  ],
}

export const seoPages = [
  {
    path: "/overview",
    title: "React Skeleton Loading UI",
    description:
      "Generate skeleton screens from real React components with Haddhi auto-measurement, presets, animations, caching, and TypeScript support.",
    priority: 1,
  },
  {
    path: "/install",
    title: "Install Haddhi",
    description:
      "Install @haddhi/react with npm, pnpm, yarn, or bun and add matching skeleton loading states to a React or Next.js app.",
    priority: 0.9,
  },
  {
    path: "/how-it-works",
    title: "How Haddhi Auto-Measurement Works",
    description:
      "Learn how Haddhi measures rendered React UI, converts visible boxes into skeleton bones, caches layouts, and paints loading states.",
    priority: 0.8,
  },
  {
    path: "/frameworks/react",
    title: "Haddhi for React",
    description:
      "Use Haddhi in React with auto mode, preset skeleton layouts, simple variants, Suspense fallbacks, and typed component props.",
    priority: 0.8,
  },
  {
    path: "/responsive",
    title: "Responsive Skeleton Loading",
    description:
      "Build responsive skeleton loading states that follow container layout changes across mobile, tablet, and desktop breakpoints.",
    priority: 0.7,
  },
  {
    path: "/performance",
    title: "Skeleton Loading Performance",
    description:
      "Optimize Haddhi skeleton rendering with layout caching, presets, variants, delay controls, and measurement depth settings.",
    priority: 0.7,
  },
  {
    path: "/ssr",
    title: "SSR and Next.js Skeleton Loading",
    description:
      "Use Haddhi with server-rendered React apps by keeping DOM measurement behind client boundaries and using presets for server fallbacks.",
    priority: 0.7,
  },
  {
    path: "/examples",
    title: "Haddhi Skeleton Examples",
    description:
      "Browse Haddhi skeleton examples for profiles, articles, comments, list items, cards, avatars, and auto-measured React components.",
    priority: 0.7,
  },
  {
    path: "/demo",
    title: "Haddhi Dashboard Demo",
    description:
      "See a real dashboard loading state built with Haddhi presets, list skeletons, and auto-measured React panels.",
    priority: 0.6,
  },
  {
    path: "/changelog",
    title: "Haddhi Changelog",
    description:
      "Track Haddhi releases, package updates, React skeleton loading improvements, bug fixes, and roadmap notes.",
    priority: 0.5,
  },
] as const

export type SeoPath = (typeof seoPages)[number]["path"]

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath}`
}

export function pageMetadata(path: SeoPath): Metadata {
  const page = seoPages.find((item) => item.path === path)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      url: absoluteUrl(page.path),
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
    },
  }
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: siteConfig.npmPackage,
    codeRepository: siteConfig.repository,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
  }
}
