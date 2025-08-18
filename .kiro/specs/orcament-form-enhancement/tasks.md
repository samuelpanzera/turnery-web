# Implementation Plan

- [x] 1. Extract SubmitButton component

  - Create separate SubmitButton.tsx file with proper TypeScript interfaces
  - Move existing submit button logic from OrcamentForm to new component
  - Add proper props interface for reusability and customization
  - Write unit tests for SubmitButton component
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 1.1 Fix testing setup for Bun

  - Remove Vitest configuration and dependencies
  - Configure Bun test with proper setup
  - Install React Testing Library and related testing utilities
  - Update existing SubmitButton test to use Bun test instead of Vitest
  - Create proper test setup file with Bun configuration
  - _Requirements: 3.6_

- [x] 2. Create FileUploadToggle component

  - Implement FileUploadToggle.tsx with checkbox input and clear labeling
  - Create useFileUploadToggle hook for state management
  - Add proper TypeScript interfaces for props and state
  - Write unit tests for toggle functionality and state changes using Bun test
  - _Requirements: 1.2, 1.3, 1.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 3. Create ContactFields component

  - Implement ContactFields.tsx with name, email, and phone input fields
  - Add proper validation attributes and required indicators (\*)
  - Implement field-level validation with error display
  - Add proper TypeScript interfaces and form field types
  - Write unit tests for mandatory validation and error handling using Bun test
  - _Requirements: 1.1, 1.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.4_

- [x] 4. Create PartsQuantityField component

  - Implement PartsQuantityField.tsx with numeric input validation
  - Create usePartsQuantity hook for quantity state management
  - Add validation for positive integers with default value of 1
  - Implement proper error handling for invalid quantities
  - Write unit tests for numeric validation and default values using Bun test
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 5. Update OrcamentForm to use new components

  - Refactor main OrcamentForm.tsx to integrate all new components
  - Implement conditional rendering of FileUpload based on toggle state
  - Update form state management to handle new fields and toggle states
  - Ensure proper component composition and data flow
  - _Requirements: 1.3, 1.4, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.2, 4.3_

- [x] 6. Update server action for new form fields

  - Modify submitOrcamento action to handle new contact fields (email, phone)
  - Add validation for parts quantity field in server action
  - Update form data processing to handle file upload toggle state
  - Maintain backward compatibility with existing form submission flow
  - _Requirements: 1.5, 2.4, 2.5_

- [x] 7. Add comprehensive form validation

  - Implement client-side validation for all mandatory contact fields
  - Add real-time validation for parts quantity (positive integers only)
  - Create proper error display components for field-level errors
  - Ensure validation works correctly with conditional file upload
  - Write integration tests for complete validation flow
  - _Requirements: 1.5, 2.5, 4.4, 4.5_

- [x] 8. Implement responsive design and accessibility

  - Ensure all new components follow responsive design patterns
  - Add proper ARIA labels and keyboard navigation support
  - Test layout on different screen sizes for all new components
  - Verify proper focus management and screen reader compatibility
  - _Requirements: 3.6, 4.1, 4.2, 4.3, 4.5_

- [x] 9. Write comprehensive tests

  - Create unit tests for all new components and hooks using Bun test and React Testing Library
  - Write integration tests for form submission with various field combinations
  - Add tests for file upload toggle interaction with FileUpload component
  - Test validation flow and error handling scenarios
  - Ensure test coverage for all acceptance criteria
  - _Requirements: 3.6_

- [x] 10. Final integration and cleanup

  - Integrate all components into the main OrcamentForm
  - Ensure consistent styling across all new components
  - Verify proper TypeScript types throughout the implementation
  - Test complete user flow from form load to successful submission
  - Clean up any unused code and ensure proper file organization
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.5_
