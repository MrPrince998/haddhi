import type { CSSProperties, ErrorInfo, JSX, ReactNode } from "react";

export type Bone = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number | string;
};

export type CachedLayout = {
  bones: Bone[];
  containerSize: {
    width: number;
    height: number;
  };
};

export type PresetBlock = {
  key: string;
  className: string;
  style?: CSSProperties;
};

export type HaddhiPresetDefinition = {
  className: string;
  blocks: PresetBlock[];
};

export type HaddhiVariant = "auto" | "text" | "card" | "avatar";
export type HaddhiAnimation = "shimmer" | "pulse" | "wave" | "static";
export type HaddhiPreset =
  | "blog-card"
  | "profile"
  | "article"
  | "product"
  | "comment"
  | "list-item";
export type HaddhiWrapper =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<any>;

export type HaddhiProps = {
  loading?: boolean;
  children: ReactNode;
  className?: string;
  wrapper?: HaddhiWrapper;
  preset?: HaddhiPreset;
  variant?: HaddhiVariant;
  animation?: HaddhiAnimation;
  baseColor?: string;
  highlightColor?: string;
  speed?: number;
  duration?: number;
  delay?: number;
  radius?: number | string;
  ariaLabel?: string;
  debug?: boolean;
  cache?: boolean;
  cacheKey?: string;
  maxDepth?: number;
  suspense?: boolean;
  catchErrors?: boolean;
  errorFallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
};

export type HaddhiStyle = CSSProperties & {
  "--haddhi-base-color": string;
  "--haddhi-highlight-color": string;
  "--haddhi-duration": string;
  "--haddhi-card-radius": string;
  "--haddhi-line-radius": string;
  "--haddhi-media-radius": string;
};
