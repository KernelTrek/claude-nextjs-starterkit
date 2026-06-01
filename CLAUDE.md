# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
npm run dev      # Start dev server (localhost:3000, Turbopack by default)
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint with strict mode (max-warnings 0)
```

## Project Overview

**Claude Next Starter Kit** is a modern, production-ready Next.js web application featuring:
- Next.js 15 with App Router
- React 19
- TypeScript (strict mode)
- TailwindCSS v4 (CSS-first, no config file)
- shadcn/ui components (9 core components)
- Supabase for authentication & database
- next-themes for dark mode
- lucide-react for icons

## Architecture

### App Router Structure

```
app/
├── layout.tsx              # Root layout with ThemeProvider, Header, Footer
├── globals.css             # TailwindCSS v4 + shadcn/ui CSS variables
├── page.tsx                # Landing page (Hero + Features + CTA)
├── (auth)/                 # Route group for auth pages (no layout wrapper)
│   ├── login/page.tsx      # Login form
│   └── signup/page.tsx     # Signup form
└── dashboard/              # Protected dashboard area
    ├── layout.tsx          # Dashboard layout with sidebar
    └── page.tsx            # Dashboard home with stats cards
```

**Route Groups Explanation:**
- `(auth)` — Grouped routes that don't add a layout; `/login` and `/signup` inherit from root layout only
- `dashboard` — Has its own layout with sidebar; wraps dashboard pages

### Key Architectural Decisions

**TailwindCSS v4 - CSS-First Configuration:**
- NO `tailwind.config.js` file exists or is needed
- All theme configuration is in `app/globals.css` using `@theme inline`
- CSS variables (--color-primary, --color-background, etc.) are defined in CSS and mapped to Tailwind utilities
- `@import "tailwindcss";` loads entire framework with one line
- See globals.css for light/dark mode color definitions

**Middleware for Supabase:**
- `middleware.ts` runs on every request to refresh auth tokens
- Handles cookie management for session persistence
- Uses `@supabase/ssr` package (required for App Router)
- Matcher pattern excludes static assets, images, and Next.js internals

**Theme System (next-themes):**
- ThemeProvider wrapped around children in root layout
- Dark mode toggle in header (button with Sun/Moon icons)
- Toggles `dark` class on `<html>` element
- CSS respects system preference by default (`defaultTheme="system"`)

**shadcn/ui Components:**
- 9 UI components manually written in `components/ui/`
- NOT generated from CLI (added during initialization)
- Uses Radix UI primitives + CVA (class-variance-authority)
- `cn()` utility in `lib/utils.ts` combines clsx + tailwind-merge
- `components.json` config points to empty tailwind config (v4 format)

### Component Structure

```
components/
├── ui/                     # shadcn/ui components
│   ├── button.tsx          # Base button with variants (default, destructive, outline, etc.)
│   ├── card.tsx            # Card container + CardHeader, CardTitle, CardContent, CardFooter
│   ├── input.tsx
│   ├── label.tsx
│   ├── badge.tsx
│   ├── avatar.tsx          # With fallback
│   ├── separator.tsx
│   ├── dialog.tsx          # Modal with overlay
│   └── dropdown-menu.tsx
└── layout/                 # Custom layout components
    ├── header.tsx          # Top navigation (logo, nav, dark mode toggle, sign in button)
    ├── footer.tsx          # Footer with links
    └── sidebar.tsx         # Dashboard sidebar with route-based active states
```

### Utilities & Types

- `lib/utils.ts` — `cn()` function (combines clsx + tailwind-merge)
- `utils/supabase/client.ts` — Browser client for "use client" components
- `utils/supabase/server.ts` — Server client for server components + route handlers (async)
- `hooks/use-mobile.ts` — Responsive hook (checks window.innerWidth < 768)
- `types/index.ts` — Shared TypeScript types (User, AuthSession, ApiResponse)

## Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**`NEXT_PUBLIC_` prefix** = Exposed to browser. Never put secrets here; use server-only env vars for that.

Middleware will throw a 500 error if these are missing. For testing, any placeholder values suffice.

## Development Patterns

### Adding a New Page

1. Create route in `app/path/page.tsx`
2. Wrap in route group if needed: `app/(group)/path/page.tsx`
3. Use server components by default; add `"use client"` only for interactivity
4. Import layout components (Header, Footer) are injected from root layout

**Example: New page at `/docs`**
```tsx
export default function DocsPage() {
  return <h1>Documentation</h1>
}
```

### Adding a New UI Component

1. Create new file in `components/ui/new-component.tsx`
2. Wrap with `"use client"` if using React hooks
3. Export from component; import in pages
4. Use `cn()` for conditional classes

**Pattern:**
```tsx
"use client"
import { cn } from "@/lib/utils"

export function MyComponent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("base-classes", className)} {...props} />
}
```

### Server vs Client Components

- **Default: Server Components** (no "use client")
  - Fetch data server-side
  - Access env vars directly
  - Smaller bundle
- **Use "use client" for:**
  - State (useState, useReducer)
  - Effects (useEffect)
  - Context consumers
  - Event handlers (onClick, onChange)

### Styling

- Use Tailwind classes directly (e.g., `className="p-4 bg-primary text-white"`)
- For conditional styles, use `cn()`: `cn("base", isDark && "dark:bg-slate-900")`
- Responsive: `sm:`, `md:`, `lg:` prefixes (mobile-first)
- Dark mode: `.dark` class on `<html>` + `dark:` prefixes

**Color tokens** (from globals.css):
- `bg-background`, `text-foreground` (page background/text)
- `bg-primary`, `text-primary-foreground` (buttons, high-emphasis)
- `bg-secondary`, `text-secondary-foreground` (lower emphasis)
- `bg-muted`, `text-muted-foreground` (subtle text)
- `bg-accent`, `text-accent-foreground` (interactive states)
- `bg-destructive`, `text-destructive-foreground` (errors)

### Supabase Integration

**Server Component (Server Action or Route Handler):**
```tsx
import { createClient } from "@/utils/supabase/server"

export default async function MyComponent() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("table").select()
  return <div>{data?.length}</div>
}
```

**Client Component:**
```tsx
"use client"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export default function MyComponent() {
  const [data, setData] = useState([])
  useEffect(() => {
    const supabase = createClient()
    supabase.from("table").select().then(({ data }) => setData(data || []))
  }, [])
  return <div>{data.length}</div>
}
```

**Authentication:**
```tsx
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

## TypeScript Configuration

- `strict: true` in tsconfig.json
- Path aliases: `@/*` maps to project root
- Next.js provides build-in types for `next/types`

## Important Notes

1. **No tailwind.config.js** — If you create one, it will be ignored. All config is in `@theme inline` in globals.css.

2. **Middleware token refresh** — Auth tokens are automatically refreshed on every request. No manual token handling needed for protected pages.

3. **Dynamic imports for large components** — Next.js code splitting is automatic, but use `dynamic()` for client-side splits:
   ```tsx
   import dynamic from "next/dynamic"
   const HeavyChart = dynamic(() => import("@/components/charts/heavy"), { loading: () => <p>Loading...</p> })
   ```

4. **Async server functions** — `app/layout.tsx` exports static metadata. If you add dynamic data to root layout (unusual), mark with `export const dynamic = "force-dynamic"`

5. **CSS Module vs Tailwind** — This project uses Tailwind only. No CSS modules (`*.module.css`) in current setup.

6. **Adding new shadcn/ui components** — Run:
   ```bash
   npx shadcn@latest add <component-name>
   ```
   Or manually copy from [ui.shadcn.com](https://ui.shadcn.com)

## Common Tasks

**Run single file linter check:**
```bash
npx eslint ./app/page.tsx
```

**Type check only (no emit):**
```bash
npx tsc --noEmit
```

**Build and test production:**
```bash
npm run build && npm start
```

**Debug middleware issues:**
- Middleware logs appear in dev server console
- Check `.env.local` has valid Supabase keys
- Invalid env vars throw 500 before reaching pages

## Git & Deployment

- Repo: https://github.com/KernelTrek/claude-nextjs-starterkit
- Branch: `main`
- `.env.local` is in `.gitignore` — never commit secrets
- Ready for Vercel, Netlify, or self-hosted (Node.js 20+)
