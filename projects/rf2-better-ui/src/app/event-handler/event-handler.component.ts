import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { waitForElement } from '../utils/utils';

@Component({
  selector: 'rf-event-handler',
  template: '',
  styleUrls: ['./event-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHandlerComponent implements OnInit {

  ngOnInit(): void {
    // add rf-chat component to the DOM
    waitForElement('.camera-wrapper').then(() => {
      const ngIncludeElement: HTMLElement = document.querySelector('.camera-wrapper').parentElement;
      ngIncludeElement.classList.add('cameraHolder');

      const rfChat: HTMLElement = document.createElement('rf-chat');
      ngIncludeElement.appendChild(rfChat);
    });
  }
}
