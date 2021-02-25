import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { waitForElement } from '../../utils/utils';

@Component({
  selector: 'rf-multiplayer-handler',
  template: '',
  styleUrls: ['./multiplayer-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiplayerHandlerComponent implements OnInit {

  private savedFilters: number[] = [];

  constructor() {
    console.log('Multiplayer handler works');
  }

  ngOnInit(): void {
    const listItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('section.content section.card section.filter-options li');

    this.savedFilters = JSON.parse(localStorage.getItem('savedFilters')) || [];

    // wait for servers to be loaded
    waitForElement('section.content table').then(() => {
      listItems.forEach((li: HTMLLIElement, index: number) => {
        // if the filter was saved, then select it
        if (this.savedFilters.includes(index)) {
          li.querySelector('span').click();
        }

        li.onclick = () => {
          if (li.querySelector('input').checked) { // filter selected
            if (!this.savedFilters.includes(index)) {
              this.savedFilters.push(index);
            }
          } else { // filter deselected
            if (this.savedFilters.includes(index)) {
              this.savedFilters.splice(this.savedFilters.indexOf(index), 1);
            }
          }
          this.savedFilters.sort();

          localStorage.setItem('savedFilters', JSON.stringify(this.savedFilters));
        };
      });
    }).catch(() => console.warn("Can't find multiplayer table"));
  }
}
