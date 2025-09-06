import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.html',
  styleUrl: './upload-form.scss',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class UploadForm {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() urlEntered = new EventEmitter<string>();

  selectedFileName: string = '';

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
        this.selectedFileName = file.name;
        this.fileSelected.emit(file);
      } else {
        alert('Please upload a valid SVG file.');
      }
    }
  }

  onUrlSubmit(url: string) {
    if (url.trim()) {
      this.urlEntered.emit(url.trim());
    }
  }
}
