import type { haddiSidebarType } from "@/types/haddi.interface"
import type { ElementType } from "react"
import { BookOpen, Code2, Cpu, Layout } from "lucide-react"

export type SidebarSection = {
  title: string
  icon?: ElementType
  items: haddiSidebarType[]
  defaultOpen?: boolean
}

export const sidebarStructure: SidebarSection[] = [
  {
    title: "Getting Started",
    icon: BookOpen,
    defaultOpen: true,
    items: [
      {
        name: "Overview",
        href: "/overview",
        description: "What is Haddhi and why use it",
      },
      {
        name: "How it works",
        href: "/how-it-works",
        description: "Understanding the magic behind auto-measurement",
      },
      {
        name: "Installation",
        href: "/install",
        description: "Install and set up Haddhi in your project",
      },
    ],
  },
  {
    title: "Frameworks",
    icon: Code2,
    defaultOpen: true,
    items: [
      {
        name: "React",
        href: "/frameworks/react",
        description: "Using Haddhi with React",
      },
    ],
  },
  {
    title: "Advanced",
    icon: Cpu,
    defaultOpen: false,
    items: [
      {
        name: "Responsive",
        href: "/responsive",
        description: "Responsive skeletons across breakpoints",
      },
      {
        name: "Performance",
        href: "/performance",
        description: "Optimize caching and rendering",
      },
      {
        name: "SSR & Next.js",
        href: "/ssr",
        description: "Server-side rendering considerations",
      },
    ],
  },
  {
    title: "Resources",
    icon: Layout,
    defaultOpen: false,
    items: [
      {
        name: "Complex Example",
        href: "/demo",
        description: "Real-world dashboard example",
      },
      {
        name: "Examples",
        href: "/examples",
        description: "Common patterns and recipes",
      },
      {
        name: "Changelog",
        href: "/changelog",
        description: "Version history and updates",
      },
    ],
  },
]
