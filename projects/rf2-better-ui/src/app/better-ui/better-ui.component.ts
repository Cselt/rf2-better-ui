import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rf-better-ui',
  template: '',
  styleUrls: ['./better-ui.component.scss']
})
export class BetterUiComponent implements OnInit {

  constructor() {
    console.log('Better UI loaded');

    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = `<span style="position: absolute; bottom: 0; right: 0; z-index: 1; font-size: 10px">Better-UI v2.0.0</span>`;
    document.getElementsByTagName('body')[0].prepend(div);

    this.applyHandlers();
  }

  ngOnInit(): void {
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
    }
  }

}
