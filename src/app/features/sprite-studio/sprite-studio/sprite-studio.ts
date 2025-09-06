import { Component, signal } from '@angular/core';
import { SpriteParserService } from '../services/sprite-parser';
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
  imports: [UploadForm, IconToggle, SpriteViewerGrid]
})
export class SpriteStudio {
  icons;
  viewMode;

  constructor(private parser: SpriteParserService, private store: Store) {
    this.icons = this.store.selectSignal(selectIcons);
    this.viewMode = this.store.selectSignal(selectViewMode);
  }

  async onFileSelected(file: File) {
    const content = await file.text();
    const icons = this.parser.parse(content);
    this.store.dispatch(loadIcons({ icons }));
  }

  async onUrlEntered(url: string) {
    const response = await fetch(url);
    const content = await response.text();
    const icons = this.parser.parse(content);
    this.store.dispatch(loadIcons({ icons }));
  }

  onModeChanged(mode: 'actual' | 'fixed') {
    this.store.dispatch(setViewMode({ mode }));
  }
}
