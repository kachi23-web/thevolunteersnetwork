import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';
import { FormTextarea } from '../FormTextarea/FormTextarea';
import './ContactForm.css';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void | Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const ContactForm = ({ onSubmit, onSuccess, onError }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      await onSubmit(data);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      reset();
      onSuccess?.();
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      );
      onError?.(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="contact-form" noValidate>
      {submitStatus === 'success' && (
        <div className="form-message success-message" role="alert">
          {submitMessage}
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="form-message error-message-box" role="alert">
          {submitMessage}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <FormInput
            type="text"
            placeholder="Your Name"
            error={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
              maxLength: {
                value: 100,
                message: 'Name must not exceed 100 characters',
              },
              pattern: {
                value: /^[a-zA-Z\s'-]+$/,
                message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
              },
            })}
          />
        </div>
        <div className="form-group">
          <FormInput
            type="email"
            placeholder="Your Email"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <FormInput
            type="tel"
            placeholder="Phone Number"
            error={errors.phone?.message}
            {...register('phone', {
              pattern: {
                value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                message: 'Please enter a valid phone number',
              },
            })}
          />
        </div>
        <div className="form-group">
          <FormInput
            type="text"
            placeholder="Subject"
            error={errors.subject?.message}
            {...register('subject', {
              maxLength: {
                value: 200,
                message: 'Subject must not exceed 200 characters',
              },
            })}
          />
        </div>
      </div>

      <div className="form-group">
        <FormTextarea
          rows={6}
          placeholder="Your Message"
          error={errors.message?.message}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters',
            },
            maxLength: {
              value: 1000,
              message: 'Message must not exceed 1000 characters',
            },
          })}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner"></span> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
};
