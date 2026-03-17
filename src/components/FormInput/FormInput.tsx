import { forwardRef, type InputHTMLAttributes } from 'react';
import './FormInput.css';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputId = props.id || props.name;

    return (
      <div className={`form-input-wrapper ${error ? 'has-error' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="form-input-label">
            {label}
            {props.required && <span className="required-indicator">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`form-control ${className} ${error ? 'error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className="error-message" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${inputId}-helper`} className="helper-text">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
