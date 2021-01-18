import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { waitForElement } from '../../utils/utils';

@Component({
  selector: 'rf-event-handler',
  template: '',
  styleUrls: ['./event-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHandlerComponent implements OnInit, OnDestroy {

  private tabHolder: HTMLDivElement;
  private observer: MutationObserver;

  ngOnInit(): void {
    // add rf-chat component to the DOM
    waitForElement('.camera-wrapper').then(() => {
      this.tabHolder = document.querySelector("div[ng-if='eventCtrl.gameState.navigationState']");
      this.injectChat();
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
      }
    });

    this.observer.observe(this.tabHolder, {attributes: true});
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
