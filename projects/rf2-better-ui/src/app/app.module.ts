import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { createCustomElement } from '@angular/elements';
import { RfButtonComponent } from './rf-button/rf-button.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    RfButtonComponent,
    ChatComponent
  ],
  providers: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const buttonWebComponent = createCustomElement(RfButtonComponent, {injector});
    customElements.define("rf-button", buttonWebComponent);

    const chatWebComponent = createCustomElement(ChatComponent, {injector});
    customElements.define("rf-chat", chatWebComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
  }
}
