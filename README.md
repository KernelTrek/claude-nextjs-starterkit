# Claude Next Starter Kit

A modern, production-ready Next.js web application starter kit with TypeScript, TailwindCSS v4, shadcn/ui, and Supabase integration.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-38b2ac?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Features](#features) • [Quick Start](#quick-start) • [Project Structure](#project-structure) • [Documentation](#documentation)

</div>

## Features

✨ **Modern Stack**
- **Next.js 15** with App Router for optimal performance
- **React 19** for latest features and improvements
- **TypeScript** with strict type checking enabled
- **TailwindCSS v4** with CSS-first configuration (no config file)

🎨 **Beautiful UI**
- **shadcn/ui** - 9 professionally designed components
- **Radix UI** primitives for accessibility
- **Dark Mode** with next-themes (auto system detection)
- **Responsive Design** - mobile-first with Tailwind breakpoints
- **lucide-react** - beautiful icon library

🔐 **Backend Ready**
- **Supabase Integration** - authentication + database
- **Server/Client Supabase Clients** - proper setup for App Router
- **Middleware** - automatic token refresh on every request
- **Type-safe Auth** - TypeScript types for users and sessions

📦 **Out of the Box**
- Landing page with hero, features grid, and CTA
- Authentication pages (login/signup)
- Protected dashboard with sidebar and stats
- Fully functional dark mode toggle
- Zero console errors

## Quick Start

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/KernelTrek/claude-nextjs-starterkit.git
cd claude-nextjs-starterkit

# Install dependencies
npm install

# Create environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   ├── globals.css             # TailwindCSS v4 + theme variables
│   ├── page.tsx                # Landing page
│   ├── (auth)/                 # Route group for auth pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── dashboard/              # Protected dashboard area
│       ├── layout.tsx          # Dashboard layout with sidebar
│       └── page.tsx            # Dashboard home
│
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── separator.tsx
│   │   ├── dialog.tsx
│   │   └── dropdown-menu.tsx
│   └── layout/                 # Custom layout components
│       ├── header.tsx
│       ├── footer.tsx
│       └── sidebar.tsx
│
├── utils/
│   └── supabase/
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client
│
├── lib/
│   └── utils.ts                # cn() utility
│
├── hooks/
│   └── use-mobile.ts
│
├── types/
│   └── index.ts
│
├── middleware.ts               # Token refresh middleware
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts          # (doesn't exist - CSS-first)
└── components.json             # shadcn/ui config
```

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero section and features |
| `/login` | User login form |
| `/signup` | User registration form |
| `/dashboard` | Protected dashboard with stats |

## Configuration

### Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from your [Supabase Dashboard](https://app.supabase.com/).

### TailwindCSS v4

Configuration is in `app/globals.css` using `@theme inline`. No `tailwind.config.js` file needed.

Theme colors:
- `background` / `foreground` - Page background and text
- `primary` / `primary-foreground` - Main buttons and links
- `secondary` / `secondary-foreground` - Secondary actions
- `muted` / `muted-foreground` - Subtle text
- `accent` / `accent-foreground` - Interactive states
- `destructive` / `destructive-foreground` - Errors

### Dark Mode

Dark mode is automatically enabled with system preference detection. Toggle with the sun/moon button in the header.

## Styling

- **Tailwind Classes**: Use standard Tailwind classes (e.g., `p-4 bg-primary`)
- **Conditional Classes**: Use `cn()` function from `@/lib/utils`
- **Responsive**: Use breakpoints `sm:`, `md:`, `lg:`, `xl:` (mobile-first)
- **Dark Mode**: Use `dark:` prefix or rely on CSS variables

Example:
```tsx
<button className={cn(
  "p-4 rounded-lg",
  "bg-primary text-primary-foreground hover:bg-primary/90",
  "dark:bg-slate-900 dark:text-white"
)}>
  Click me
</button>
```

## Development Guide

See [CLAUDE.md](./CLAUDE.md) for detailed architecture, patterns, and common development tasks.

Key sections:
- **Quick Start Commands** - npm scripts
- **Architecture** - App Router structure and design decisions
- **Component Patterns** - How to add pages, components, and use Supabase
- **Important Notes** - TailwindCSS v4, middleware, shadcn/ui

## Adding UI Components

shadcn/ui components can be added using:

```bash
npx shadcn@latest add <component-name>
```

Available components: [ui.shadcn.com](https://ui.shadcn.com/docs/components)

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Other Platforms

The app runs on any Node.js 20+ environment:

```bash
npm run build
npm start
```

## Performance

- **Turbopack** - Default bundler (fast refresh in dev)
- **Code Splitting** - Automatic by Next.js
- **Image Optimization** - Built-in next/image support
- **Font Optimization** - next/font ready

## Browser Support

- Chrome (latest)
- Edge (latest)
- Firefox (latest)
- Safari (latest)

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x | React framework |
| React | 19.x | UI library |
| TypeScript | 5.6+ | Type safety |
| TailwindCSS | 4.3+ | Styling |
| Radix UI | Latest | Accessible components |
| Supabase | Latest | Backend & auth |
| next-themes | 0.4+ | Dark mode |
| lucide-react | Latest | Icons |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Open an [Issue](https://github.com/KernelTrek/claude-nextjs-starterkit/issues)
- Check [CLAUDE.md](./CLAUDE.md) for architecture details
- Review the [official Next.js docs](https://nextjs.org/docs)

## Credits

Built with ❤️ by the Claude Code team.

Inspired by best practices from:
- [Next.js Documentation](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)

---

<div align="center">

Made with 💙 for developers who want to ship fast.

**[Live Demo](#)** • **[GitHub](https://github.com/KernelTrek/claude-nextjs-starterkit)** • **[Issues](https://github.com/KernelTrek/claude-nextjs-starterkit/issues)**

</div>
