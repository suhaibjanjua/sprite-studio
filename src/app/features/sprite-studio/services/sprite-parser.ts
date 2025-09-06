import { Injectable } from '@angular/core';

export interface Icon {
  id: string;
  viewBox: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpriteParserService {
  parse(svgContent: string): Icon[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    
    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      console.error('SVG parsing error:', parserError.textContent);
      return [];
    }
    
    // Look for symbols first (most common sprite format)
    let symbols = Array.from(doc.querySelectorAll('symbol'));
    
    // If no symbols found, look for defs > g elements (alternative format)
    if (symbols.length === 0) {
      const defsElements = Array.from(doc.querySelectorAll('defs > g[id]'));
      symbols = defsElements as any[]; // Treat g elements like symbols
    }
    
    // If still no elements found, look for any g elements with id
    if (symbols.length === 0) {
      const gElements = Array.from(doc.querySelectorAll('g[id]'));
      symbols = gElements as any[]; // Treat g elements like symbols
    }
    
    // If still nothing, look for any elements with id that might be icons
    if (symbols.length === 0) {
      const anyElements = Array.from(doc.querySelectorAll('[id]'));
      // Filter out the root svg element
      symbols = anyElements.filter(el => el.tagName !== 'svg') as any[];
    }
    
    return symbols.map((element, index) => {
      const id = element.id || `icon-${index + 1}`;
      const viewBox = element.getAttribute('viewBox') || 
                     element.closest('svg')?.getAttribute('viewBox') || 
                     '0 0 24 24';
      
      return {
        id,
        viewBox,
        content: element.innerHTML || element.outerHTML
      };
    });
  }
}
