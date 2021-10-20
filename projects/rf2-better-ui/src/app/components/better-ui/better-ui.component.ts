import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import packageInfo from '../../../../../../package.json';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { waitForElement } from '../../utils/utils';
import { StartHandlerComponent } from '../start-handler/start-handler.component';
import { RaceHandlerComponent } from '../race-handler/race-handler.component';
import { GarageHandlerComponent } from '../garage-handler/garage-handler.component';
import { EventHandlerComponent } from '../event-handler/event-handler.component';
import { SessionsHandlerComponent } from '../sessions-handler/sessions-handler.component';
import { MultiplayerHandlerComponent } from '../multiplayer-handler/multiplayer-handler.component';

@Component({
  selector: 'rf-better-ui',
  template: `
    <ng-template #container></ng-template>`,
  styleUrls: ['./better-ui.component.scss']
})
export class BetterUiComponent implements OnInit, AfterViewInit {

  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  constructor(private dialog: MatDialog,
              private resolver: ComponentFactoryResolver) {
    console.log('Better UI loaded');

    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = `<span style="position: absolute; bottom: 0; right: 0; z-index: 1; font-size: 10px">Better-UI ${packageInfo.version}</span>`;
    document.getElementsByTagName('body')[0].prepend(div);

  }

  ngOnInit(): void {
    this.addQuitButton();
    window.addEventListener('hashchange', () => this.addQuitButton());
  }

  ngAfterViewInit(): void {
    this.applyHandlers();
  }

  private async addQuitButton(): Promise<void> {
    try {
      const ol: HTMLOListElement = await waitForElement<HTMLOListElement>('nav ol.right', 1000);

      if (ol) {
        if (ol.querySelector('li.fa-power-off')) {
          // Already added
          return;
        }

        const quitLi: HTMLLIElement = document.createElement('li');
        quitLi.classList.add('fa', 'fa-power-off');
        quitLi.addEventListener('click', () => this.dialog.open(ExitDialogComponent, {
          panelClass: ['noDialogPadding', 'rfPanel']
        }));
        ol.appendChild(quitLi);
      }
    } catch (e) {
      console.warn('Can\'t find nav element to add quit button');
    }
  }

  private applyHandlers(): void {
    let factory: ComponentFactory<any>;
    switch (location.pathname) {
      case '/start/index.html':
        factory = this.resolver.resolveComponentFactory(StartHandlerComponent);
        break;

      case '/race/index.html':
        factory = this.resolver.resolveComponentFactory(RaceHandlerComponent);
        break;

      case '/garage/index.html':
        console.log('navigate to garage');
        factory = this.resolver.resolveComponentFactory(GarageHandlerComponent);
        break;

      case '/event/index.html':
        factory = this.resolver.resolveComponentFactory(EventHandlerComponent);
        break;

      case '/sessions/index.html':
        factory = this.resolver.resolveComponentFactory(SessionsHandlerComponent);
        break;

      case '/multiplayer/index.html':
        factory = this.resolver.resolveComponentFactory(MultiplayerHandlerComponent);
        break;
    }

    this.container.clear();
    this.container.createComponent(factory);
  }

}
