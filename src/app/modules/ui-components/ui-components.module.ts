import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfButtonComponent } from './components/rf-button/rf-button.component';
import { SpinBoxComponent } from './components/spin-box/spin-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RfButtonComponent,
    SpinBoxComponent,
  ],
  exports: [
    RfButtonComponent,
    SpinBoxComponent,
  ]
})
export class UiComponentsModule {
}
