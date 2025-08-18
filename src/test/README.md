# Testing Setup

This project uses Vitest for testing React components.

## Installation

To set up testing, install the required dependencies:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

## Running Tests

Add the following script to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:ui": "vitest --ui"
  }
}
```

Then run tests with:

```bash
npm test
```

## Test Structure

- Test files should be placed in `__tests__` directories next to the components they test
- Use the `.test.tsx` extension for React component tests
- Use the `.test.ts` extension for utility function tests

## Configuration

- `vitest.config.ts` - Main Vitest configuration
- `src/test/setup.ts` - Test setup file for global test configuration
