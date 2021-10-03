import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SetupsComponent } from './components/setups/setups.component';
import * as fromGarage from './state';
import { GarageEffects } from './state/garage.effects';
import { GarageService } from './services/garage.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromGarage.garageFeatureKey, fromGarage.reducers, {metaReducers: fromGarage.metaReducers}),
    EffectsModule.forFeature([
      GarageEffects
    ])
  ],
  declarations: [
    SetupsComponent
  ],
  providers: [
    GarageService
  ]
})
export class GarageModule { }
