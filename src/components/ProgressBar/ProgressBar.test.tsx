import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProgressBar, calculateProgressPercentage } from './ProgressBar';

/**
 * Feature: charity-website-react-conversion, Property 7: Progress bar calculations
 * For any donation campaign with raised and goal amounts, the progress bar should display the mathematically correct percentage
 * Validates: Requirements 2.4
 */
describe('ProgressBar - Property 7: Progress bar calculations', () => {
  it('should calculate mathematically correct percentage for any valid raised and goal amounts', () => {
    fc.assert(
      fc.property(
        // Generate positive numbers for raised and goal amounts
        fc.double({ min: 0, max: 1000000, noNaN: true }),
        fc.double({ min: 0.01, max: 1000000, noNaN: true }), // goal must be > 0
        (raised, goal) => {
          const percentage = calculateProgressPercentage(raised, goal);
          
          // Property 1: Percentage should be between 0 and 100 (inclusive)
          expect(percentage).toBeGreaterThanOrEqual(0);
          expect(percentage).toBeLessThanOrEqual(100);
          
          // Property 2: Percentage should be mathematically correct
          const expectedPercentage = (raised / goal) * 100;
          
          if (expectedPercentage <= 100) {
            // If expected is within bounds, should match exactly
            expect(percentage).toBeCloseTo(expectedPercentage, 10);
          } else {
            // If expected exceeds 100%, should be clamped to 100
            expect(percentage).toBe(100);
          }
          
          // Property 3: When raised equals goal, percentage should be 100
          if (Math.abs(raised - goal) < 0.0001) {
            expect(percentage).toBeCloseTo(100, 1);
          }
          
          // Property 4: When raised is 0, percentage should be 0
          if (raised === 0) {
            expect(percentage).toBe(0);
          }
          
          // Property 5: When raised exceeds goal, percentage should be capped at 100
          if (raised > goal) {
            expect(percentage).toBe(100);
          }
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('should handle edge case where goal is zero', () => {
    const percentage = calculateProgressPercentage(100, 0);
    expect(percentage).toBe(0);
  });

  it('should handle edge case where both raised and goal are zero', () => {
    const percentage = calculateProgressPercentage(0, 0);
    expect(percentage).toBe(0);
  });

  it('should render progress bar with correct width style', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0, max: 1000000, noNaN: true }),
        fc.double({ min: 0.01, max: 1000000, noNaN: true }),
        (raised, goal) => {
          const { container } = render(<ProgressBar raised={raised} goal={goal} />);
          const progressFill = container.querySelector('.progress-fill') as HTMLElement;
          
          expect(progressFill).toBeTruthy();
          
          const percentage = calculateProgressPercentage(raised, goal);
          const expectedWidth = `${percentage}%`;
          
          expect(progressFill.style.width).toBe(expectedWidth);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should display correct raised and goal amounts in stats', () => {
    const raised = 7500;
    const goal = 10000;
    
    render(<ProgressBar raised={raised} goal={goal} showStats={true} />);
    
    expect(screen.getByText('$7,500')).toBeInTheDocument();
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });
});
