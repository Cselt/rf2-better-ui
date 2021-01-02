import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "rf-button",
  templateUrl: './rf-button.component.html',
  styleUrls: ['./rf-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfButtonComponent implements OnInit {

  colorClass: string = "primary";

  @Input()
  text: string;

  @Input()
  set color(value: "primary" | "secondary" | "danger") {
    this.colorClass = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
