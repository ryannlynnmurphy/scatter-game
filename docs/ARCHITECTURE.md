# Scatter Game — Architecture

## Overview

Scatter Game is a Next.js (App Router) narrative game development environment. It centers the Ink scripting language as the primary authoring format. Visual rendering (Pixi.js) and audio (Howler.js) are Phase 2 integrations. The data model and Ink runtime interface are defined in `lib/ink-engine.ts`.

---

## Data Models

### `StoryState`
A snapshot of the narrative at a given moment.
- `text` — array of story lines produced by the last `Continue()` call
- `choices` — available player choices: `{ index, text }`
- `tags` — Ink tags on the current knot (used for triggering assets, music, etc.)
- `canContinue` — boolean; false when choices must be made or story ends

---

## Utility Functions (`lib/ink-engine.ts`)

| Function | Description |
|---|---|
| `loadStory(inkJson)` | Instantiates an `inkjs.Story` from a compiled `.ink.json` string |
| `getStoryState(story)` | Runs `Continue()` until blocked, returns `StoryState` |
| `makeChoice(story, choiceIndex)` | Selects a choice by index, returns new `StoryState` |

The Ink runtime requires compiled `.ink.json` files (produced by Inklecate). The editor panel provides raw `.ink` authoring; a compile step is planned for Phase 2.

---

## UI Component Interaction

```
GamePage (page.tsx)
  ├── Header — project name, Preview Story button
  ├── Ink Script Editor (flex 1)
  │   ├── Section label: INK SCRIPT
  │   └── Textarea (monospace, dark background)
  ├── Story Preview Panel (flex 1)
  │   ├── Section label: STORY PREVIEW
  │   ├── Story text lines
  │   └── Choice buttons
  ├── Character/Asset Sidebar (200px)
  │   ├── Character list
  │   └── Asset list
  └── Dialogue Tree Panel (bottom, 80px)
      └── Placeholder for visual tree (Phase 2)
```

The "Preview Story" button triggers a lightweight line parser for demo display. Full inkjs playback requires compiled `.ink.json` passed to `loadStory()`.

---

## Integration Points

### inkjs Runtime
`loadStory()`, `getStoryState()`, `makeChoice()` in `lib/ink-engine.ts` wrap the inkjs API. The preview panel will call these functions once a compile pipeline is in place.

### Ink Compile Pipeline (Planned Phase 2)
A Next.js API route (`/api/compile`) accepts raw `.ink` source, runs Inklecate (via a bundled binary or WASM port), and returns `.ink.json`. The editor panel calls this on save.

### Pixi.js — Visual Rendering (Planned Phase 2)
A `<canvas>` element rendered by Pixi.js sits behind the story preview. Ink tags (e.g., `# bg: forest`) trigger asset swaps. The `tags` field on `StoryState` is the bridge.

### Howler.js — Audio (Planned Phase 2)
Ink tags (e.g., `# music: campfire`) trigger Howler sound loads and plays. Audio manifest is managed in a separate `lib/audio.ts` module.

### Scatter Schools Integration (Planned Phase 3)
Narrative games authored in Scatter Game can be embedded in Scatter Schools as interactive story lessons.

---

## Design Tokens

| Token     | Value     | Usage              |
|-----------|-----------|--------------------|
| Cream     | #FAF8F5   | Light mode text    |
| Charcoal  | #2D2A26   | Primary background |
| Gold      | #C9A96E   | Accents, labels    |
| Dark BG   | #1A1816   | Panels, sidebars   |
| Border    | #3D3A36   | Dividers           |

---

## Roadmap

- Phase 1 (current): Ink script editor, lightweight preview parser, character/asset sidebar scaffold, inkjs integration in `lib/ink-engine.ts`
- Phase 2: Ink compile pipeline (WASM Inklecate), full inkjs playback, Pixi.js visual layer, Howler.js audio layer, dialogue tree visualization
- Phase 3: Asset upload and management, save/load story projects, Scatter Schools embed mode
- Phase 4: Multiplayer story sessions, branching analytics, Scatter Studio integration
