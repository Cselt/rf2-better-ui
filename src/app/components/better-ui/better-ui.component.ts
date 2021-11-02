import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import packageInfo from '../../../../package.json';
import { ExitDialogComponent } from '../exit-dialog/exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { waitForElement } from '../../utils/utils';
import { StartHandlerComponent } from '../start-handler/start-handler.component';
import { RaceHandlerComponent } from '../race-handler/race-handler.component';
import { GarageHandlerComponent } from '../garage-handler/garage-handler.component';
import { EventHandlerComponent } from '../event-handler/event-handler.component';
import { SessionsHandlerComponent } from '../sessions-handler/sessions-handler.component';
import { MultiplayerHandlerComponent } from '../multiplayer-handler/multiplayer-handler.component';
import { SettingsHandlerComponent } from '../../modules/settings';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'rf-better-ui',
  template: `<ng-template #container></ng-template>`,
  styleUrls: ['./better-ui.component.scss']
})
export class BetterUiComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private dialog: MatDialog, private resolver: ComponentFactoryResolver) {
    console.log(`Better UI v${packageInfo.version} loaded`);

    const spanElement: HTMLSpanElement = document.querySelector('#betterUIVersion');
    spanElement.innerHTML += packageInfo.version + (environment.production ? '' : '-DEV');
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
        quitLi.addEventListener('click', () =>
          this.dialog.open(ExitDialogComponent, {
            panelClass: ['noDialogPadding', 'rfPanel']
          })
        );
        ol.appendChild(quitLi);
      }
    } catch (e) {
      console.warn("Can't find nav element to add quit button");
    }
  }

  private applyHandlers(): void {
    type HandlerTypes =
      | StartHandlerComponent
      | RaceHandlerComponent
      | GarageHandlerComponent
      | EventHandlerComponent
      | SessionsHandlerComponent
      | MultiplayerHandlerComponent
      | SettingsHandlerComponent;

    let factory: ComponentFactory<HandlerTypes>;
    switch (location.pathname) {
      case '/start/index.html':
        factory = this.resolver.resolveComponentFactory(StartHandlerComponent);
        break;

      case '/race/index.html':
        factory = this.resolver.resolveComponentFactory(RaceHandlerComponent);
        break;

      case '/garage/index.html':
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

      case '/options/index.html':
        factory = this.resolver.resolveComponentFactory(SettingsHandlerComponent);
        break;
    }

    this.container.clear();
    this.container.createComponent(factory);
  }
}
