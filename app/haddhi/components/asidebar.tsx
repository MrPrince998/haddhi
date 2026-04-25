"use client"

import { haddiSidebarType } from "@/types/haddi.interface"
import { Bone, GitFork, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import {
  sidebarStructure,
  type SidebarSection as SidebarSectionType,
} from "@/components/docs-navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Individual nav item component
const NavItem = ({
  item,
  isActive,
}: {
  item: haddiSidebarType
  isActive: boolean
}) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all duration-200",
        isActive
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
    >
      {/* Active indicator dot */}
      {isActive && (
        <span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
      )}
      <span className="flex-1 truncate">{item.name}</span>
      {item.description && isActive && (
        <span className="hidden text-[10px] font-normal text-muted-foreground group-hover:inline-block">
          active
        </span>
      )}
    </Link>
  )
}

// Collapsible section component
const SidebarSection = ({
  section,
  pathname,
}: {
  section: SidebarSectionType
  pathname: string
}) => {
  const Icon = section.icon
  const [isOpen, setIsOpen] = React.useState(section.defaultOpen ?? false)

  // Check if any item in this section is active
  const hasActiveItem = section.items.some((item) => pathname === item.href)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="h-3.5 w-3.5" />}
          <span>{section.title}</span>
        </div>
        <div className="flex items-center gap-1">
          {hasActiveItem && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          )}
          <svg
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              isOpen && "rotate-90"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 space-y-0.5 pl-2">
        {section.items.map((item) => {
          const isActive = pathname === item.href
          return <NavItem key={item.name} item={item} isActive={isActive} />
        })}
      </CollapsibleContent>
    </Collapsible>
  )
}

// Main Asidebar component
const Asidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="sticky top-20 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:flex">
      <ScrollArea className="flex-1 px-3 pt-18 pb-6">
        {/* Logo section */}
        <div className="mb-6 flex items-center gap-2.5 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/70 shadow-sm">
            <Bone className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground">
              Haddhi
            </span>
            <span className="text-[10px] text-muted-foreground">
              Skeleton UI Library
            </span>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Navigation sections */}
        <nav className="flex flex-1 flex-col gap-3">
          {sidebarStructure.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* Bottom section with GitHub link */}
        <div className="mt-6 pt-4">
          <Separator className="mb-4" />
          <a
            href="https://github.com/MrPrince998/haddhi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <GitFork className="h-4 w-4" />
            <span className="flex-1">GitHub</span>
            <span className="text-xs">★</span>
          </a>
          <a
            href="/changelog"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
              pathname === "/changelog" &&
                "bg-primary/10 font-medium text-primary"
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span className="flex-1">Changelog</span>
            {pathname === "/changelog" && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </a>
        </div>

        {/* Version indicator */}
        <div className="mt-4 px-2 pt-2">
          <p className="text-[10px] text-muted-foreground/60">
            v0.1.0 · MIT License
          </p>
        </div>
      </ScrollArea>
    </aside>
  )
}

export default Asidebar
