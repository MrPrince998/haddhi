const STYLE_ID = "haddhi-styles";
const SAFE_LENGTH_PATTERN =
  /^-?(?:\d+|\d*\.\d+)(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)?$/i;
const SAFE_COLOR_PATTERN =
  /^(?:#[\da-f]{3,8}|rgba?\([\d\s,%.]+\)|hsla?\([\d\s,%.degturnrad]+\)|[a-z]+|transparent|currentColor)$/i;

function sanitizeCssValue(value: string, pattern: RegExp, fallback: string) {
  const trimmed = value.trim();

  if (!trimmed || /[;{}]/.test(trimmed)) return fallback;

  return pattern.test(trimmed) ? trimmed : fallback;
}

export function sanitizeCssColor(value: string | undefined, fallback: string) {
  if (!value) return fallback;

  return sanitizeCssValue(value, SAFE_COLOR_PATTERN, fallback);
}

export function sanitizeCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? `${value}px` : fallback;
  }

  return sanitizeCssValue(value, SAFE_LENGTH_PATTERN, fallback);
}

export function sanitizeCssDuration(value: number | undefined, fallback: number) {
  if (value === undefined) return `${fallback}s`;

  return Number.isFinite(value) && value > 0 ? `${value}s` : `${fallback}s`;
}

function getHaddhiStyles() {
  return `
        .haddhi-hidden {
          visibility: hidden;
          pointer-events: none;
        }

        .haddhi-skeleton {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .haddhi-skeleton--debug {
          background: rgba(59, 130, 246, 0.08);
        }

        .haddhi-bone {
          position: absolute;
          background: var(--haddhi-base-color);
        }

        .haddhi-skeleton--debug .haddhi-bone {
          outline: 1px solid rgba(37, 99, 235, 0.85);
          outline-offset: 1px;
        }

        .haddhi-preset {
          position: absolute;
          inset: 0;
          box-sizing: border-box;
        }

        .haddhi-preset .haddhi-bone {
          position: relative;
        }

        .haddhi-preset--text,
        .haddhi-preset--card,
        .haddhi-preset--blog-card,
        .haddhi-preset--article,
        .haddhi-preset--product {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.625rem;
        }

        .haddhi-preset--card {
          justify-content: flex-start;
          padding: 1rem;
          border-radius: var(--haddhi-card-radius);
        }

        .haddhi-preset--blog-card,
        .haddhi-preset--article,
        .haddhi-preset--product {
          justify-content: flex-start;
          padding: 1rem;
        }

        .haddhi-preset--media-lines {
          display: grid;
          column-gap: 0.875rem;
          row-gap: 0.625rem;
          align-content: center;
          padding: 0.75rem 0;
        }

        .haddhi-preset--profile,
        .haddhi-preset--comment {
          grid-template-columns: 4rem minmax(0, 1fr);
          grid-template-rows: repeat(3, max-content);
        }

        .haddhi-preset--list-item {
          grid-template-columns: 2.5rem minmax(0, 1fr);
          grid-template-rows: repeat(2, max-content);
          padding: 0.5rem 0;
        }

        .haddhi-preset--media-lines .haddhi-avatar {
          grid-row: 1 / -1;
        }

        .haddhi-line {
          height: 0.875rem;
          border-radius: var(--haddhi-line-radius);
        }

        .haddhi-line--small {
          height: 0.625rem;
        }

        .haddhi-line--large {
          height: 1.125rem;
        }

        .haddhi-preset--list-item .haddhi-line[style*="width: 0"] {
          display: none;
        }

        .haddhi-card-media,
        .haddhi-preset-media {
          width: 100%;
          height: 44%;
          min-height: 3rem;
          border-radius: var(--haddhi-media-radius);
          margin-bottom: 0.25rem;
        }

        .haddhi-action {
          width: 44%;
          height: 2.25rem;
          border-radius: var(--haddhi-line-radius);
          margin-top: 0.25rem;
        }

        .haddhi-preset--avatar {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .haddhi-avatar {
          width: min(100%, 4rem);
          aspect-ratio: 1;
          border-radius: 999px;
        }

        .haddhi-avatar--profile,
        .haddhi-avatar--comment {
          width: 4rem;
        }

        .haddhi-avatar--list-item {
          width: 2.5rem;
        }

        .haddhi-bone--shimmer {
          background: linear-gradient(
            90deg,
            var(--haddhi-base-color) 25%,
            var(--haddhi-highlight-color) 37%,
            var(--haddhi-base-color) 63%
          );
          background-size: 400% 100%;
          animation: haddhi-shimmer var(--haddhi-duration) ease infinite;
        }

        .haddhi-bone--pulse {
          animation: haddhi-pulse var(--haddhi-duration) ease-in-out infinite;
        }

        .haddhi-bone--wave {
          overflow: hidden;
        }

        .haddhi-bone--wave::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            var(--haddhi-highlight-color),
            transparent
          );
          transform: translateX(-100%);
          animation: haddhi-wave var(--haddhi-duration) ease infinite;
        }

        @keyframes haddhi-shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        @keyframes haddhi-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.55;
          }
        }

        @keyframes haddhi-wave {
          100% {
            transform: translateX(100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .haddhi-bone,
          .haddhi-bone::after {
            animation: none;
          }
        }
      `;
}

export function ensureHaddhiStyles(ownerDocument: Document) {
  if (ownerDocument.getElementById(STYLE_ID)) return;

  const style = ownerDocument.createElement("style");
  style.id = STYLE_ID;
  style.textContent = getHaddhiStyles();
  ownerDocument.head.appendChild(style);
}
