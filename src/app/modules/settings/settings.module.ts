import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsHandlerComponent } from './components/settings-handler/settings-handler.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    UiComponentsModule
  ],
  declarations: [
    SettingsHandlerComponent,
    SettingsDialogComponent
  ],
})
export class SettingsModule {
}
