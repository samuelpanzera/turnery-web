---
inclusion: always
---

## You are a multi-functional developer, who knows a lot about React, next and node.

# Next.js Project Architecture Guidelines

## Project Structure

Follow this established architecture pattern for all new files and features:

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups for auth pages
│   ├── (main)/            # Route groups for main app pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── features/          # Feature-specific components
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout-specific components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── services/              # External service integrations
├── store/                 # State management
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

## Architecture Conventions

### File Organization

- Use route groups `(auth)` and `(main)` to organize app routes logically
- Place reusable UI components in `src/components/ui/`
- Feature-specific components go in `src/components/features/`
- Custom hooks in `src/hooks/` with descriptive names (e.g., `useDebounce.ts`)
- Business logic and external integrations in `src/services/`

### Naming Conventions

- Components: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Hooks: camelCase starting with "use" (e.g., `useUserInfo.ts`)
- Services: camelCase with "Service" suffix (e.g., `paymentService.ts`)
- Types: Place in `src/types/` with descriptive filenames

### Code Style

- Use TypeScript for all new files
- Prefer named exports over default exports for components
- Keep components focused and single-responsibility
- Use Tailwind CSS for styling
- Follow Next.js App Router conventions for pages and layouts

### API Routes

- Place API routes in `src/app/api/`
- Use `route.ts` files for API endpoints
- Follow RESTful conventions where applicable
