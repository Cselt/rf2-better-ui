import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { arrowNavigation, timeout, waitForElement } from '../../utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';

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

  constructor(private dialog: MatDialog) {
    console.log('RACE handler activated');
  }

  ngOnInit(): void {
    this.carSelect();

    window.addEventListener('hashchange', () => {
      this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
      this.rememberPassword();
    });

    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
    this.rememberPassword();
  }

  private rememberPassword(): void {
    waitForElement('section#multiplayer ul li')
      .then(() => {
        document.querySelectorAll('section#multiplayer ul li').forEach((node: HTMLLIElement) => {
          node.addEventListener('click', () => {
            const selected: string = node.querySelector('span').textContent;
            this.handlePasswordPopup(selected);
          });
        });
      })
      .catch(() => console.warn("Can't find multiplayer list"));
  }

  private handlePasswordPopup(serverName: string): void {
    const input: HTMLInputElement = document.querySelector('#server-password');
    const submitButton: HTMLButtonElement = document.querySelector('.modal-form button.primary');

    if (!input) {
      return;
    }

    submitButton.addEventListener('click', async () => {
      // if the password is wrong then start again
      await timeout(500);
      this.checkForDownloadsPopup();
      try {
        await waitForElement('.modal-dialog p.validation-message', 2000);
        this.handlePasswordPopup(serverName);
      } catch (e) {
        // password was ok
      }
    });
  }

  private async checkForDownloadsPopup(): Promise<void> {
    try {
      const modalForm: HTMLElement = (
        (await waitForElement(
          '.modal-dialog div[modal-title="\'Installing content\' | translate"',
          2000
        )) as HTMLDivElement
      ).parentElement;

      if (modalForm.querySelector('div.modal-footer')) {
        // already added
        return;
      }

      const footer: HTMLDivElement = document.createElement('div');
      footer.classList.add('modal-footer');

      const exitButton: HTMLButtonElement = document.createElement('button');
      exitButton.classList.add('btn', 'secondary');
      exitButton.innerHTML = `<span>Exit game</span>`;
      exitButton.addEventListener('click', () =>
        this.dialog.open(ExitDialogComponent, {
          panelClass: ['noDialogPadding', 'rfPanel'],
          width: '25vw'
        })
      );

      footer.appendChild(exitButton);
      modalForm.appendChild(footer);
    } catch (e) {
      // There is no download
    }
  }

  private carSelect(): void {
    if (sessionStorage.getItem('betterUI.carSelect') === 'true') {
      const carSelectCtrl = angular.element('ui-view').controller();
      const origFun: () => void = carSelectCtrl.joinServer;

      carSelectCtrl.joinServer = () => {
        origFun();
        carSelectCtrl.appSwitchService.openAppWithTab('event');
      };

      angular.element('nav.jumpmenu').scope().config.back = () => {
        carSelectCtrl.appSwitchService.openAppWithTab('event');
      };

      sessionStorage.removeItem('betterUI.carSelect');
    }
  }
}
