import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpriteParserService {
  parse(svgContent: string): { id: string, svg: string }[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const symbols = Array.from(doc.querySelectorAll('symbol'));
    return symbols.map(symbol => ({
      id: symbol.id,
      svg: `<svg viewBox="${symbol.getAttribute('viewBox')}">${symbol.innerHTML}</svg>`
    }));
  }
}
