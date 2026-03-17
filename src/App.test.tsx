import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Integration', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Check for the main heading specifically
    expect(screen.getByRole('heading', { name: /Charitics/i })).toBeInTheDocument();
    // Check for the welcome message
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    // Check for the buttons
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn More/i)).toBeInTheDocument();
  });
});
