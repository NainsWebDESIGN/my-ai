import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-btn',
  templateUrl: './refresh-btn.component.html',
  styles: ['.refresh-btn { min-width: unset; }']
})
export class RefreshBtnComponent {
  @Input() loading = false;
  @Output() refresh = new EventEmitter<void>();
}
