import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SetupsComponent } from './components/setups/setups.component';
import * as fromGarage from './state';
import { GarageEffects } from './state/garage.effects';
import { GarageService } from './services/garage.service';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { SetupTreeComponent } from './components/setup-tree/setup-tree.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmPopupComponent } from './components/delete-confirm-popup/delete-confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(fromGarage.garageFeatureKey, fromGarage.reducers, {metaReducers: fromGarage.metaReducers}),
    EffectsModule.forFeature([
      GarageEffects
    ]),
    CdkTreeModule,
    UiComponentsModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    SetupsComponent,
    SetupTreeComponent,
    DeleteConfirmPopupComponent
  ],
  providers: [
    GarageService
  ],
  exports: [
    SetupsComponent
  ]
})
export class GarageModule { }
