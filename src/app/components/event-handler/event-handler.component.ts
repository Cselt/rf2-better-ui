import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { waitForElement } from '../../utils/utils';
import { RaceButtonService } from '../../services/race-button.service';

@Component({
  selector: 'rf-event-handler',
  template: '',
  styleUrls: ['./event-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHandlerComponent implements OnInit, OnDestroy {
  private tabHolder: HTMLDivElement;
  private observer: MutationObserver;
  private injector: any;

  constructor(private raceButtonService: RaceButtonService) {}

  ngOnInit(): void {
    this.injector = angular.element('ui-view').injector();
    this.raceButtonService.addRaceButton();
    waitForElement('nav em').then((e: Element) => {
      const countDown: HTMLElement = document.createElement('rf-race-countdown-timer');
      e.parentElement.appendChild(countDown);
    });

    // add rf-chat component to the DOM
    waitForElement('.camera-wrapper').then(() => {
      this.tabHolder = document.querySelector("div[ng-if='eventCtrl.gameState.navigationState']");
      this.injectChat();
      this.observeTabChange();
    });

    waitForElement('svg.track-map', 2000).then(() => {
      this.tabHolder = document.querySelector("div[ng-if='eventCtrl.gameState.navigationState']");
      this.addCarSelect();
      this.observeTabChange();
    });
  }

  private observeTabChange(): void {
    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      for (const m of mutations) {
        // if class changed and the selected tab is camera
        if (m.attributeName === 'class' && this.tabHolder.classList.contains('tab-camera')) {
          this.injectChat();
          break;
        }

        if (m.attributeName === 'class' && this.tabHolder.classList.contains('tab-eventinfo')) {
          this.addCarSelect();
          break;
        }
      }
    });

    this.observer.observe(this.tabHolder, { attributes: true });
  }

  private async addCarSelect(): Promise<void> {
    const holderDiv: HTMLDivElement = document.querySelector('.left-content-bottom div');

    if (holderDiv.querySelector('button.carSelect')) {
      // already added
      return;
    }

    const carSelect: HTMLButtonElement = document.createElement('button');
    carSelect.classList.add('secondary', 'carSelect');
    carSelect.innerHTML = `<span>Car Select</span>`;

    const appSwitchService: any = this.injector.get('appSwitchService');

    carSelect.onclick = () => {
      sessionStorage.setItem('betterUI.carSelect', 'true');
      appSwitchService.openAppWithTab('race', 'car');
    };

    holderDiv.appendChild(carSelect);
  }

  private injectChat(): void {
    const ngIncludeElement: HTMLElement = document.querySelector('.camera-wrapper').parentElement;

    if (!!ngIncludeElement.querySelector('rf-chat')) {
      // already injected
      return;
    }

    ngIncludeElement.classList.add('cameraHolder');

    const rfChat: HTMLElement = document.createElement('rf-chat');
    ngIncludeElement.appendChild(rfChat);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
