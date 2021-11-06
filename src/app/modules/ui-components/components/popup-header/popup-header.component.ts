import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rf-popup-header',
  templateUrl: './popup-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupHeaderComponent {
  @Output()
  closeClicked: EventEmitter<void> = new EventEmitter<void>();
}
