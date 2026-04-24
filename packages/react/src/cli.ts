#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type ProcessLike = {
  argv: string[];
  cwd(): string;
  exit(code?: number): never;
  stdout: {
    write(message: string): void;
  };
  stderr: {
    write(message: string): void;
  };
};

declare const process: ProcessLike;

type BuildOptions = {
  url?: string;
  component?: string;
  outDir?: string;
  json?: boolean;
  tailwind?: boolean;
};

type ElementAnalysis = {
  tagName: string;
  path: string;
  id?: string;
  className?: string;
  styles: {
    borderRadius: string;
    display: string;
  };
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  children: ElementAnalysis[];
};

type AnalysisResult = {
  url: string;
  finalUrl: string;
  component?: string;
  capturedAt: string;
  viewport: {
    width: number;
    height: number;
  } | null;
  structure: ElementAnalysis | null;
};

type ParseResult =
  | {
      command: "build";
      options: BuildOptions;
    }
  | {
      command: "help";
    };

const HELP_TEXT = `Usage:
  haddhi build [options]

Options:
  --url <url>              Local dev server URL to analyze
  --component <name>       Component name to associate with the skeleton
  --out-dir <path>         Directory for generated skeleton components (default: haddhi)
  --json                   Print extracted DOM JSON instead of generating a component
  --tailwind               Generate Tailwind utility-based skeleton styles
  -u, --url=<url>          Shorthand or equals form for URL
  -c, --component=<name>   Shorthand or equals form for component name
  -h, --help               Show help

Examples:
  npx haddhi build --url http://localhost:5173 --component ProfileCard
  npx haddhi build -u http://localhost:3000 -c Dashboard
`;

function print(message: string) {
  process.stdout.write(message);
}

function printError(message: string) {
  process.stderr.write(message);
}

function readOptionValue(args: string[], index: number, option: string) {
  const value = args[index + 1];

  if (!value || value.startsWith("-")) {
    throw new Error(`Missing value for ${option}`);
  }

  return value;
}

function parseArgs(args: string[]): ParseResult {
  const [command, ...rest] = args;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    return { command: "help" };
  }

  if (command !== "build") {
    throw new Error(`Unknown command "${command}"`);
  }

  const options: BuildOptions = {};

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];

    if (arg === "--help" || arg === "-h") {
      return { command: "help" };
    }

    if (arg === "--url" || arg === "-u") {
      options.url = readOptionValue(rest, index, arg);
      index += 1;
      continue;
    }

    if (arg.startsWith("--url=")) {
      options.url = arg.slice("--url=".length);
      continue;
    }

    if (arg === "--component" || arg === "-c") {
      options.component = readOptionValue(rest, index, arg);
      index += 1;
      continue;
    }

    if (arg.startsWith("--component=")) {
      options.component = arg.slice("--component=".length);
      continue;
    }

    if (arg === "--out-dir") {
      options.outDir = readOptionValue(rest, index, arg);
      index += 1;
      continue;
    }

    if (arg.startsWith("--out-dir=")) {
      options.outDir = arg.slice("--out-dir=".length);
      continue;
    }

    if (arg === "--json") {
      options.json = true;
      continue;
    }

    if (arg === "--tailwind") {
      options.tailwind = true;
      continue;
    }

    throw new Error(`Unknown option "${arg}"`);
  }

  return { command, options };
}

function validateBuildOptions(options: BuildOptions) {
  if (!options.url) {
    throw new Error("Missing required option --url");
  }

  try {
    new URL(options.url);
  } catch {
    throw new Error(`Invalid URL "${options.url}"`);
  }
}

async function analyzeUrl(options: Required<Pick<BuildOptions, "url">> & BuildOptions) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ channel: "chrome", headless: true }).catch(() =>
    chromium.launch({ headless: true }),
  );

  try {
    const page = await browser.newPage();

    await page.goto(options.url, {
      waitUntil: "load",
      timeout: 30_000,
    });

    await page.waitForLoadState("networkidle", { timeout: 1_500 }).catch(() => {
      // Dev servers often keep websocket connections open; the load event is enough.
    });

    const analysis = await page.evaluate<AnalysisResult, { url: string; component?: string }>(
      ({ url, component }) => {
        const round = (value: number) => Math.round(value * 100) / 100;
        const getPath = (element: Element) => {
          const parts: string[] = [];
          let current: Element | null = element;

          while (current && current !== document.documentElement) {
            const tag = current.tagName.toLowerCase();
            const parent: Element | null = current.parentElement;

            if (!parent) {
              parts.unshift(tag);
              break;
            }

            const siblings: Element[] = Array.from(parent.children).filter(
              (sibling: Element) => sibling.tagName === current?.tagName,
            );
            const index = siblings.indexOf(current) + 1;

            parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${index})` : tag);
            current = parent;
          }

          return `html > ${parts.join(" > ")}`;
        };
        const serializeElement = (element: Element): ElementAnalysis => {
          const rect = element.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(element);

          return {
            tagName: element.tagName.toLowerCase(),
            path: getPath(element),
            id: element.id || undefined,
            className:
              typeof element.className === "string" && element.className
                ? element.className
                : undefined,
            styles: {
              borderRadius: computedStyle.borderRadius,
              display: computedStyle.display,
            },
            rect: {
              x: round(rect.x),
              y: round(rect.y),
              width: round(rect.width),
              height: round(rect.height),
              top: round(rect.top),
              right: round(rect.right),
              bottom: round(rect.bottom),
              left: round(rect.left),
            },
            children: Array.from(element.children).map(serializeElement),
          };
        };

        return {
          url,
          finalUrl: window.location.href,
          component,
          capturedAt: new Date().toISOString(),
          viewport: window.visualViewport
            ? {
                width: round(window.visualViewport.width),
                height: round(window.visualViewport.height),
              }
            : null,
          structure: document.body ? serializeElement(document.body) : null,
        };
      },
      { url: options.url, component: options.component },
    );

    return analysis;
  } finally {
    await browser.close();
  }
}

type SkeletonBlock = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: string;
};

function toPascalCase(value: string) {
  const normalized = value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim();

  if (!normalized) return "HaddhiSkeleton";

  return normalized
    .split(/\s+/)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

function toKebabCase(value: string) {
  return toPascalCase(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function isVisibleElement(element: ElementAnalysis) {
  return (
    element.rect.width > 0 &&
    element.rect.height > 0 &&
    element.styles.display !== "none" &&
    element.tagName !== "script" &&
    element.tagName !== "style"
  );
}

function getGenerationRoot(analysis: AnalysisResult) {
  const body = analysis.structure;

  if (!body) return null;

  const appRoot = body.children.find((child) => child.id === "root" && isVisibleElement(child));
  if (appRoot) return appRoot;

  return body.children.find(isVisibleElement) ?? body;
}

function hasVisibleChildren(element: ElementAnalysis) {
  return element.children.some(isVisibleElement);
}

function shouldCreateBlock(element: ElementAnalysis) {
  const skeletonTags = new Set([
    "button",
    "canvas",
    "hr",
    "img",
    "input",
    "meter",
    "progress",
    "select",
    "svg",
    "textarea",
    "video",
  ]);

  return (
    skeletonTags.has(element.tagName) || !hasVisibleChildren(element)
  );
}

function collectSkeletonBlocks(
  element: ElementAnalysis,
  root: ElementAnalysis,
  blocks: SkeletonBlock[] = [],
) {
  if (!isVisibleElement(element)) return blocks;

  if (element !== root && shouldCreateBlock(element)) {
    blocks.push({
      key: `block-${blocks.length}`,
      x: round(element.rect.left - root.rect.left),
      y: round(element.rect.top - root.rect.top),
      width: round(element.rect.width),
      height: round(element.rect.height),
      radius: element.styles.borderRadius || "8px",
    });

    return blocks;
  }

  for (const child of element.children) {
    collectSkeletonBlocks(child, root, blocks);
  }

  return blocks;
}

function generateSkeletonComponent(analysis: AnalysisResult, options: BuildOptions) {
  const requestedName = analysis.component ?? "GeneratedSkeleton";
  const componentName = `${toPascalCase(requestedName)}Skeleton`;
  const root = getGenerationRoot(analysis);

  if (!root) {
    throw new Error("Unable to generate skeleton: no DOM root was captured");
  }

  const blocks = collectSkeletonBlocks(root, root);

  if (blocks.length === 0) {
    blocks.push({
      key: "block-0",
      x: 0,
      y: 0,
      width: round(root.rect.width),
      height: round(root.rect.height),
      radius: root.styles.borderRadius || "8px",
    });
  }

  const width = Math.max(round(root.rect.width), 1);
  const height = Math.max(round(root.rect.height), 1);

  if (options.tailwind) {
    return `import type { CSSProperties } from "react";

type ${componentName}Props = {
  className?: string;
  boneClassName?: string;
  style?: CSSProperties;
  baseColor?: string;
  speed?: number;
};

const bones = ${JSON.stringify(blocks, null, 2)} as const;

export function ${componentName}({
  className = "",
  boneClassName = "",
  style,
  baseColor,
  speed = 1.4,
}: ${componentName}Props) {
  return (
    <div
      className={\`relative w-full overflow-hidden \${className}\`.trim()}
      aria-hidden="true"
      style={{
        ...style,
        maxWidth: ${width},
        height: ${height},
      }}
    >
      {bones.map((bone) => (
        <span
          key={bone.key}
          className={\`absolute block animate-pulse bg-slate-200 dark:bg-slate-700 \${boneClassName}\`.trim()}
          style={{
            left: bone.x,
            top: bone.y,
            width: bone.width,
            height: bone.height,
            borderRadius: bone.radius,
            backgroundColor: baseColor,
            animationDuration: \`\${speed}s\`,
          }}
        />
      ))}
    </div>
  );
}
`;
  }

  return `import type { CSSProperties } from "react";

type ${componentName}Props = {
  className?: string;
  style?: CSSProperties;
  baseColor?: string;
  highlightColor?: string;
  speed?: number;
};

const bones = ${JSON.stringify(blocks, null, 2)} as const;

export function ${componentName}({
  className = "",
  style,
  baseColor = "#e5e7eb",
  highlightColor = "#f3f4f6",
  speed = 1.4,
}: ${componentName}Props) {
  return (
    <div
      className={\`haddhi-generated-skeleton \${className}\`.trim()}
      aria-hidden="true"
      style={{
        ...style,
        "--haddhi-base-color": baseColor,
        "--haddhi-highlight-color": highlightColor,
        "--haddhi-duration": \`\${speed}s\`,
      } as CSSProperties}
    >
      <style>{\`
        .haddhi-generated-skeleton {
          position: relative;
          width: 100%;
          max-width: ${width}px;
          height: ${height}px;
          overflow: hidden;
        }

        .haddhi-generated-skeleton .haddhi-bone {
          position: absolute;
          display: block;
          background: linear-gradient(
            90deg,
            var(--haddhi-base-color) 25%,
            var(--haddhi-highlight-color) 37%,
            var(--haddhi-base-color) 63%
          );
          background-size: 400% 100%;
          animation: haddhi-generated-shimmer var(--haddhi-duration) ease infinite;
        }

        @keyframes haddhi-generated-shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .haddhi-generated-skeleton .haddhi-bone {
            animation: none;
          }
        }
      \`}</style>

      {bones.map((bone) => (
        <span
          key={bone.key}
          className="haddhi-bone"
          style={{
            left: bone.x,
            top: bone.y,
            width: bone.width,
            height: bone.height,
            borderRadius: bone.radius,
          }}
        />
      ))}
    </div>
  );
}
`;
}

async function writeSkeletonComponent(analysis: AnalysisResult, options: BuildOptions) {
  const name = analysis.component ?? options.component ?? "generated";
  const fileName = `${toKebabCase(name)}.tsx`;
  const outDir = path.resolve(process.cwd(), options.outDir ?? "haddhi");
  const outputPath = path.join(outDir, fileName);

  await mkdir(outDir, { recursive: true });
  await writeFile(outputPath, generateSkeletonComponent(analysis, options), "utf8");

  return outputPath;
}

async function runBuild(options: BuildOptions) {
  validateBuildOptions(options);

  if (!options.url) {
    throw new Error("Missing required option --url");
  }

  const analysis = await analyzeUrl({
    ...options,
    url: options.url,
  });

  if (options.json) {
    print(`${JSON.stringify(analysis, null, 2)}\n`);
    return;
  }

  const outputPath = await writeSkeletonComponent(analysis, options);

  print(
    `${JSON.stringify(
      {
        component: `${toPascalCase(analysis.component ?? "GeneratedSkeleton")}Skeleton`,
        file: outputPath,
        bones: getGenerationRoot(analysis)
          ? collectSkeletonBlocks(getGenerationRoot(analysis)!, getGenerationRoot(analysis)!)
              .length
          : 0,
      },
      null,
      2,
    )}\n`,
  );
}

export async function runCli(args = process.argv.slice(2)) {
  const result = parseArgs(args);

  if (result.command === "help") {
    print(HELP_TEXT);
    return;
  }

  await runBuild(result.options);
}

runCli().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown CLI error";

  printError(`haddhi: ${message}\n\n`);
  printError(HELP_TEXT);
  process.exit(1);
});
