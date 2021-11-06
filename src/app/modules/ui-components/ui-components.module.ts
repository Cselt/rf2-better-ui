import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfButtonComponent } from './components/rf-button/rf-button.component';
import { SpinBoxComponent } from './components/spin-box/spin-box.component';
import { PopupHeaderComponent } from './components/popup-header/popup-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RfButtonComponent, SpinBoxComponent, PopupHeaderComponent],
  exports: [RfButtonComponent, SpinBoxComponent, PopupHeaderComponent]
})
export class UiComponentsModule {}
