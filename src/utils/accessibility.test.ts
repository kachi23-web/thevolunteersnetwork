import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  generateId, 
  isVisibleToScreenReader, 
  getAccessibleLabel,
  announceToScreenReader 
} from './accessibility';

describe('Accessibility Utilities', () => {
  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId('test');
      const id2 = generateId('test');
      expect(id1).not.toBe(id2);
    });

    it('includes the prefix in the ID', () => {
      const id = generateId('custom');
      expect(id).toContain('custom');
    });
  });

  describe('isVisibleToScreenReader', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    it('returns true for visible elements', () => {
      expect(isVisibleToScreenReader(element)).toBe(true);
    });

    it('returns false when aria-hidden is true', () => {
      element.setAttribute('aria-hidden', 'true');
      expect(isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns false when element has hidden attribute', () => {
      element.setAttribute('hidden', '');
      expect(isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns false when display is none', () => {
      element.style.display = 'none';
      expect(isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns false when visibility is hidden', () => {
      element.style.visibility = 'hidden';
      expect(isVisibleToScreenReader(element)).toBe(false);
    });
  });

  describe('getAccessibleLabel', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('button');
      document.body.appendChild(element);
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    it('returns aria-label when present', () => {
      element.setAttribute('aria-label', 'Test Label');
      expect(getAccessibleLabel(element)).toBe('Test Label');
    });

    it('returns text from aria-labelledby element', () => {
      const labelElement = document.createElement('span');
      labelElement.id = 'label-id';
      labelElement.textContent = 'Label Text';
      document.body.appendChild(labelElement);

      element.setAttribute('aria-labelledby', 'label-id');
      expect(getAccessibleLabel(element)).toBe('Label Text');

      document.body.removeChild(labelElement);
    });

    it('returns textContent when no aria attributes', () => {
      element.textContent = 'Button Text';
      expect(getAccessibleLabel(element)).toBe('Button Text');
    });
  });

  describe('announceToScreenReader', () => {
    afterEach(() => {
      // Clean up any announcement elements
      const announcements = document.querySelectorAll('[role="status"]');
      announcements.forEach(el => el.remove());
    });

    it('creates and removes announcement element', () => {
      announceToScreenReader('Test announcement');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement).toBeTruthy();
      expect(announcement?.textContent).toBe('Test announcement');
    });

    it('sets correct aria-live priority', () => {
      announceToScreenReader('Urgent message', 'assertive');
      
      const announcement = document.querySelector('[role="status"]');
      expect(announcement?.getAttribute('aria-live')).toBe('assertive');
    });
  });
});
