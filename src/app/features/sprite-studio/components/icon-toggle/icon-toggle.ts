import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-toggle',
  templateUrl: './icon-toggle.html',
  styleUrl: './icon-toggle.scss'
})
export class IconToggle {
  viewMode: 'actual' | 'fixed' = 'actual';
  @Output() modeChanged = new EventEmitter<'actual' | 'fixed'>();

  toggleMode() {
    this.viewMode = this.viewMode === 'actual' ? 'fixed' : 'actual';
    this.modeChanged.emit(this.viewMode);
  }
}
