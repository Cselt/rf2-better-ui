import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { arrowNavigation, waitForElement } from '../../utils/utils';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rf-garage-handler',
  template: '',
  styleUrls: ['./garage-handler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GarageHandlerComponent implements OnInit {

  private listItems: NodeListOf<HTMLLIElement>;
  private currentTrackFolder: string;

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    return arrowNavigation(event, this.listItems, 'main section div.selected');
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    waitForElement('nav em').then((e: Element) => {
      const countDown: HTMLElement = document.createElement('rf-race-countdown-timer');
      e.parentElement.appendChild(countDown);
    });

    this.listItems = document.querySelectorAll('main section div.thumbnail');

    this.findSetupButtons();
    this.loadActiveTrack();
  }

  private findSetupButtons(): void {
    document.querySelectorAll('left-section button').forEach((button: HTMLButtonElement) =>
      button.onclick = () => {
        waitForElement('.modal-dialog .setup-content .setup-tree-wrapper ul').then((element: HTMLUListElement) => {
          element.querySelectorAll('li .setup-name').forEach((span: HTMLSpanElement) => {
            if (span.textContent === this.currentTrackFolder) {
              span.textContent += '*';
              span.classList.add('track-selected');
            }
          });
        });
      });
  }

  private loadActiveTrack(): void {
    this.http.get('/rest/garage/currentTrackFolder', {responseType: 'text'})
      .subscribe((folder: string) => this.currentTrackFolder = folder);
  }
}
