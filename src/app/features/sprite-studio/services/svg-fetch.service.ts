import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgFetchService {
  async fetchSvgContent(url: string): Promise<string> {
    try {
      // First try direct fetch
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': 'image/svg+xml,image/*,*/*;q=0.8',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const content = await response.text();
      
      // Validate it's SVG content
      if (!content.includes('<svg') && !content.includes('<symbol')) {
        throw new Error('The fetched content does not appear to be a valid SVG file');
      }
      
      return content;
    } catch (error) {
      console.error('Direct fetch failed:', error);
      
      // Try with a CORS proxy as fallback
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const proxyResponse = await fetch(proxyUrl);
        
        if (!proxyResponse.ok) {
          throw new Error(`Proxy fetch failed with status: ${proxyResponse.status}`);
        }
        
        const proxyData = await proxyResponse.json();
        const content = proxyData.contents;
        
        if (!content || (!content.includes('<svg') && !content.includes('<symbol'))) {
          throw new Error('The fetched content does not appear to be a valid SVG file');
        }
        
        return content;
      } catch (proxyError) {
        console.error('Proxy fetch also failed:', proxyError);
        throw new Error(`Failed to fetch SVG from URL. This might be due to CORS restrictions. Try downloading the file and uploading it instead.`);
      }
    }
  }
}
