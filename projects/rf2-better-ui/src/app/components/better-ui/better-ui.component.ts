import { Component, OnInit } from '@angular/core';
import { version } from '../../../../../../package.json';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { waitForElement } from '../../utils/utils';

@Component({
  selector: 'rf-better-ui',
  template: '',
  styleUrls: ['./better-ui.component.scss']
})
export class BetterUiComponent implements OnInit {

  constructor(private dialog: MatDialog) {
    console.log('Better UI loaded');

    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = `<span style="position: absolute; bottom: 0; right: 0; z-index: 1; font-size: 10px">Better-UI ${version}</span>`;
    document.getElementsByTagName('body')[0].prepend(div);

    this.applyHandlers();
  }

  ngOnInit(): void {
    this.addQuitButton();
    window.onhashchange = () => this.addQuitButton();
  }

  private addQuitButton(): void {
    waitForElement('nav ol.right', 1000).then((ol: HTMLOListElement) => {
      if (ol) {
        const quitLi: HTMLLIElement = document.createElement('li');
        quitLi.classList.add('fa', 'fa-power-off');
        quitLi.onclick = () => this.dialog.open(ExitDialogComponent);
        ol.appendChild(quitLi);
      }
    });
  }

  private applyHandlers(): void {
    switch (location.pathname) {
      case '/start/index.html':
        const startHandler: HTMLElement = document.createElement('rf-start-handler');
        document.getElementsByTagName('body')[0].prepend(startHandler);
        break;

      case '/race/index.html':
        const raceHandler: HTMLElement = document.createElement('rf-race-handler');
        document.getElementsByTagName('body')[0].prepend(raceHandler);
        break;

      case '/garage/index.html':
        const garageHandler: HTMLElement = document.createElement('rf-garage-handler');
        document.getElementsByTagName('body')[0].prepend(garageHandler);
        break;

      case '/event/index.html':
        const eventHandler: HTMLElement = document.createElement('rf-event-handler');
        document.getElementsByTagName('body')[0].prepend(eventHandler);
        break;

      case '/sessions/index.html':
        const sessionsHandler: HTMLElement = document.createElement('rf-sessions-handler');
        document.getElementsByTagName('body')[0].prepend(sessionsHandler);
        break;

      case '/multiplayer/index.html':
        const multiplayerHandler: HTMLElement = document.createElement('rf-multiplayer-handler');
        document.getElementsByTagName('body')[0].prepend(multiplayerHandler);
        break;
    }
  }

}
