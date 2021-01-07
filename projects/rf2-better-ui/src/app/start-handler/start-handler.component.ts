import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rf-start-handler',
  template: '',
  styleUrls: ['./start-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartHandlerComponent implements OnInit {

  constructor() {
    console.log("Start handler activated");
  }

  ngOnInit(): void {
  }

}
