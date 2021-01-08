import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { createCustomElement } from '@angular/elements';
import { RfButtonComponent } from './rf-button/rf-button.component';
import { ChatComponent } from './chat/chat.component';
import { BetterUiComponent } from './better-ui/better-ui.component';
import { StartHandlerComponent } from './start-handler/start-handler.component';
import { RaceHandlerComponent } from './race-handler/race-handler.component';
import { GarageHandlerComponent } from './garage-handler/garage-handler.component';
import { EventHandlerComponent } from './event-handler/event-handler.component';
import { SessionsHandlerComponent } from './sessions-handler/sessions-handler.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    RfButtonComponent,
    ChatComponent,
    BetterUiComponent,
    StartHandlerComponent,
    RaceHandlerComponent,
    GarageHandlerComponent,
    EventHandlerComponent,
    SessionsHandlerComponent
  ],
  providers: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const buttonWebComponent = createCustomElement(RfButtonComponent, {injector});
    customElements.define("rf-button", buttonWebComponent);

    const chatWebComponent = createCustomElement(ChatComponent, {injector});
    customElements.define("rf-chat", chatWebComponent);

    const betterUiWebComponent = createCustomElement(BetterUiComponent, {injector});
    customElements.define("rf-better-ui", betterUiWebComponent);

    const startHandlerWebComponent = createCustomElement(StartHandlerComponent, {injector});
    customElements.define("rf-start-handler", startHandlerWebComponent);

    const raceHandlerWebComponent = createCustomElement(RaceHandlerComponent, {injector});
    customElements.define("rf-race-handler", raceHandlerWebComponent);

    const garageHandlerWebComponent = createCustomElement(GarageHandlerComponent, {injector});
    customElements.define("rf-garage-handler", garageHandlerWebComponent);

    const eventHandlerWebComponent = createCustomElement(EventHandlerComponent, {injector});
    customElements.define("rf-event-handler", eventHandlerWebComponent);

    const sessionsHandlerWebComponent = createCustomElement(SessionsHandlerComponent, {injector});
    customElements.define("rf-sessions-handler", sessionsHandlerWebComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
