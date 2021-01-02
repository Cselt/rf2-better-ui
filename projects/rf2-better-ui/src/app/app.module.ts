import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { RfButtonComponent } from './rf-button/rf-button.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    RfButtonComponent
  ],
  providers: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(RfButtonComponent, {injector});
    customElements.define("rf-button", webComponent);
  }

  ngDoBootstrap(appRef: ApplicationRef) {
  }
}
