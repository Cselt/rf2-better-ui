import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { createCustomElement } from '@angular/elements';
import { ChatComponent } from './components/chat/chat.component';
import { BetterUiComponent } from './components/better-ui/better-ui.component';
import { StartHandlerComponent } from './components/start-handler/start-handler.component';
import { RaceHandlerComponent } from './components/race-handler/race-handler.component';
import { GarageHandlerComponent } from './components/garage-handler/garage-handler.component';
import { EventHandlerComponent } from './components/event-handler/event-handler.component';
import { SessionsHandlerComponent } from './components/sessions-handler/sessions-handler.component';
import { MultiplayerHandlerComponent } from './components/multiplayer-handler/multiplayer-handler.component';
import { RaceCountdownTimerComponent } from './components/race-countdown-timer/race-countdown-timer.component';
import { ExitDialogComponent } from './components/exit-dialog/exit-dialog.component';
import { GarageModule } from './modules/garage/garage.module';
import { environment } from '../environments/environment';
import { UiComponentsModule } from './modules/ui-components/ui-components.module';
import { AppComponent } from './app.component';
import { SettingsModule } from './modules/settings/settings.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    UiComponentsModule,
    GarageModule,
    SettingsModule
  ],
  declarations: [
    AppComponent,
    ChatComponent,
    BetterUiComponent,
    StartHandlerComponent,
    RaceHandlerComponent,
    GarageHandlerComponent,
    EventHandlerComponent,
    SessionsHandlerComponent,
    MultiplayerHandlerComponent,
    RaceCountdownTimerComponent,
    ExitDialogComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        panelClass: 'rfPanel'
      } as MatDialogConfig
    }
  ]
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const chatWebComponent = createCustomElement(ChatComponent, { injector });
    customElements.define('rf-chat', chatWebComponent);

    const betterUiWebComponent = createCustomElement(BetterUiComponent, { injector });
    customElements.define('rf-better-ui', betterUiWebComponent);

    const raceCountDownTimerWebComponent = createCustomElement(RaceCountdownTimerComponent, { injector });
    customElements.define('rf-race-countdown-timer', raceCountDownTimerWebComponent);
  }
}
