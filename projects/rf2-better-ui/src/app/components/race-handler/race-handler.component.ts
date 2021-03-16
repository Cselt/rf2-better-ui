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
    window.addEventListener('hashchange', () => {
      this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
      this.rememberPassword();
      this.patchRaceController();
    });

    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
    this.patchRaceController();
    this.rememberPassword();
  }

  private rememberPassword(): void {
    waitForElement('section#multiplayer ul li').then(() => {
      document.querySelectorAll('section#multiplayer ul li').forEach((node: HTMLLIElement) => {
        node.addEventListener('click', () => {
          const selected: string = node.querySelector('span').textContent;
          this.handlePasswordPopup(selected);
        });
      });
    }).catch(() => console.warn('Can\'t find multiplayer list'));
  }

  private patchRaceController(): void {
    if (!location.hash.startsWith('#/race')) {
      return;
    }
    // Get RaceController object
    const controller: any = angular.element('main section#multiplayer').controller();

    const injector: any = angular.element('main section#multiplayer').injector();
    const raceService: any = injector.get('raceService');

    controller.loadFavorites = async () => {
      controller.loadFavoritesButtonDisabled = true;
      controller.favoriteServers = undefined;
      try {
        const favorites: any[] = await raceService.getFavoriteServers();
        controller.favoriteServers = favorites;
        controller.cacheFavoriteServers(favorites);
      } catch (e) {
        controller.favoriteServers = null;
      } finally {
        controller.loadFavoritesButtonDisabled = false;
        this.rememberPassword();
      }
    };
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
      const modalForm: HTMLElement =
        (await waitForElement('.modal-dialog div[modal-title="\'Installing content\' | translate"', 2000) as HTMLDivElement).parentElement;

      if (modalForm.querySelector('div.modal-footer')) {
        // already added
        return;
      }

      const footer: HTMLDivElement = document.createElement('div');
      footer.classList.add('modal-footer');

      const exitButton: HTMLButtonElement = document.createElement('button');
      exitButton.classList.add('btn', 'secondary');
      exitButton.innerHTML = `<span>Exit game</span>`;
      exitButton.addEventListener('click', () => this.dialog.open(ExitDialogComponent));

      footer.appendChild(exitButton);
      modalForm.appendChild(footer);
    } catch (e) {
      // There is no download
    }
  }
}
