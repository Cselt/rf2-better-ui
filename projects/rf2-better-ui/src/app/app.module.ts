import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { createCustomElement } from '@angular/elements';
import { RfButtonComponent } from './components/rf-button/rf-button.component';
import { ChatComponent } from './components/chat/chat.component';
import { BetterUiComponent } from './components/better-ui/better-ui.component';
import { StartHandlerComponent } from './components/start-handler/start-handler.component';
import { RaceHandlerComponent } from './components/race-handler/race-handler.component';
import { GarageHandlerComponent } from './components/garage-handler/garage-handler.component';
import { EventHandlerComponent } from './components/event-handler/event-handler.component';
import { SessionsHandlerComponent } from './components/sessions-handler/sessions-handler.component';
import { MultiplayerHandlerComponent } from './components/multiplayer-handler/multiplayer-handler.component';
import { RaceCountdownTimerComponent } from './components/race-countdown-timer/race-countdown-timer.component';

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
    SessionsHandlerComponent,
    MultiplayerHandlerComponent,
    RaceCountdownTimerComponent
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

    const multiplayerHandlerWebComponent = createCustomElement(MultiplayerHandlerComponent, {injector});
    customElements.define("rf-multiplayer-handler", multiplayerHandlerWebComponent);

    const raceCountDownTimerWebComponent = createCustomElement(RaceCountdownTimerComponent, {injector});
    customElements.define("rf-race-countdown-timer", raceCountDownTimerWebComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
