import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SetupsComponent } from './components/setups/setups.component';
import * as fromGarage from './state';
import { GarageEffects } from './state/garage.effects';
import { GarageService } from './services/garage.service';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromGarage.garageFeatureKey, fromGarage.reducers, {metaReducers: fromGarage.metaReducers}),
    EffectsModule.forFeature([
      GarageEffects
    ]),
    UiComponentsModule
  ],
  declarations: [
    SetupsComponent
  ],
  providers: [
    GarageService
  ]
})
export class GarageModule { }
