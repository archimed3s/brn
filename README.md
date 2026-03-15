# brn

Next.js app for document and category management with a collapsible chat panel.

![Lighthouse audit: Performance, Accessibility, Best Practices, and SEO all at 100](Screenshot%202026-03-15%20at%2005.04.50.png)

## Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript (strict)
- **Lint/Format**: Biome (lint + format, organize imports)
- **Styling**: Tailwind CSS 4, shadcn/ui (base-nova), Base UI primitives, CVA, tw-animate-css
- **Icons**: lucide-react
- **Data**: TanStack Query, React Virtual
- **Build**: React Compiler enabled

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy environment variables and set your backend API URL:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set `API_BASE_URL` (no trailing slash).

3. Run the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `pnpm dev`        | Start development server       |
| `pnpm build`      | Production build               |
| `pnpm start`      | Start production server        |
| `pnpm typecheck`  | TypeScript check (no emit)     |
| `pnpm lint`       | Biome check and fix            |
| `pnpm format`     | Biome format                   |

## Project structure

- **`src/app/`** – App Router routes and API routes
- **`src/components/atoms/`** – Shared UI primitives (Button, Text, Input, etc.)
- **`src/components/molecules/`** – Composed components (chat, categories, strategy)
- **`src/components/organisms/`** – Feature-level components (Sidebar, ChatPanel, CategoriesPanel)
- **`src/hooks/`** – Custom hooks (TanStack Query, etc.)
- **`src/lib/`** – Utilities and API helpers
- **`src/providers/`** – React context providers

Use the `@/*` alias for `./src/*` in imports (e.g. `@/components/atoms`, `@/lib/utils`).

## Conventions

- Prefer React Server Components; add `"use client"` only when needed (hooks, interactivity, Base UI).
- Use **arrow functions** for components, hooks, and utilities.
- Use **`type`** for object shapes and props; no `interface`.
- Components follow Atomic Design: atoms (flat), molecules/organisms in subfolders when there are multiple related files.
