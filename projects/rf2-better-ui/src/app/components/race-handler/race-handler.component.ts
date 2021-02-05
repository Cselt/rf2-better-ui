import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { arrowNavigation, timeout, waitForElement } from '../../utils/utils';

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
    return arrowNavigation(event, this.listItems);
  }

  constructor() {
    console.log('RACE handler activated');
  }

  ngOnInit(): void {
    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
    waitForElement('section#multiplayer ul li').then(() => {
      document.querySelectorAll('section#multiplayer ul li').forEach((node: HTMLLIElement) => {
        node.onclick = () => {
          const selected: string = node.querySelector('span').textContent;
          this.handlePasswordPopup(selected);
        };
      });
    });
  }

  private handlePasswordPopup(serverName: string): void {
    const input: HTMLInputElement = document.querySelector('#server-password');
    const submitButton: HTMLButtonElement = document.querySelector('.modal-form button.primary');
    const savedPassword: string = localStorage.getItem(serverName);

    if (!!savedPassword) {
      console.log('Restore saved password ', savedPassword);
      input.value = savedPassword;
      input.dispatchEvent(new Event('change'));
    }

    input.onchange = (value: any) => {
      console.log(`Saving password ${input.value} to server ${serverName}`);
      localStorage.setItem(serverName, input.value);
    };

    submitButton.onclick = async () => {
      // if the password is wrong then start again
      await timeout(500);
      await waitForElement('.modal-dialog p.validation-message');
      this.handlePasswordPopup(serverName);
    };
  }

}
