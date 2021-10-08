import { Component, ComponentFactory, ComponentFactoryResolver, HostListener, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { arrowNavigation, waitForElement } from '../../utils/utils';
import { RaceButtonService } from '../../services/race-button.service';
import { MatDialog } from '@angular/material/dialog';
import { SetupsComponent } from '../../modules/garage/components/setups/setups.component';

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

  constructor(private raceButtonService: RaceButtonService,
              private http: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    waitForElement('nav em').then((e: Element) => {
      const countDown: HTMLElement = document.createElement('rf-race-countdown-timer');
      e.parentElement.appendChild(countDown);
    });

    this.raceButtonService.addRaceButton();

    this.listItems = document.querySelectorAll('main section div.thumbnail');

    this.findSetupButtons();
    this.loadActiveTrack();

    window.addEventListener('hashchange', () => {
      if (location.hash.startsWith('#/summary')) {
        this.findSetupButtons();
      }
    });
  }

  private findSetupButtons(): void {
    const setups: HTMLButtonElement = (document.querySelectorAll('left-section button')[0] as HTMLButtonElement);

    setups.onclick = () => {
      this.dialog.open(SetupsComponent, {
        height: '50vh',
        maxHeight: '90vh',
        width: '70vw'
      });
    };
    // angular.element('left-section button:first').unbind('click');

    document.querySelectorAll('left-section button').forEach((button: HTMLButtonElement) =>
      button.addEventListener('click', async () => {
        const element: HTMLUListElement = await waitForElement('.modal-dialog .setup-content .setup-tree-wrapper ul') as HTMLUListElement;
        element.querySelectorAll('li .setup-name').forEach((span: HTMLSpanElement) => {
          if (span.textContent === this.currentTrackFolder) {
            span.textContent += '*';
            span.classList.add('track-selected');
          }
        });
      })
    );
  }

  private loadActiveTrack(): void {
    this.http.get('/rest/garage/currentTrackFolder', {responseType: 'text'})
      .subscribe((folder: string) => this.currentTrackFolder = folder);
  }
}
