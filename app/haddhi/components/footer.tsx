import React from "react"
import { Separator } from "./ui/separator"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { ThemeToggle } from "./theme-toggle"

// Get GitHub stars (could be fetched in a server component, but keeping simple)
const GITHUB_REPO = "https://github.com/MrPrince998/haddhi"

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border py-6 md:mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Haddhi</span>
            <Separator orientation="vertical" className="h-4" />
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/changelog"
              className="transition-colors hover:text-foreground"
            >
              Changelog
            </Link>
            <Link
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <FaGithub className="h-3.5 w-3.5" />
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
