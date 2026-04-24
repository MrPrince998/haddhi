"use client";

import {
  Component,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  areBonesEqual,
  getCachedSkeletonLayout,
  getSkeletonCacheKey,
  rememberSkeletonLayout,
} from "./cache.js";
import { measureSkeleton, shouldIgnoreElement } from "./measure.js";
import { haddhiPresets } from "./presets.js";
import {
  ensureHaddhiStyles,
  sanitizeCssColor,
  sanitizeCssDuration,
  sanitizeCssLength,
} from "./styles.js";
import type { Bone, HaddhiProps, HaddhiStyle, HaddhiWrapper } from "./types.js";

export { haddhiPresets } from "./presets.js";
export type {
  HaddhiAnimation,
  HaddhiPreset,
  HaddhiPresetDefinition,
  HaddhiProps,
  HaddhiVariant,
  HaddhiWrapper,
} from "./types.js";

type HaddhiLoadingViewProps = {
  children: HaddhiProps["children"];
  className?: HaddhiProps["className"];
  wrapper?: HaddhiWrapper;
  preset?: HaddhiProps["preset"];
  variant?: HaddhiProps["variant"];
  animation?: HaddhiProps["animation"];
  baseColor?: HaddhiProps["baseColor"];
  highlightColor?: HaddhiProps["highlightColor"];
  speed?: HaddhiProps["speed"];
  duration?: HaddhiProps["duration"];
  delay?: HaddhiProps["delay"];
  radius?: HaddhiProps["radius"];
  ariaLabel?: HaddhiProps["ariaLabel"];
  debug?: HaddhiProps["debug"];
  cache?: HaddhiProps["cache"];
  cacheKey?: HaddhiProps["cacheKey"];
  maxDepth?: HaddhiProps["maxDepth"];
};

function useDelayedSkeleton(loading: boolean, delay: number) {
  const [showSkeleton, setShowSkeleton] = useState(delay === 0);

  useEffect(() => {
    if (!loading) {
      setShowSkeleton(false);
      return;
    }

    if (delay <= 0) {
      setShowSkeleton(true);
      return;
    }

    setShowSkeleton(false);
    const timer = window.setTimeout(() => {
      setShowSkeleton(true);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, loading]);

  return showSkeleton;
}

const DISALLOWED_TAGS = ["script", "iframe", "object", "embed"];

function isSafeWrapper(wrapper: any) {
  if (typeof wrapper === "string") {
    return !DISALLOWED_TAGS.includes(wrapper);
  }
  return true;
}

function HaddhiLoadingView({
  children,
  className = "",
  wrapper = "div",
  preset,
  variant = "auto",
  animation = "shimmer",
  baseColor = "#e5e7eb",
  highlightColor = "#f3f4f6",
  speed,
  duration = 1.4,
  delay = 0,
  radius,
  ariaLabel = "Loading content",
  debug = false,
  cache = true,
  cacheKey,
  maxDepth = 8,
}: HaddhiLoadingViewProps) {
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [bones, setBones] = useState<Bone[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const showSkeleton = useDelayedSkeleton(true, delay);

  const presetDefinition = preset ? haddhiPresets[preset] : undefined;
  const isAutoVariant = !presetDefinition && variant === "auto";

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    ensureHaddhiStyles(document);
  }, []);

  useLayoutEffect(() => {
    if (!showSkeleton || !isAutoVariant || !hiddenRef.current) return;

    const container = hiddenRef.current;
    const ownerWindow = container.ownerDocument.defaultView ?? window;
    const layoutCacheKey = cache
      ? getSkeletonCacheKey(
          container,
          ownerWindow,
          shouldIgnoreElement,
          cacheKey,
          maxDepth,
        )
      : null;
    const cachedLayout = layoutCacheKey
      ? getCachedSkeletonLayout(layoutCacheKey)
      : undefined;
    const observedElements = new Set<HTMLElement>();
    let animationFrame = 0;
    let resizeTimer = 0;
    let mounted = true;

    if (cachedLayout) {
      setBones(cachedLayout.bones);
      setContainerSize(cachedLayout.containerSize);
    }

    const resizeObserver =
      typeof ownerWindow.ResizeObserver === "undefined"
        ? null
        : new ownerWindow.ResizeObserver(() => {
            scheduleMeasure();
          });

    const observeElement = (el: HTMLElement) => {
      if (!resizeObserver || observedElements.has(el)) return;

      observedElements.add(el);
      resizeObserver.observe(el);
    };

    const measure = () => {
      if (!mounted) return;

      const measuredLayout = measureSkeleton(
        container,
        ownerWindow,
        observeElement,
        maxDepth,
      );

      if (layoutCacheKey) {
        rememberSkeletonLayout(layoutCacheKey, measuredLayout);
      }

      setBones((currentBones) =>
        areBonesEqual(currentBones, measuredLayout.bones)
          ? currentBones
          : measuredLayout.bones,
      );
      setContainerSize((currentSize) => {
        const nextSize = measuredLayout.containerSize;

        return currentSize.width === nextSize.width &&
          currentSize.height === nextSize.height
          ? currentSize
          : nextSize;
      });
    };

    const scheduleMeasure = () => {
      if (!mounted) return;

      ownerWindow.cancelAnimationFrame(animationFrame);
      animationFrame = ownerWindow.requestAnimationFrame(measure);
    };

    const scheduleWindowResizeMeasure = () => {
      if (!mounted) return;

      ownerWindow.clearTimeout(resizeTimer);
      resizeTimer = ownerWindow.setTimeout(scheduleMeasure, 80);
    };

    measure();

    const fontSet = container.ownerDocument.fonts;
    const scheduleFontMeasure = () => scheduleWindowResizeMeasure();

    fontSet?.ready?.then(scheduleFontMeasure).catch(() => {
      // Font loading failures should not break skeleton rendering.
    });
    fontSet?.addEventListener?.("loadingdone", scheduleFontMeasure);
    ownerWindow.addEventListener("resize", scheduleWindowResizeMeasure, {
      passive: true,
    });

    return () => {
      mounted = false;
      ownerWindow.clearTimeout(resizeTimer);
      ownerWindow.cancelAnimationFrame(animationFrame);
      ownerWindow.removeEventListener("resize", scheduleWindowResizeMeasure);
      fontSet?.removeEventListener?.("loadingdone", scheduleFontMeasure);
      resizeObserver?.disconnect();
    };
  }, [showSkeleton, isAutoVariant, children, cache, cacheKey, maxDepth]);

  const skeletonStyle: HaddhiStyle = useMemo(
    () => ({
      width: isAutoVariant ? containerSize.width || "100%" : "100%",
      height: isAutoVariant ? containerSize.height || 20 : "100%",
      "--haddhi-base-color": sanitizeCssColor(baseColor, "#e5e7eb"),
      "--haddhi-highlight-color": sanitizeCssColor(highlightColor, "#f3f4f6"),
      "--haddhi-duration": sanitizeCssDuration(speed ?? duration, 1.4),
      "--haddhi-card-radius": sanitizeCssLength(radius, "0.75rem"),
      "--haddhi-line-radius": sanitizeCssLength(radius, "999px"),
      "--haddhi-media-radius": sanitizeCssLength(radius, "0.5rem"),
    }),
    [
      baseColor,
      containerSize.height,
      containerSize.width,
      duration,
      highlightColor,
      isAutoVariant,
      radius,
      speed,
    ],
  );
  const Wrapper = isSafeWrapper(wrapper) ? wrapper : "div";

  const renderBone = useMemo(
    () =>
      (key: string | number, style?: CSSProperties, boneClassName = "") => (
        <div
          key={key}
          className={`haddhi-bone haddhi-bone--${animation} ${boneClassName}`.trim()}
          style={style}
        />
      ),
    [animation],
  );

  const skeletonContent = useMemo(() => {
    if (presetDefinition) {
      return (
        <div className={`haddhi-preset ${presetDefinition.className}`}>
          {presetDefinition.blocks.map((block) =>
            renderBone(block.key, block.style, block.className),
          )}
        </div>
      );
    }

    switch (variant) {
      case "text":
        return (
          <div className="haddhi-preset haddhi-preset--text">
            {[92, 78, 64].map((width, index) =>
              renderBone(index, { width: `${width}%` }, "haddhi-line"),
            )}
          </div>
        );
      case "card":
        return (
          <div className="haddhi-preset haddhi-preset--card">
            {renderBone("media", undefined, "haddhi-card-media")}
            {[86, 72, 48].map((width, index) =>
              renderBone(index, { width: `${width}%` }, "haddhi-line"),
            )}
          </div>
        );
      case "avatar":
        return (
          <div className="haddhi-preset haddhi-preset--avatar">
            {renderBone("avatar", undefined, "haddhi-avatar")}
          </div>
        );
      case "auto":
        return bones.map((bone, index) =>
          renderBone(index, {
            left: bone.x,
            top: bone.y,
            width: bone.width,
            height: bone.height,
            borderRadius: radius ?? bone.radius,
          }),
        );
    }
  }, [bones, presetDefinition, radius, renderBone, variant]);

  return (
    <Wrapper className={className} style={{ position: "relative" }}>
      {isAutoVariant && (
        <div ref={hiddenRef} className="haddhi-hidden" aria-hidden="true">
          {children}
        </div>
      )}

      {showSkeleton && (
        <div
          className={`haddhi-skeleton${debug ? " haddhi-skeleton--debug" : ""}`}
          aria-busy="true"
          aria-label={ariaLabel}
          role="status"
          style={skeletonStyle}
        >
          {skeletonContent}
        </div>
      )}
    </Wrapper>
  );
}

function HaddhiSuspenseView(props: Omit<HaddhiProps, "loading">) {
  const fallbackVariant =
    props.preset || !props.variant || props.variant === "auto"
      ? "text"
      : props.variant;

  return (
    <Suspense
      fallback={
        <HaddhiLoadingView
          {...props}
          variant={fallbackVariant}
          cache={false}
          delay={0}
        />
      }
    >
      {props.children}
    </Suspense>
  );
}

type HaddhiErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
};

type HaddhiErrorBoundaryState = {
  error: Error | null;
};

class HaddhiErrorBoundary extends Component<
  HaddhiErrorBoundaryProps,
  HaddhiErrorBoundaryState
> {
  state: HaddhiErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function Haddhi({
  loading,
  children,
  suspense = false,
  catchErrors = true,
  errorFallback,
  onError,
  ...props
}: HaddhiProps): ReactElement {
  const rendered =
    suspense && loading === undefined ? (
      <HaddhiSuspenseView {...props}>{children}</HaddhiSuspenseView>
    ) : loading ? (
      <HaddhiLoadingView {...props}>{children}</HaddhiLoadingView>
    ) : (
      <>{children}</>
    );

  if (!catchErrors) {
    return <>{rendered}</>;
  }

  const fallback = errorFallback ?? (
    <HaddhiLoadingView
      {...props}
      variant={
        props.preset || props.variant !== "auto" ? props.variant : "text"
      }
      cache={false}
      delay={0}
    >
      <span />
    </HaddhiLoadingView>
  );

  return (
    <HaddhiErrorBoundary fallback={fallback} onError={onError}>
      {rendered}
    </HaddhiErrorBoundary>
  );
}
