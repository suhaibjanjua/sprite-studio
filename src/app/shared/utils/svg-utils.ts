/**
 * Utility functions for SVG and file handling operations
 */

/**
 * Validates if a file is a valid SVG based on MIME type and extension
 */
export function isValidSvgFile(file: File): boolean {
  const validMimeTypes = ['image/svg+xml', 'text/xml', 'application/xml'];
  const validExtensions = ['.svg'];
  
  const hasValidMimeType = validMimeTypes.includes(file.type);
  const hasValidExtension = validExtensions.some(ext => 
    file.name.toLowerCase().endsWith(ext)
  );
  
  return hasValidMimeType || hasValidExtension;
}

/**
 * Validates if a URL appears to point to an SVG file
 */
export function isValidSvgUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.toLowerCase().endsWith('.svg');
  } catch {
    return false;
  }
}

/**
 * Sanitizes SVG content to remove potentially harmful scripts
 */
export function sanitizeSvgContent(svgContent: string): string {
  // Remove script tags and event handlers
  return svgContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

/**
 * Formats file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Debounce function to limit function call frequency
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

/**
 * Deep clone an object (for state management)
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

/**
 * Generate a unique ID for icons without IDs
 */
export function generateUniqueId(prefix: string = 'icon'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Extract color information from SVG content
 */
export function extractSvgColors(svgContent: string): string[] {
  const colorRegex = /(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\))/g;
  const matches = svgContent.match(colorRegex) || [];
  return [...new Set(matches)]; // Remove duplicates
}
