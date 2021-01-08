import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { waitForElement } from '../utils/utils';

@Component({
  selector: 'rf-race-handler',
  template: '',
  styleUrls: ['./race-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RaceHandlerComponent implements OnInit {

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
  }

  ngOnInit(): void {
    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
    waitForElement('section#multiplayer ul li').then(() => {
      document.querySelectorAll('section#multiplayer ul li').forEach((node: HTMLLIElement) => {
        node.onclick = () => {

          const selected: string = node.querySelector('span').textContent;

          const input: HTMLInputElement = document.querySelector('#server-password');
          const savedPassword: string = localStorage.getItem(selected);

          if (!!savedPassword) {
            console.log('Restore saved password ', savedPassword);
            input.value = savedPassword;
            input.dispatchEvent(new Event('change'));
          }
        };
      });
    });

  }

}
