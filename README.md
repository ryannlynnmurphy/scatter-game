# Scatter Game

**Narrative game development tools built by someone who writes for the stage. Story first, mechanics second.**

---

## About

SCOUTS — based on my play of the same name — was built with this toolkit. The experience of adapting a stage play into an interactive narrative made one thing clear: existing game engines are built for mechanics first. The story gets plugged in later. Scatter Game inverts that.

The Ink scripting language sits at the center. Everything else — characters, assets, audio, visuals — orbits the text. The result is a development environment that feels more like a writer's room than a game engine.

Scatter Game is part of the Scatter Studio — a suite of creative tools built by Ryann Lynn Murphy and Scatter AI LLC.

---

## Features

- Ink script editor panel with monospace font
- Live preview panel: renders story text and player choices
- Character and asset manager sidebar
- Bottom panel placeholder for dialogue tree visualization
- inkjs runtime for compiled Ink story playback
- Pixi.js for visual rendering (Phase 2)
- Howler.js for audio management (Phase 2)
- Scatter design tokens throughout

---

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- scatter-core (Scatter design system)
- inkjs — Ink narrative scripting runtime
- Pixi.js — 2D WebGL renderer
- Howler.js — cross-browser audio

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To use the full Ink runtime, compile your `.ink` files to `.ink.json` using Inklecate and pass the JSON string to `loadStory()` in `lib/ink-engine.ts`.

---

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for data models, component interaction, and integration roadmap.

---

## Scatter Ecosystem

- [scatter-core](https://github.com/ryannlynnmurphy/scatter-core) — Design system
- [scatter-write](https://github.com/ryannlynnmurphy/scatter-write) — Writing environment
- [scatter-stream](https://github.com/ryannlynnmurphy/scatter-stream) — Stream production
- [scatter-draft](https://github.com/ryannlynnmurphy/scatter-draft) — Script drafting
- [scatter-academy](https://github.com/ryannlynnmurphy/scatter-academy) — Education platform

---

## Ryann Lynn Murphy

Playwright, producer, and technologist. Founder of Scatter Studio and Scatter AI LLC.
[ryannlynnmurphy.com](https://ryannlynnmurphy.com)

---

<!-- Original Next.js bootstrap note below -->

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
