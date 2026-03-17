import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';
import './NewsletterForm.css';

export interface NewsletterFormData {
  email: string;
}

export interface NewsletterFormProps {
  onSubmit: (data: NewsletterFormData) => void | Promise<void>;
  placeholder?: string;
  buttonText?: string;
}

export const NewsletterForm = ({
  onSubmit,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: NewsletterFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    defaultValues: {
      email: '',
    },
  });

  const onFormSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      await onSubmit(data);
      setSubmitStatus('success');
      setSubmitMessage('Successfully subscribed to newsletter!');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter-form-wrapper">
      <form onSubmit={handleSubmit(onFormSubmit)} className="newsletter-form" noValidate>
        <FormInput
          type="email"
          placeholder={placeholder}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
        />
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>
      {submitStatus !== 'idle' && (
        <div className={`newsletter-message ${submitStatus}`} role="alert">
          {submitMessage}
        </div>
      )}
    </div>
  );
};
