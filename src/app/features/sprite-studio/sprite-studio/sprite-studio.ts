import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { SpriteParserService, Icon } from '../services/sprite-parser';
import { SvgFetchService } from '../services/svg-fetch.service';
import { Store } from '@ngrx/store';
import { loadIcons } from '../store/icons.actions';
import { setViewMode } from '../store/view-mode.actions';
import { selectIcons } from '../store/icons.selectors';
import { selectViewMode } from '../store/view-mode.selectors';
import { UploadForm } from '../components/upload-form/upload-form';
import { IconToggle } from '../components/icon-toggle/icon-toggle';
import { SpriteViewerGrid } from '../components/sprite-viewer-grid/sprite-viewer-grid';

@Component({
  selector: 'app-sprite-studio',
  templateUrl: './sprite-studio.html',
  styleUrl: './sprite-studio.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    UploadForm,
    IconToggle,
    SpriteViewerGrid
  ]
})
export class SpriteStudio {
  icons;
  viewMode;

  constructor(
    private parser: SpriteParserService, 
    private store: Store,
    private svgFetchService: SvgFetchService,
    private snackBar: MatSnackBar
  ) {
    this.icons = this.store.selectSignal(selectIcons);
    this.viewMode = this.store.selectSignal(selectViewMode);
    this.loadDemoSprite();
  }

  async loadDemoSprite() {
    try {
      const response = await fetch('/demo-sprite.svg');
      const content = await response.text();
      const parsedIcons = this.processSpriteContent(content);
      this.showSuccess(`Demo sprite loaded with ${parsedIcons.length} icons!`);
    } catch (error) {
      console.error('Error loading demo sprite:', error);
      this.showError('Failed to load demo sprite');
    }
  }

  async onFileSelected(file: File) {
    try {
      this.showInfo('Processing file...');
      const content = await file.text();
      const parsedIcons = this.processSpriteContent(content);
      this.showSuccess(`Successfully loaded ${parsedIcons.length} icons from ${file.name}`);
    } catch (error) {
      console.error('Error processing file:', error);
      this.showError('Failed to process the selected file. Please ensure it\'s a valid SVG sprite.');
    }
  }

  async onUrlEntered(url: string) {
    try {
      this.showInfo('Fetching SVG from URL...');
      const content = await this.svgFetchService.fetchSvgContent(url);
      const parsedIcons = this.processSpriteContent(content);
      this.showSuccess(`Successfully loaded ${parsedIcons.length} icons from URL`);
    } catch (error) {
      console.error('Error fetching URL:', error);
      this.showError(error instanceof Error ? error.message : 'Failed to fetch SVG from URL');
    }
  }

  onModeChanged(mode: 'actual' | 'fixed') {
    this.store.dispatch(setViewMode({ mode }));
    this.showInfo(`View mode changed to ${mode === 'fixed' ? 'Fixed Size' : 'Actual Size'}`);
  }

  private processSpriteContent(content: string): Icon[] {
    // Parse the sprite
    const icons = this.parser.parse(content);
    
    if (icons.length === 0) {
      throw new Error('No icons found in the SVG file. Please ensure it contains <symbol> elements.');
    }
    
    this.store.dispatch(loadIcons({ icons }));
    
    // Inject the SVG sprite into the DOM for use by <use> elements
    this.injectSpriteIntoDom(content);
    
    return icons;
  }

  private injectSpriteIntoDom(svgContent: string) {
    // Remove any existing sprite
    const existingSprite = document.getElementById('injected-sprite');
    if (existingSprite) {
      existingSprite.remove();
    }

    // Create a div to hold the SVG sprite
    const spriteContainer = document.createElement('div');
    spriteContainer.id = 'injected-sprite';
    spriteContainer.style.display = 'none';
    spriteContainer.innerHTML = svgContent;

    // Append to document body
    document.body.appendChild(spriteContainer);
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private showInfo(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['info-snackbar']
    });
  }
}
