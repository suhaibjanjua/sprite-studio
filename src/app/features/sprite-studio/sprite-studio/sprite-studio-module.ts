import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { iconsReducer } from '../store/icons.reducer';
import { viewModeReducer } from '../store/view-mode.reducer';
import { UploadForm } from '../components/upload-form/upload-form';
import { IconToggle } from '../components/icon-toggle/icon-toggle';
import { SpriteViewerGrid } from '../components/sprite-viewer-grid/sprite-viewer-grid';



@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('icons', iconsReducer),
    StoreModule.forFeature('viewMode', viewModeReducer),
    UploadForm,
    IconToggle,
    SpriteViewerGrid
  ]
})
export class SpriteStudioModule { }
