import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

/**
 * Testing utilities for SpriteStudio components
 */

export interface TestModuleConfig {
  declarations?: any[];
  imports?: any[];
  providers?: any[];
  schemas?: any[];
}

/**
 * Create a basic test module configuration for SpriteStudio components
 */
export function createTestModuleConfig(config: TestModuleConfig = {}): TestModuleConfig {
  return {
    declarations: config.declarations || [],
    imports: [
      NoopAnimationsModule, // Disable animations in tests
      StoreModule.forRoot({}),
      ...(config.imports || [])
    ],
    providers: config.providers || [],
    schemas: config.schemas || []
  };
}

/**
 * Create a mock file for testing file upload functionality
 */
export function createMockSvgFile(
  content: string = '<svg><symbol id="test-icon"><circle r="10"/></symbol></svg>',
  filename: string = 'test-sprite.svg'
): File {
  const blob = new Blob([content], { type: 'image/svg+xml' });
  return new File([blob], filename, { type: 'image/svg+xml' });
}

/**
 * Create mock SVG sprite content for testing
 */
export function createMockSpriteContent(iconCount: number = 3): string {
  const symbols = Array.from({ length: iconCount }, (_, i) => 
    `<symbol id="icon-${i + 1}" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="${5 + i}" fill="currentColor"/>
    </symbol>`
  ).join('\n');
  
  return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    ${symbols}
  </svg>`;
}

/**
 * Wait for component to stabilize after changes
 */
export async function waitForComponentStability(
  fixture: ComponentFixture<any>
): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

/**
 * Simulate file drop event for drag-and-drop testing
 */
export function createFileDropEvent(files: File[]): DragEvent {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  
  const event = new DragEvent('drop', {
    dataTransfer,
    bubbles: true,
    cancelable: true
  });
  
  return event;
}

/**
 * Create mock error for testing error handling
 */
export function createMockError(
  message: string = 'Test error',
  name: string = 'TestError'
): Error {
  const error = new Error(message);
  error.name = name;
  return error;
}

/**
 * Mock performance.mark for testing (framework agnostic)
 */
export function mockPerformanceAPI(): void {
  const mockPerformance = {
    mark: () => {},
    measure: () => {},
    getEntriesByName: () => [{ duration: 100 }],
    clearMarks: () => {},
    clearMeasures: () => {},
    now: () => Date.now()
  };
  
  // Mock for both window and global contexts
  if (typeof window !== 'undefined') {
    (window as any).performance = { ...window.performance, ...mockPerformance };
  }
}

/**
 * Assert that element has correct ARIA attributes (framework agnostic)
 */
export function checkAriaAttributes(
  element: HTMLElement, 
  attributes: Record<string, string>
): boolean {
  return Object.entries(attributes).every(([attr, value]) => {
    return element.getAttribute(attr) === value;
  });
}

/**
 * Simulate keyboard event
 */
export function createKeyboardEvent(
  type: string, 
  key: string, 
  options: KeyboardEventInit = {}
): KeyboardEvent {
  return new KeyboardEvent(type, {
    key,
    bubbles: true,
    cancelable: true,
    ...options
  });
}
