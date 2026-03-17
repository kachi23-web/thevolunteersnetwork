/**
 * Error handling utilities for the application
 * Provides centralized error management, logging, and recovery strategies
 */

export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
}

/**
 * Error codes for different error types
 */
export const ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',

  // Component errors
  COMPONENT_ERROR: 'COMPONENT_ERROR',
  RENDER_ERROR: 'RENDER_ERROR',
  STATE_ERROR: 'STATE_ERROR',

  // Data errors
  DATA_ERROR: 'DATA_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
  SERIALIZATION_ERROR: 'SERIALIZATION_ERROR',

  // Generic error
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * Create a standardized app error
 */
export const createAppError = (
  code: string,
  message: string,
  options: {
    details?: Record<string, any>;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    recoverable?: boolean;
  } = {}
): AppError => {
  return {
    code,
    message,
    details: options.details,
    timestamp: Date.now(),
    severity: options.severity || 'medium',
    recoverable: options.recoverable !== false,
  };
};

/**
 * Error logger with context
 */
class ErrorLogger {
  private errors: AppError[] = [];
  private maxErrors = 100;
  private context: ErrorContext = {};

  /**
   * Set error context
   */
  setContext(context: Partial<ErrorContext>): void {
    this.context = { ...this.context, ...context };
  }

  /**
   * Log an error
   */
  log(error: AppError | Error, context?: Partial<ErrorContext>): void {
    const appError = error instanceof Error
      ? createAppError(
          ERROR_CODES.UNKNOWN_ERROR,
          error.message,
          { details: { stack: error.stack } }
        )
      : error;

    const fullContext = { ...this.context, ...context };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error(`[${appError.code}] ${appError.message}`, {
        ...appError,
        context: fullContext,
      });
    }

    // Store error
    this.errors.push(appError);

    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Send to analytics in production
    if (import.meta.env.PROD) {
      this.sendToAnalytics(appError, fullContext);
    }
  }

  /**
   * Get all logged errors
   */
  getErrors(): AppError[] {
    return [...this.errors];
  }

  /**
   * Get errors by severity
   */
  getErrorsBySeverity(severity: string): AppError[] {
    return this.errors.filter(e => e.severity === severity);
  }

  /**
   * Clear error log
   */
  clear(): void {
    this.errors = [];
  }

  /**
   * Send error to analytics service
   */
  private sendToAnalytics(_error: AppError, _context: ErrorContext): void {
    // This is a placeholder for analytics integration
    // In production, integrate with your analytics service
    // Example: Sentry, LogRocket, Datadog, etc.
    try {
      // Example implementation:
      // if (window.__analytics) {
      //   window.__analytics.captureException(_error, { extra: _context });
      // }
    } catch (e) {
      console.error('Failed to send error to analytics:', e);
    }
  }
}

/**
 * Global error logger instance
 */
export const errorLogger = new ErrorLogger();

/**
 * Error recovery strategies
 */
export const errorRecoveryStrategies = {
  /**
   * Retry with exponential backoff
   */
  retryWithBackoff: async <T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    initialDelay = 1000
  ): Promise<T> => {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (i < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, i);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  },

  /**
   * Fallback to default value
   */
  withFallback: <T>(fn: () => T, fallback: T): T => {
    try {
      return fn();
    } catch (error) {
      errorLogger.log(
        error instanceof Error ? error : new Error(String(error)),
        { action: 'withFallback' }
      );
      return fallback;
    }
  },

  /**
   * Graceful degradation
   */
  gracefulDegrade: <T>(
    primary: () => T,
    fallback: () => T,
    context?: ErrorContext
  ): T => {
    try {
      return primary();
    } catch (error) {
      errorLogger.log(
        error instanceof Error ? error : new Error(String(error)),
        { ...context, action: 'gracefulDegrade' }
      );
      return fallback();
    }
  },
};

/**
 * Handle network errors
 */
export const handleNetworkError = (error: any): AppError => {
  if (error.code === 'ECONNABORTED') {
    return createAppError(
      ERROR_CODES.TIMEOUT_ERROR,
      'Request timeout. Please try again.',
      { severity: 'medium', recoverable: true }
    );
  }

  if (error.response?.status === 404) {
    return createAppError(
      ERROR_CODES.NOT_FOUND,
      'Resource not found.',
      { severity: 'low', recoverable: true }
    );
  }

  if (error.response?.status === 401) {
    return createAppError(
      ERROR_CODES.UNAUTHORIZED,
      'Unauthorized. Please log in.',
      { severity: 'high', recoverable: true }
    );
  }

  if (error.response?.status === 403) {
    return createAppError(
      ERROR_CODES.FORBIDDEN,
      'Access denied.',
      { severity: 'high', recoverable: false }
    );
  }

  if (error.response?.status >= 500) {
    return createAppError(
      ERROR_CODES.SERVER_ERROR,
      'Server error. Please try again later.',
      { severity: 'high', recoverable: true }
    );
  }

  return createAppError(
    ERROR_CODES.NETWORK_ERROR,
    'Network error. Please check your connection.',
    { severity: 'medium', recoverable: true }
  );
};

/**
 * Handle validation errors
 */
export const handleValidationError = (
  field: string,
  message: string
): AppError => {
  return createAppError(
    ERROR_CODES.VALIDATION_ERROR,
    `Validation error in ${field}: ${message}`,
    {
      severity: 'low',
      recoverable: true,
      details: { field },
    }
  );
};

/**
 * Global error handler for unhandled rejections
 */
export const setupGlobalErrorHandlers = (): void => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason));

    errorLogger.log(error, { action: 'unhandledRejection' });
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    errorLogger.log(event.error, { action: 'globalError' });
  });
};

/**
 * Create user-friendly error message
 */
export const getUserFriendlyMessage = (error: AppError): string => {
  const messages: Record<string, string> = {
    [ERROR_CODES.NETWORK_ERROR]: 'Unable to connect. Please check your internet connection.',
    [ERROR_CODES.TIMEOUT_ERROR]: 'Request took too long. Please try again.',
    [ERROR_CODES.NOT_FOUND]: 'The requested resource was not found.',
    [ERROR_CODES.UNAUTHORIZED]: 'Please log in to continue.',
    [ERROR_CODES.FORBIDDEN]: 'You do not have permission to access this resource.',
    [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
    [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input and try again.',
    [ERROR_CODES.COMPONENT_ERROR]: 'Something went wrong. Please refresh the page.',
    [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
  };

  return messages[error.code] || error.message;
};
