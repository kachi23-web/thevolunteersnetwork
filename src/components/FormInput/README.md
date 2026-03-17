# FormInput Component

A reusable form input component with built-in validation error display and accessibility features.

## Features

- Built-in error message display
- Helper text support
- Accessible with ARIA attributes
- Required field indicator
- Fully typed with TypeScript
- Compatible with React Hook Form

## Usage

### Basic Usage

```tsx
import { FormInput } from '@/components';

<FormInput
  type="text"
  name="username"
  placeholder="Enter username"
  required
/>
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components';

const MyForm = () => {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      <FormInput
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />
    </form>
  );
};
```

### With Label and Helper Text

```tsx
<FormInput
  type="text"
  name="username"
  label="Username"
  helperText="Choose a unique username"
  required
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Label text displayed above the input |
| error | string | - | Error message to display |
| helperText | string | - | Helper text displayed below the input |
| ...props | InputHTMLAttributes | - | All standard HTML input attributes |

## Accessibility

- Automatically sets `aria-invalid` when error is present
- Links error messages with `aria-describedby`
- Supports required field indicators
- Proper label association with input
