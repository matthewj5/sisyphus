import type { Question } from '../types';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export type FieldValidator = (value: string) => ValidationResult;

/**
 * Validator for text fields - just checks if not empty
 */
const textValidator: FieldValidator = (value) => {
  if (!value.trim()) {
    return { valid: false, error: 'This field is required' };
  }
  return { valid: true };
};

/**
 * Validator for email fields - checks format
 */
const emailValidator: FieldValidator = (value) => {
  if (!value.trim()) {
    return { valid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true };
};

/**
 * Validator for select fields - checks if option is selected
 */
const selectValidator: FieldValidator = (value) => {
  if (!value.trim()) {
    return { valid: false, error: 'Please select an option' };
  }
  return { valid: true };
};

/**
 * Validator for textarea fields - checks if not empty
 */
const textareaValidator: FieldValidator = (value) => {
  if (!value.trim()) {
    return { valid: false, error: 'This field is required' };
  }
  return { valid: true };
};

/**
 * Map of validators by question type
 */
const validators: Record<Question['type'], FieldValidator> = {
  text: textValidator,
  email: emailValidator,
  select: selectValidator,
  textarea: textareaValidator,
};

/**
 * Validate a field based on its question type
 */
export function validateField(question: Question, value: string): ValidationResult {
  // Optional fields that are empty are valid
  if (!question.required && !value.trim()) {
    return { valid: true };
  }

  const validator = validators[question.type];
  return validator?.(value) || { valid: true };
}

/**
 * Validate all fields in a list and return a map of errors
 */
export function validateFields(
  questions: Question[],
  formResponses: Record<string, string>,
  sectionId: string
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const question of questions) {
    if (!question.required) continue;

    const key = `${sectionId}_${question.id}`;
    const value = formResponses[key] || '';

    const result = validateField(question, value);
    if (!result.valid && result.error) {
      errors[key] = result.error;
    }
  }

  return errors;
}
