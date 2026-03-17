# ContactForm Component

A comprehensive contact form component with built-in validation, error handling, and user feedback.

## Features

- Complete form validation using React Hook Form
- Email, phone, and text validation
- Success/error message display
- Loading states during submission
- Accessible form controls
- Automatic form reset on success

## Usage

### Basic Usage

```tsx
import { ContactForm } from '@/components';

const ContactPage = () => {
  const handleSubmit = async (data) => {
    // Send data to your API
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return <ContactForm onSubmit={handleSubmit} />;
};
```

### With Callbacks

```tsx
<ContactForm
  onSubmit={handleSubmit}
  onSuccess={() => console.log('Message sent!')}
  onError={(error) => console.error('Failed:', error)}
/>
```

## Form Fields

The form includes the following fields:

- **Name** (required): 2-100 characters, letters/spaces/hyphens/apostrophes only
- **Email** (required): Valid email format
- **Phone** (optional): Valid phone number format
- **Subject** (optional): Max 200 characters
- **Message** (required): 10-1000 characters

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onSubmit | (data: ContactFormData) => void \| Promise<void> | Yes | Form submission handler |
| onSuccess | () => void | No | Callback on successful submission |
| onError | (error: Error) => void | No | Callback on submission error |

## ContactFormData Type

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
```

## Validation Rules

- Name: Required, 2-100 chars, letters/spaces/hyphens/apostrophes
- Email: Required, valid email format
- Phone: Optional, valid phone format
- Subject: Optional, max 200 chars
- Message: Required, 10-1000 chars
