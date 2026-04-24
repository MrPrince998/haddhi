import type { Bone } from "./types.js";

export const HADDHI_IGNORE_ATTRIBUTE = "data-haddhi-ignore";

export function shouldIgnoreElement(el: HTMLElement) {
  return el.hasAttribute(HADDHI_IGNORE_ATTRIBUTE);
}

function getTextMetrics(style: CSSStyleDeclaration) {
  const fontSize = parseFloat(style.fontSize);
  const parsedLineHeight = parseFloat(style.lineHeight);
  const hasFontSize = Number.isFinite(fontSize) && fontSize > 0;
  const lineHeight =
    Number.isFinite(parsedLineHeight) && parsedLineHeight > 0
      ? parsedLineHeight
      : hasFontSize
        ? fontSize * 1.2
        : 0;

  return {
    fontSize: hasFontSize ? fontSize : 0,
    lineHeight,
  };
}

function hasVisibleBox(el: HTMLElement, style: CSSStyleDeclaration) {
  const tagName = el.tagName.toLowerCase();
  const boxTags = new Set([
    "button",
    "canvas",
    "hr",
    "input",
    "meter",
    "progress",
    "select",
    "svg",
    "textarea",
    "video",
  ]);

  const hasBackground =
    (style.backgroundImage !== "none" && style.backgroundImage !== "") ||
    (style.backgroundColor !== "transparent" &&
      style.backgroundColor !== "rgba(0, 0, 0, 0)");
  const hasBorder =
    parseFloat(style.borderTopWidth) > 0 ||
    parseFloat(style.borderRightWidth) > 0 ||
    parseFloat(style.borderBottomWidth) > 0 ||
    parseFloat(style.borderLeftWidth) > 0;
  const hasPadding =
    parseFloat(style.paddingTop) > 0 ||
    parseFloat(style.paddingRight) > 0 ||
    parseFloat(style.paddingBottom) > 0 ||
    parseFloat(style.paddingLeft) > 0;

  return (
    boxTags.has(tagName) ||
    hasBackground ||
    hasBorder ||
    hasPadding ||
    style.boxShadow !== "none"
  );
}

function isVisibleElement(el: HTMLElement, ownerWindow = window) {
  const rect = el.getBoundingClientRect();
  const style = ownerWindow.getComputedStyle(el);

  return rect.width > 0 && rect.height > 0 && style.display !== "none";
}

function getElementRadius(style: CSSStyleDeclaration, fallback = 8) {
  return parseFloat(style.borderRadius) || fallback;
}

function isTextMeasurementReliable(
  rects: DOMRect[],
  parentRect: DOMRect,
  fontSize: number,
  lineHeight: number,
) {
  if (rects.length === 0) return false;
  if (!fontSize || !lineHeight) return false;
  if (rects.some((rect) => rect.width <= 0 || rect.height <= 0)) return false;

  const totalLineHeight = rects.length * lineHeight;
  return totalLineHeight <= parentRect.height + lineHeight;
}

export function measureSkeleton(
  container: HTMLElement,
  ownerWindow: Window & typeof globalThis,
  observeElement: (element: HTMLElement) => void,
  maxDepth: number,
) {
  const containerRect = container.getBoundingClientRect();
  const measuredBones: Bone[] = [];

  observeElement(container);

  const addBone = (
    rect: DOMRect | DOMRectReadOnly,
    radius = 4,
    box?: Partial<Pick<Bone, "y" | "height">>,
  ) => {
    const height = box?.height ?? rect.height;

    if (rect.width <= 0 || height <= 0) return;

    measuredBones.push({
      x: rect.left - containerRect.left,
      y: box?.y ?? rect.top - containerRect.top,
      width: rect.width,
      height,
      radius,
    });
  };

  const addFallbackTextBlock = (parent: HTMLElement, style: CSSStyleDeclaration) => {
    if (!isVisibleElement(parent, ownerWindow)) return;

    addBone(parent.getBoundingClientRect(), getElementRadius(style, 4));
  };

  const measureTextNode = (node: Text) => {
    if (!node.textContent?.trim()) return;

    const parent = node.parentElement;
    if (!parent || shouldIgnoreElement(parent)) return;

    const style = ownerWindow.getComputedStyle(parent);
    const { fontSize, lineHeight } = getTextMetrics(style);
    const parentRect = parent.getBoundingClientRect();
    const range = container.ownerDocument.createRange();
    let rects: DOMRect[] = [];

    try {
      range.selectNodeContents(node);
      rects = Array.from(range.getClientRects()).map((rect) => DOMRect.fromRect(rect));
    } catch {
      rects = [];
    } finally {
      range.detach();
    }

    if (!isTextMeasurementReliable(rects, parentRect, fontSize, lineHeight)) {
      addFallbackTextBlock(parent, style);
      return;
    }

    for (const rect of rects) {
      const height = fontSize || rect.height;
      const y =
        rect.top -
        containerRect.top +
        Math.max(((lineHeight || rect.height) - height) / 2, 0);

      addBone(rect, getElementRadius(style, 4), { y, height });
    }
  };

  const measureNode = (node: Node, depth = 0) => {
    if (depth > maxDepth) return;

    if (node.nodeType === ownerWindow.Node.TEXT_NODE) {
      measureTextNode(node as Text);
      return;
    }

    if (!(node instanceof ownerWindow.HTMLElement) || shouldIgnoreElement(node)) {
      return;
    }

    if (!isVisibleElement(node, ownerWindow)) return;

    observeElement(node);

    const style = ownerWindow.getComputedStyle(node);
    const rect = node.getBoundingClientRect();

    if (node instanceof ownerWindow.HTMLImageElement) {
      addBone(rect, getElementRadius(style));
      return;
    }

    if (hasVisibleBox(node, style)) {
      addBone(rect, getElementRadius(style));
      return;
    }

    node.childNodes.forEach((childNode) => measureNode(childNode, depth + 1));
  };

  container.childNodes.forEach((node) => measureNode(node));

  return {
    bones: measuredBones,
    containerSize: {
      width: containerRect.width,
      height: containerRect.height,
    },
  };
}
