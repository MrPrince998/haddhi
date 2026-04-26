import type { MetadataRoute } from "next"

import { absoluteUrl, seoPages } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-25")

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...seoPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.priority,
    })),
  ]
}
