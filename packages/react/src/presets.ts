import type { HaddhiPreset, HaddhiPresetDefinition } from "./types.js";

function createMediaLinesPreset(
  className: string,
  mediaClassName: string,
  lineWidths: [string, string, string],
): HaddhiPresetDefinition {
  return {
    className: `haddhi-preset--media-lines ${className}`,
    blocks: [
      { key: "media", className: mediaClassName },
      { key: "line-1", className: "haddhi-line", style: { width: lineWidths[0] } },
      {
        key: "line-2",
        className: "haddhi-line haddhi-line--small",
        style: { width: lineWidths[1] },
      },
      {
        key: "line-3",
        className: "haddhi-line haddhi-line--small",
        style: { width: lineWidths[2] },
      },
    ],
  };
}

export const haddhiPresets: Record<HaddhiPreset, HaddhiPresetDefinition> = {
  "blog-card": {
    className: "haddhi-preset--blog-card",
    blocks: [
      { key: "media", className: "haddhi-preset-media" },
      { key: "title-1", className: "haddhi-line", style: { width: "86%" } },
      { key: "title-2", className: "haddhi-line", style: { width: "64%" } },
      {
        key: "meta",
        className: "haddhi-line haddhi-line--small",
        style: { width: "38%" },
      },
    ],
  },
  profile: createMediaLinesPreset(
    "haddhi-preset--profile",
    "haddhi-avatar haddhi-avatar--profile",
    ["72%", "92%", "58%"],
  ),
  article: {
    className: "haddhi-preset--article",
    blocks: [
      {
        key: "eyebrow",
        className: "haddhi-line haddhi-line--small",
        style: { width: "28%" },
      },
      {
        key: "headline-1",
        className: "haddhi-line haddhi-line--large",
        style: { width: "94%" },
      },
      {
        key: "headline-2",
        className: "haddhi-line haddhi-line--large",
        style: { width: "72%" },
      },
      { key: "body-1", className: "haddhi-line", style: { width: "100%" } },
      { key: "body-2", className: "haddhi-line", style: { width: "96%" } },
      {
        key: "body-3",
        className: "haddhi-line",
        style: { width: "82%" },
      },
    ],
  },
  product: {
    className: "haddhi-preset--product",
    blocks: [
      { key: "image", className: "haddhi-preset-media" },
      { key: "name", className: "haddhi-line", style: { width: "78%" } },
      {
        key: "price",
        className: "haddhi-line haddhi-line--small",
        style: { width: "32%" },
      },
      { key: "action", className: "haddhi-action" },
    ],
  },
  comment: createMediaLinesPreset(
    "haddhi-preset--comment",
    "haddhi-avatar haddhi-avatar--comment",
    ["42%", "100%", "76%"],
  ),
  "list-item": createMediaLinesPreset(
    "haddhi-preset--list-item",
    "haddhi-avatar haddhi-avatar--list-item",
    ["68%", "48%", "0"],
  ),
};
