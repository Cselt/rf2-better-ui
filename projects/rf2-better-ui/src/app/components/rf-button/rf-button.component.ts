import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "button[rf-button]",
  templateUrl: './rf-button.component.html',
  styleUrls: ['./rf-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfButtonComponent implements OnInit {

  @HostBinding("class.rfButton")
  rfButtonClass: boolean = true;

  @HostBinding("class")
  colorClass: string = "primary";

  @Input()
  set color(value: "primary" | "secondary" | "danger") {
    this.colorClass = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
