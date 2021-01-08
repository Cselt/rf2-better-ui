import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { createCustomElement } from '@angular/elements';
import { RfButtonComponent } from './rf-button/rf-button.component';
import { ChatComponent } from './chat/chat.component';
import { BetterUiComponent } from './better-ui/better-ui.component';
import { StartHandlerComponent } from './start-handler/start-handler.component';
import { RaceHandlerComponent } from './race-handler/race-handler.component';

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
    RaceHandlerComponent
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
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
