import { forwardRef, type TextareaHTMLAttributes } from 'react';
import './FormTextarea.css';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const textareaId = props.id || props.name;

    return (
      <div className={`form-textarea-wrapper ${error ? 'has-error' : ''}`}>
        {label && (
          <label htmlFor={textareaId} className="form-textarea-label">
            {label}
            {props.required && <span className="required-indicator">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`form-control ${className} ${error ? 'error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${textareaId}-error`} className="error-message" role="alert">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span id={`${textareaId}-helper`} className="helper-text">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
