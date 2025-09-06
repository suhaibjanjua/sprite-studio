import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sprite-viewer-grid',
  templateUrl: './sprite-viewer-grid.html',
  styleUrl: './sprite-viewer-grid.scss',
  imports: [CommonModule]
})
export class SpriteViewerGrid {
  @Input() icons: { id: string, svg: string }[] = [];
  @Input() viewMode: 'actual' | 'fixed' = 'actual';
}
