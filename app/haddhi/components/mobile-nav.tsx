"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

import { sidebarStructure } from "@/components/docs-navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Open navigation">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 max-w-[85vw] gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>Haddhi</SheetTitle>
          <SheetDescription>Navigate the documentation</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          {sidebarStructure.map((section) => {
            const Icon = section.icon

            return (
              <div key={section.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {Icon && <Icon className="size-3.5" />}
                  <span>{section.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
