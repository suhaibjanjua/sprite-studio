/**
 * Accessibility utility functions and constants
 */

// ARIA labels and descriptions
export const ARIA_LABELS = {
  uploadButton: 'Upload SVG sprite file',
  urlInput: 'Enter SVG sprite URL',
  urlSubmit: 'Load sprite from URL',
  viewModeToggle: 'Switch between icon view modes',
  iconGrid: 'Grid of sprite icons',
  iconItem: 'Click to select icon',
  fileInput: 'Choose SVG file to upload',
  mainNavigation: 'Main application navigation',
  closeDialog: 'Close dialog'
} as const;

export const ARIA_DESCRIPTIONS = {
  uploadForm: 'Upload an SVG sprite file or enter a URL to load sprite icons',
  viewModes: 'Toggle between fixed size (36x36px) and actual size icon display',
  iconGrid: 'Interactive grid showing all icons found in the uploaded sprite',
  demoSprite: 'Demonstration sprite automatically loaded for testing'
} as const;

// Screen reader announcements
export const SCREEN_READER_MESSAGES = {
  fileUploaded: (filename: string, count: number) => 
    `File ${filename} uploaded successfully. Found ${count} icons.`,
  urlLoaded: (count: number) => 
    `Sprite loaded from URL successfully. Found ${count} icons.`,
  viewModeChanged: (mode: string) => 
    `View mode changed to ${mode === 'fixed' ? 'fixed size' : 'actual size'}.`,
  errorOccurred: (error: string) => 
    `Error occurred: ${error}`,
  loadingStarted: 'Loading sprite, please wait...',
  loadingCompleted: 'Sprite loading completed.'
} as const;

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Set focus to element with optional delay
 */
export function setFocus(element: HTMLElement, delay: number = 0): void {
  setTimeout(() => {
    element.focus();
  }, delay);
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];
  
  return focusableSelectors.some(selector => element.matches(selector));
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');
  
  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Trap focus within a container (useful for modals)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}
