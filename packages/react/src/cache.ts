import type { Bone, CachedLayout } from "./types.js";

const skeletonLayoutCache = new Map<string, CachedLayout>();
const MAX_CACHE_ENTRIES = 100;

export function areBonesEqual(a: Bone[], b: Bone[]) {
  if (a.length !== b.length) return false;

  return a.every((bone, index) => {
    const nextBone = b[index];

    return (
      bone.x === nextBone.x &&
      bone.y === nextBone.y &&
      bone.width === nextBone.width &&
      bone.height === nextBone.height &&
      bone.radius === nextBone.radius
    );
  });
}

function hashString(value: string) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}

function getNodeSignature(
  node: Node,
  ownerWindow: Window & typeof globalThis,
  shouldIgnoreElement: (element: HTMLElement) => boolean,
  depth = 0,
  maxDepth = 8,
): string {
  if (depth > maxDepth) return "depth-limit";

  if (node.nodeType === ownerWindow.Node.TEXT_NODE) {
    return node.textContent?.trim() ? "text" : "";
  }

  if (!(node instanceof ownerWindow.HTMLElement) || shouldIgnoreElement(node)) {
    return "";
  }

  const childSignature = Array.from(node.childNodes)
    .map((childNode) =>
      getNodeSignature(childNode, ownerWindow, shouldIgnoreElement, depth + 1, maxDepth),
    )
    .filter(Boolean)
    .join(",");

  return `${node.tagName.toLowerCase()}[${childSignature}]`;
}

export function getSkeletonCacheKey(
  container: HTMLElement,
  ownerWindow: Window & typeof globalThis,
  shouldIgnoreElement: (element: HTMLElement) => boolean,
  explicitCacheKey?: string,
  maxDepth = 8,
) {
  const containerWidth = Math.round(container.getBoundingClientRect().width);
  const contentSignature = Array.from(container.childNodes)
    .map((node) =>
      getNodeSignature(node, ownerWindow, shouldIgnoreElement, 0, maxDepth),
    )
    .filter(Boolean)
    .join("|");
  const baseKey = explicitCacheKey ?? hashString(contentSignature);

  return `auto:${baseKey}:w${containerWidth}:d${maxDepth}`;
}

export function getCachedSkeletonLayout(cacheKey: string) {
  return skeletonLayoutCache.get(cacheKey);
}

export function rememberSkeletonLayout(cacheKey: string, layout: CachedLayout) {
  if (skeletonLayoutCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = skeletonLayoutCache.keys().next().value;

    if (oldestKey) {
      skeletonLayoutCache.delete(oldestKey);
    }
  }

  skeletonLayoutCache.set(cacheKey, layout);
}
