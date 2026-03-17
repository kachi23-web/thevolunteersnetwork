/**
 * Accessibility utilities for improved keyboard navigation and screen reader support
 */

/**
 * Trap focus within a modal or dialog element
 */
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Generate unique ID for ARIA attributes
 */
let idCounter = 0;
export const generateId = (prefix = 'id'): string => {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Date.now()}`;
};

/**
 * Check if element is visible to screen readers
 */
export const isVisibleToScreenReader = (element: HTMLElement): boolean => {
  return (
    element.getAttribute('aria-hidden') !== 'true' &&
    !element.hasAttribute('hidden') &&
    element.style.display !== 'none' &&
    element.style.visibility !== 'hidden'
  );
};

/**
 * Skip to main content functionality
 */
export const skipToMainContent = () => {
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.setAttribute('tabindex', '-1');
    mainContent.focus();
    mainContent.removeAttribute('tabindex');
  }
};

/**
 * Get accessible label for an element
 */
export const getAccessibleLabel = (element: HTMLElement): string => {
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    return labelElement?.textContent || '';
  }

  return element.textContent || '';
};

/**
 * Check keyboard accessibility of an element
 */
export const isKeyboardAccessible = (element: HTMLElement): boolean => {
  const tabindex = element.getAttribute('tabindex');
  const isNaturallyFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
  
  return isNaturallyFocusable || (tabindex !== null && parseInt(tabindex) >= 0);
};

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
};

/**
 * Set focus to element with smooth scroll
 */
export const setFocusWithScroll = (element: HTMLElement): void => {
  element.focus({ preventScroll: true });
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/**
 * Create accessible button with keyboard support
 */
export const makeAccessibleButton = (element: HTMLElement, onClick: () => void): void => {
  element.setAttribute('role', 'button');
  element.setAttribute('tabindex', '0');
  
  const handleClick = () => onClick();
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  element.addEventListener('click', handleClick);
  element.addEventListener('keydown', handleKeyDown);
};

/**
 * Check color contrast ratio (WCAG compliance)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;

    const [r, g, b] = rgb.map(x => {
      const val = parseInt(x) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if contrast ratio meets WCAG standards
 */
export const meetsWCAGContrast = (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
  // AA: 4.5:1 for normal text, 3:1 for large text
  // AAA: 7:1 for normal text, 4.5:1 for large text
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Validate form accessibility
 */
export const validateFormAccessibility = (form: HTMLFormElement): string[] => {
  const issues: string[] = [];
  const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    'input, textarea, select'
  );

  inputs.forEach((input, index) => {
    // Check for associated label
    const label = form.querySelector(`label[for="${input.id}"]`);
    const hasAriaLabel = input.getAttribute('aria-label');
    const hasAriaLabelledBy = input.getAttribute('aria-labelledby');

    if (!label && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Input ${index + 1} (${input.name || input.id}) is missing a label`);
    }

    // Check for required attribute
    if (input.required && !input.getAttribute('aria-required')) {
      issues.push(`Input ${index + 1} (${input.name || input.id}) is required but missing aria-required`);
    }
  });

  return issues;
};

/**
 * Create accessible modal dialog
 */
export const createAccessibleDialog = (options: {
  title: string;
  content: string;
  onClose: () => void;
  buttons?: Array<{ label: string; onClick: () => void; primary?: boolean }>;
}): HTMLElement => {
  const dialog = document.createElement('div');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.className = 'accessible-dialog';

  const title = document.createElement('h2');
  title.id = 'dialog-title';
  title.textContent = options.title;

  const content = document.createElement('div');
  content.textContent = options.content;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'dialog-buttons';

  if (options.buttons) {
    options.buttons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn.label;
      button.className = btn.primary ? 'btn-primary' : 'btn-secondary';
      button.addEventListener('click', btn.onClick);
      buttonContainer.appendChild(button);
    });
  }

  const closeButton = document.createElement('button');
  closeButton.setAttribute('aria-label', 'Close dialog');
  closeButton.textContent = '✕';
  closeButton.className = 'dialog-close';
  closeButton.addEventListener('click', options.onClose);

  dialog.appendChild(closeButton);
  dialog.appendChild(title);
  dialog.appendChild(content);
  dialog.appendChild(buttonContainer);

  return dialog;
};
