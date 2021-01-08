import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { arrowNavigation } from '../utils/utils';

@Component({
  selector: 'rf-garage-handler',
  template: '',
  styleUrls: ['./garage-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GarageHandlerComponent implements OnInit {

  private listItems: NodeListOf<HTMLLIElement>;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    return arrowNavigation(event, this.listItems, "main section div.selected");
  }

  constructor() { }

  ngOnInit(): void {
    this.listItems = document.querySelectorAll('main section div.thumbnail');
  }

}
