# Charitics Theme Integration

This directory contains the integrated Charitics theme styles for the React application.

## File Structure

- `global.css` - Main global styles with Charitics theme variables and base styles
- `theme.css` - Core Charitics component styles and patterns
- `vendor.css` - Vendor library styles and overrides
- `animations.css` - Animation utilities and keyframes

## Theme Features

### Color Palette
- Primary: `#EB5310` (Orange)
- Secondary: `#FAA019` (Yellow)
- Gradient: Linear gradient from primary to secondary
- Text: `#434343` (Dark gray)
- Background: `#FFFFFF` (White)

### Typography
- Primary Font: "Manrope" (Google Fonts)
- Secondary Font: "Quicksand" (Google Fonts)
- Accent Font: "Caveat" (Google Fonts)

### Components Included
- Buttons (`ul-btn`, `ul-btn--2`)
- Section headings (`ul-section-heading`, `ul-section-title`)
- Container system (`ul-container`, `ul-inner-container`)
- Radio buttons (`ul-radio`)
- Breadcrumbs (`ul-breadcrumb`)
- Tabs (`ul-tab`)

### Vendor Libraries
- Bootstrap 5 (Grid system and utilities)
- Swiper.js (Carousels and sliders)
- Animate.css with WOW.js (Scroll animations)
- Flaticon font icons

## Usage

The theme is automatically loaded through the global CSS imports. Use the provided CSS classes in your React components:

```jsx
// Button example
<a href="#" className="ul-btn">
  <span>Get Started</span>
  <i className="flaticon-right"></i>
</a>

// Section heading example
<div className="ul-section-heading">
  <div>
    <div className="ul-section-sub-title">Welcome to</div>
    <h1 className="ul-section-title">Charitics</h1>
    <p className="ul-section-descr">Your description here</p>
  </div>
</div>
```

## Vendor Library Initialization

Vendor libraries are automatically initialized through the `src/utils/vendor.ts` utility. The initialization happens in the main App component.

## Responsive Design

The theme includes responsive utilities and breakpoints:
- Mobile: 576px and below
- Tablet: 768px and below
- Desktop: 1024px and above
- Large Desktop: 1280px and above

All spacing and typography use clamp() functions for fluid responsive design.