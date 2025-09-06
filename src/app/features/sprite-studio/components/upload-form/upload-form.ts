import { Component, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.html',
  styleUrl: './upload-form.scss',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class UploadForm {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() urlEntered = new EventEmitter<string>();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'image/svg+xml') {
        this.fileSelected.emit(file);
      } else {
        alert('Please upload a valid SVG file.');
      }
    }
  }

  onUrlSubmit(url: string) {
    if (/^https?:\/\/.+\.svg$/i.test(url)) {
      this.urlEntered.emit(url);
    } else {
      alert('Please enter a valid SVG URL.');
    }
  }
}
