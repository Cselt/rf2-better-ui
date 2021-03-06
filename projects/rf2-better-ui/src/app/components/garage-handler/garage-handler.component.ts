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

    this.addRaceButton();

    this.listItems = document.querySelectorAll('main section div.thumbnail');

    this.findSetupButtons();
    this.loadActiveTrack();

    window.onhashchange = () => {
      if (location.hash.startsWith('#/summary')) {
        this.findSetupButtons();
      }
    };
  }

  private findSetupButtons(): void {
    document.querySelectorAll('left-section button').forEach((button: HTMLButtonElement) =>
      button.onclick = async () => {
        const element: HTMLUListElement = await waitForElement('.modal-dialog .setup-content .setup-tree-wrapper ul') as HTMLUListElement;
        element.querySelectorAll('li .setup-name').forEach((span: HTMLSpanElement) => {
          if (span.textContent === this.currentTrackFolder) {
            span.textContent += '*';
            span.classList.add('track-selected');
          }
        });
      });
  }

  private async addRaceButton(): Promise<void> {
    const quitLi: HTMLLIElement = (await waitForElement('nav ol.right li.fa-power-off', 1000) as HTMLLIElement);
    const ol: HTMLElement = quitLi.parentElement;
    if (ol) {
      const raceButton: HTMLButtonElement = document.createElement('button');
      raceButton.classList.add('raceButton', 'fa', 'fa-play', 'fi-white');
      raceButton.onclick = () => this.drive();
      ol.appendChild(raceButton);
    }
  }

  private loadActiveTrack(): void {
    this.http.get('/rest/garage/currentTrackFolder', {responseType: 'text'})
      .subscribe((folder: string) => this.currentTrackFolder = folder);
  }

  private drive(): void {
    this.http.post('/rest/garage/drive', undefined).subscribe();
  }
}
