It is not a contact toggle, it is a toggle to allow file upload, to simplify the code, if enabled it allows the user to upload files# Design Document

## Overview

This design enhances the OrcamentForm component by implementing a modular architecture that follows SOLID principles. The enhancement makes contact fields mandatory, adds a toggle to enable/disable file upload functionality, includes a parts quantity field, and refactors the existing monolithic component into smaller, focused components for better maintainability and reusability.

## Architecture

### Component Hierarchy

```
OrcamentForm (Main Container)
├── ContactSection
│   └── ContactFields (mandatory)
├── PartsSection
│   └── PartsQuantityField
├── FileUploadSection
│   ├── FileUploadToggle
│   └── FileUpload (conditional)
└── SubmitButton (extracted)
```

### State Management

The form will use React's built-in state management with custom hooks:

- `useFileUploadToggle`: Manages file upload enable/disable state
- `usePartsQuantity`: Manages parts quantity with validation
- `useFileUpload`: Existing file upload state (unchanged)
- Form state continues to use `useFormState` for server actions

## Components and Interfaces

### 1. FileUploadToggle Component

**Purpose**: Manages the toggle for enabling/disabling file upload functionality

```typescript
interface FileUploadToggleProps {
  isFileUploadEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}
```

**Responsibilities**:

- Render toggle checkbox with clear labeling
- Handle toggle state changes
- Provide visual feedback for current state

### 2. ContactFields Component

**Purpose**: Renders mandatory contact input fields

```typescript
interface ContactFieldsProps {
  // No props needed as fields are always required
}
```

**Responsibilities**:

- Render name, email, and phone input fields (all mandatory)
- Apply required validation to all fields
- Display required indicators (\*) on all fields
- Handle field validation and error display

### 3. PartsQuantityField Component

**Purpose**: Handles parts quantity input with validation

```typescript
interface PartsQuantityFieldProps {
  defaultValue?: number;
  onChange?: (quantity: number) => void;
}
```

**Responsibilities**:

- Render numeric input for parts quantity
- Validate positive integer input
- Default to 1 if empty or invalid
- Provide clear labeling and help text

### 4. SubmitButton Component (Extracted)

**Purpose**: Reusable submit button with loading states

```typescript
interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

**Responsibilities**:

- Handle loading states with spinner
- Manage disabled states
- Provide consistent styling
- Accept custom styling via className

### 5. Enhanced OrcamentForm Component

**Purpose**: Main container orchestrating all form sections

**Responsibilities**:

- Manage overall form state
- Coordinate between child components
- Handle form submission
- Display success/error states
- Maintain existing server action integration

## Data Models

### Form Data Structure

```typescript
interface OrcamentFormData {
  // Contact Information (mandatory)
  nome: string;
  email: string;
  telefone: string;

  // Parts Information
  quantidadePecas: number;

  // File Upload (optional based on toggle)
  anexo?: File;

  // Meta Information
  fileUploadEnabled: boolean;
}
```

### Validation Rules

```typescript
interface ValidationRules {
  nome: {
    required: true; // Always required
    minLength: 3;
  };
  email: {
    required: true; // Always required
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  };
  telefone: {
    required: true; // Always required
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  };
  quantidadePecas: {
    required: true;
    min: 1;
    type: 'integer';
  };
}
```

## Error Handling

### Client-Side Validation

- Real-time validation for parts quantity (positive integers only)
- Email format validation (always required)
- Phone format validation with Brazilian pattern (always required)
- File upload validation (when file upload is enabled)

### Server-Side Validation

- Extend existing `submitOrcamento` action to validate new fields
- Maintain backward compatibility with existing validation
- Return specific error messages for each field type

### Error Display Strategy

- Field-level errors displayed immediately below each input
- Form-level errors displayed at the top of the form
- Success states replace the entire form content (existing behavior)

## Testing Strategy

### Testing Framework Setup

- **Bun Test**: Primary testing framework (built-in with Bun package manager)
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Additional matchers for DOM testing
- **@testing-library/user-event**: User interaction simulation

### Unit Tests

- **FileUploadToggle**: Test toggle functionality and state changes using Bun Test and React Testing Library
- **ContactFields**: Test mandatory validation and required indicators
- **PartsQuantityField**: Test numeric validation and default values
- **SubmitButton**: Test loading states and disabled functionality

### Integration Tests

- **Form Submission**: Test complete form flow with and without file upload
- **Validation Flow**: Test client and server validation integration
- **State Management**: Test interaction between file upload toggle and upload component

### Component Tests

- **Accessibility**: Ensure proper ARIA labels and keyboard navigation
- **Responsive Design**: Test layout on different screen sizes
- **User Interactions**: Test all user interaction scenarios using @testing-library/user-event

### Test Configuration

- Bun test configuration with bunfig.toml
- Test setup file for global test utilities and DOM matchers
- Built-in support for TypeScript and path aliases (@/ alias)
- Built-in jsdom environment for DOM testing

## Implementation Approach

### Phase 1: Component Extraction

1. Extract SubmitButton to separate file
2. Create FileUploadToggle component
3. Create ContactFields component
4. Create PartsQuantityField component

### Phase 2: State Management

1. Implement useFileUploadToggle hook
2. Implement usePartsQuantity hook
3. Update main form to use new hooks

### Phase 3: Integration

1. Update OrcamentForm to use new components
2. Update server action to handle new fields
3. Add validation logic

### Phase 4: Styling and Polish

1. Ensure consistent styling across components
2. Add proper accessibility attributes
3. Test responsive behavior

## File Structure

```
src/components/sections/orcament/
├── OrcamentForm.tsx (updated)
├── SubmitButton.tsx (new)
├── ContactSection.tsx (new)
├── ContactFields.tsx (new)
├── FileUploadToggle.tsx (new)
├── PartsSection.tsx (new)
├── PartsQuantityField.tsx (new)
└── FileUpload.tsx (existing)

src/hooks/
├── useFileUploadToggle.ts (new)
├── usePartsQuantity.ts (new)
└── useFileUpload.ts (existing)
```

## Backward Compatibility

- Existing form submission flow remains unchanged
- Server action maintains existing API contract
- CSS classes and styling approach consistent with current implementation
- No breaking changes to parent components using OrcamentForm
