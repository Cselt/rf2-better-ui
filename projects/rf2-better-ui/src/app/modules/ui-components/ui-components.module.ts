import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfButtonComponent } from './components/rf-button/rf-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RfButtonComponent
  ],
  exports: [
    RfButtonComponent
  ]
})
export class UiComponentsModule { }
