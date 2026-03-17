# Source Directory Structure

This directory contains all the React application source code.

## Directory Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions and helpers
├── assets/         # Static assets (images, icons)
├── styles/         # Global styles and theme configuration
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── router.tsx      # React Router configuration
```

## Conventions

- **Components**: Reusable UI components with co-located CSS Modules
- **Pages**: Top-level route components
- **Hooks**: Custom React hooks for shared logic
- **Utils**: Pure utility functions and helpers
- **Styles**: Global CSS and theme variables

## CSS Architecture

- Global styles in `styles/global.css`
- Component-specific styles use CSS Modules (`.module.css`)
- CSS variables for theming in `:root`
