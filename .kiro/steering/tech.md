---
inclusion: always
---

## You are a multi-functional developer, who knows a lot about React, Next.js and Node.js.

# Next.js Project Technical Specifications

## Technology Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Runtime**: Node.js >=20.11.0
- **Package Manager**: Bun (with bun.lockb)
- **Language**: TypeScript 5.9.2
- **UI Library**: React 19.1.1
- **Styling**: Tailwind CSS 4.1.11
- **Testing**: Bun Test with Testing Library
- **DOM Environment**: Happy-DOM for testing
- **Icons**: Lucide React & React Icons
- **UI Components**: Radix UI primitives

## Project Structure

Follow this established architecture pattern for all new files and features:

```
src/
├── app/                    # Next.js App Router
│   ├── fale-conosco/      # Contact page route
│   ├── sobre-nos/         # About page route
│   ├── api/               # API routes (when needed)
│   ├── actions.ts         # Server actions
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── analytics/         # Analytics components
│   ├── button/            # Button components
│   ├── footer/            # Footer components
│   ├── headers/           # Header components
│   ├── hero/              # Hero section components
│   ├── redirects/         # Redirect components
│   ├── sections/          # Page section components
│   │   ├── orcament/      # Budget/quote specific components
│   │   │   └── __tests__/ # Component tests
│   │   └── __tests__/     # Section tests
│   └── ui/                # Reusable UI components (shadcn/ui)
├── hooks/                 # Custom React hooks
│   └── __tests__/         # Hook tests
├── lib/                   # Utility functions and configurations
├── test/                  # Test utilities and setup
└── types/                 # TypeScript type definitions
```

## Testing Architecture

### Test Organization

- Place tests in `__tests__/` directories next to the code they test
- Use descriptive test file names: `ComponentName.test.ts`
- Test setup configured in `test-setup.ts` with Happy-DOM

### Testing Stack

- **Test Runner**: Bun Test
- **Testing Library**: @testing-library/react 16.3.0
- **DOM Environment**: Happy-DOM 18.0.1
- **Assertions**: @testing-library/jest-dom 6.7.0
- **User Interactions**: @testing-library/user-event 14.6.1

### Test Commands

```bash
bun test          # Run all tests
bun test --watch  # Run tests in watch mode
```

## Architecture Conventions

### File Organization

- Place tests in `__tests__/` folders within each feature directory
- Reusable UI components in `src/components/ui/` (shadcn/ui pattern)
- Feature-specific components in organized folders (e.g., `sections/orcament/`)
- Custom hooks in `src/hooks/` with descriptive names
- Server actions in `src/app/actions.ts`

### Naming Conventions

- Components: PascalCase (e.g., `Button.tsx`, `OrcamentForm.tsx`)
- Hooks: camelCase starting with "use" (e.g., `useFileUpload.ts`)
- Test files: `ComponentName.test.ts` or `hookName.test.ts`
- Types: Place in `types/` directory with descriptive filenames

### Code Style

- Use TypeScript for all new files
- Prefer named exports over default exports for components
- Keep components focused and single-responsibility
- Use Tailwind CSS for styling with class-variance-authority for variants
- Follow Next.js App Router conventions for pages and layouts
- Use Server Actions for form handling and server-side logic

### Package Management

- Use Bun as the primary package manager
- Lock file: `bun.lockb`
- Configuration: `bunfig.toml` for test setup

### API Routes

- Place API routes in `src/app/api/` when needed
- Use `route.ts` files for API endpoints
- Prefer Server Actions over API routes for form handling
