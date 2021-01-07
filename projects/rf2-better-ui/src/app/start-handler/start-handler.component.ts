import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

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
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) {
      return;
    }

    const selectedLi: HTMLLIElement = document.querySelector('ol.tabnavigation:not(.bottom) li.selected');
    let selectedIndex: number = -1;
    this.listItems.forEach((node: HTMLLIElement, index: number) => {
      if (selectedLi === node) {
        selectedIndex = index;
      }
    });

    switch (event.key) {
      case 'ArrowRight':
        selectedIndex = Math.min(selectedIndex + 1, this.listItems.length - 1);
        break;

      case 'ArrowLeft':
        selectedIndex = Math.max(selectedIndex - 1, 0);
        break;
    }

    this.listItems.forEach((node: HTMLLIElement, index: number) => {
      if (index === selectedIndex) {
        node.click();
      }
    });
  }

  constructor() {
    console.log('Start handler activated');
  }

  ngOnInit(): void {
    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
  }

}
