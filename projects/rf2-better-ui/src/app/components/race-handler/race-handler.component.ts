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
    this.patchRaceController();
    this.listItems = document.querySelectorAll('ol.tabnavigation:not(.bottom) li');
    waitForElement('section#multiplayer ul li').then(() => {
      document.querySelectorAll('section#multiplayer ul li').forEach((node: HTMLLIElement) => {
        node.onclick = () => {
          const selected: string = node.querySelector('span').textContent;
          this.handlePasswordPopup(selected);
        };
      });
    }).catch(() => console.warn("Can't find multiplayer list"));
  }

  private patchRaceController(): void {
    // Get RaceController object
    const controller: any = angular.element("main section#multiplayer").controller();

    const injector: any = angular.element("main section#multiplayer").injector();
    const raceService: any = injector.get("raceService");

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

    submitButton.onclick = async () => {
      // if the password is wrong then start again
      await timeout(500);
      await waitForElement('.modal-dialog p.validation-message');
      this.handlePasswordPopup(serverName);
    };
  }

}
