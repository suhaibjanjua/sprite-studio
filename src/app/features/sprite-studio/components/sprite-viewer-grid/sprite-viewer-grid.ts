import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Icon {
  id: string;
  viewBox: string;
  content: string;
}

@Component({
  selector: 'app-sprite-viewer-grid',
  templateUrl: './sprite-viewer-grid.html',
  styleUrls: ['./sprite-viewer-grid.scss'],
  imports: [CommonModule, MatIconModule, MatTooltipModule]
})
export class SpriteViewerGrid {
  @Input() icons: Icon[] = [];
  @Input() viewMode: 'fixed' | 'actual' = 'fixed';

  trackByIconId(index: number, icon: Icon): string {
    return icon.id;
  }

  getIconWidth(icon: Icon): string {
    if (this.viewMode === 'fixed') {
      return '36px';
    }
    const viewBox = icon.viewBox.split(' ');
    return viewBox.length >= 3 ? `${viewBox[2]}px` : '36px';
  }

  getIconHeight(icon: Icon): string {
    if (this.viewMode === 'fixed') {
      return '36px';
    }
    const viewBox = icon.viewBox.split(' ');
    return viewBox.length >= 4 ? `${viewBox[3]}px` : '36px';
  }
}
