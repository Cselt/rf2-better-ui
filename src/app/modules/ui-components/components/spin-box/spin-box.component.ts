import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinBoxItem } from '../../model/spin-box-item';

@Component({
  selector: 'rf-spin-box',
  templateUrl: './spin-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinBoxComponent {
  @Input()
  items: SpinBoxItem[];

  @Input()
  set selectedValue(value: unknown) {
    this.selectedIdx = this.items.findIndex((item: SpinBoxItem) => value === item.value);
  }

  get selected(): SpinBoxItem {
    return this.items[this.selectedIdx];
  }

  @Output()
  selectedValueChange: EventEmitter<unknown> = new EventEmitter<unknown>();

  private selectedIdx: number = -1;

  decrease(): void {
    if (this.selectedIdx === 0) {
      return;
    }
    this.selectedIdx--;
    this.selectedValueChange.emit(this.selected.value);
  }

  increase(): void {
    if (this.selectedIdx === this.items.length - 1) {
      return;
    }
    this.selectedIdx++;
    this.selectedValueChange.emit(this.selected.value);
  }
}
