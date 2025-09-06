import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-toggle',
  templateUrl: './icon-toggle.html',
  styleUrls: ['./icon-toggle.scss'],
  imports: [MatButtonToggleModule, MatIconModule]
})
export class IconToggle {
  @Input() currentMode: 'fixed' | 'actual' = 'fixed';
  @Output() modeChanged = new EventEmitter<'fixed' | 'actual'>();

  onToggleChange(event: any) {
    this.modeChanged.emit(event.value);
  }
}
