import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[rf-button]',
  templateUrl: './rf-button.component.html',
  styleUrls: ['./rf-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfButtonComponent {
  @HostBinding('class.rfButton')
  rfButtonClass: boolean = true;

  @HostBinding('class')
  colorClass: string = 'primary';

  @Input()
  set color(value: 'primary' | 'secondary' | 'danger' | 'blue') {
    this.colorClass = value;
  }
}
