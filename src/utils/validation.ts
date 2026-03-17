/**
 * Common validation patterns and utilities for form validation
 */

export const ValidationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  name: /^[a-zA-Z\s'-]+$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^[0-9]+$/,
  decimal: /^[0-9]+(\.[0-9]{1,2})?$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  creditCard: /^[0-9]{13,19}$/,
  zipCode: /^[0-9]{5}(-[0-9]{4})?$/,
};

export const ValidationMessages = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, length: number) => 
    `${field} must be at least ${length} characters`,
  maxLength: (field: string, length: number) => 
    `${field} must not exceed ${length} characters`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  pattern: (field: string) => `${field} format is invalid`,
  min: (field: string, value: number) => `${field} must be at least ${value}`,
  max: (field: string, value: number) => `${field} must not exceed ${value}`,
  password: 'Password must contain uppercase, lowercase, number, and special character',
  creditCard: 'Please enter a valid credit card number',
  zipCode: 'Please enter a valid zip code',
  match: (field: string) => `${field} does not match`,
};

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  return ValidationPatterns.email.test(email);
};

/**
 * Validates a phone number
 */
export const isValidPhone = (phone: string): boolean => {
  return ValidationPatterns.phone.test(phone);
};

/**
 * Validates a URL
 */
export const isValidUrl = (url: string): boolean => {
  return ValidationPatterns.url.test(url);
};

/**
 * Validates a password
 */
export const isValidPassword = (password: string): boolean => {
  return ValidationPatterns.password.test(password);
};

/**
 * Validates a credit card number using Luhn algorithm
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const sanitized = cardNumber.replace(/\s/g, '');
  
  if (!ValidationPatterns.creditCard.test(sanitized)) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validates a zip code
 */
export const isValidZipCode = (zipCode: string): boolean => {
  return ValidationPatterns.zipCode.test(zipCode);
};

/**
 * Sanitizes user input by trimming whitespace
 */
export const sanitizeInput = (input: string): string => {
  return input.trim();
};

/**
 * Validates that a string is not empty after trimming
 */
export const isNotEmpty = (value: string): boolean => {
  return sanitizeInput(value).length > 0;
};

/**
 * Validates string length
 */
export const isValidLength = (
  value: string,
  min?: number,
  max?: number
): boolean => {
  const length = value.length;
  if (min !== undefined && length < min) return false;
  if (max !== undefined && length > max) return false;
  return true;
};

/**
 * Validates a numeric value within a range
 */
export const isInRange = (
  value: number,
  min?: number,
  max?: number
): boolean => {
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
};

/**
 * Validates that two values match
 */
export const isMatching = (value1: string, value2: string): boolean => {
  return value1 === value2;
};

/**
 * Validates that a value matches a pattern
 */
export const matchesPattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

/**
 * Validates multiple fields at once
 */
export const validateFields = (
  fields: Record<string, any>,
  rules: Record<string, Array<(value: any) => boolean | string>>
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};

  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    const value = fields[fieldName];
    const fieldErrors: string[] = [];

    fieldRules.forEach(rule => {
      const result = rule(value);
      if (typeof result === 'string') {
        fieldErrors.push(result);
      } else if (!result) {
        fieldErrors.push(`${fieldName} is invalid`);
      }
    });

    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors;
    }
  });

  return errors;
};

/**
 * Debounced validation for async operations
 */
export const createDebouncedValidator = <T>(
  validator: (value: T) => Promise<boolean>,
  delay = 500
): ((value: T) => Promise<boolean>) => {
  let timeoutId: NodeJS.Timeout;

  return (value: T) => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const result = await validator(value);
        resolve(result);
      }, delay);
    });
  };
};

/**
 * Async email validation (checks if email exists)
 */
export const validateEmailAsync = async (email: string): Promise<boolean> => {
  // This is a placeholder - implement with your backend API
  // Example: POST /api/validate/email with { email }
  if (!isValidEmail(email)) {
    return false;
  }

  try {
    // Placeholder for actual API call
    // const response = await fetch('/api/validate/email', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    // });
    // return response.ok;
    return true;
  } catch (error) {
    console.error('Email validation error:', error);
    return false;
  }
};

/**
 * Async username validation (checks if username is available)
 */
export const validateUsernameAsync = async (username: string): Promise<boolean> => {
  // This is a placeholder - implement with your backend API
  if (username.length < 3) {
    return false;
  }

  try {
    // Placeholder for actual API call
    // const response = await fetch('/api/validate/username', {
    //   method: 'POST',
    //   body: JSON.stringify({ username }),
    // });
    // return response.ok;
    return true;
  } catch (error) {
    console.error('Username validation error:', error);
    return false;
  }
};
