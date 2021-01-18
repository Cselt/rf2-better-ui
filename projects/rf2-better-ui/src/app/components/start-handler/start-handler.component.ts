import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { arrowNavigation } from '../../utils/utils';

@Component({
  selector: 'rf-start-handler',
  template: '',
  styleUrls: ['./start-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartHandlerComponent implements OnInit {

  private listItems: NodeListOf<HTMLLIElement>;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    return arrowNavigation(event, this.listItems);
  }

  constructor() {
    console.log('Start handler activated');
  }

  ngOnInit(): void {
    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
  }

}
