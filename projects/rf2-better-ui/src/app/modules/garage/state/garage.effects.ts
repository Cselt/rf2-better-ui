import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GarageActions from './garage.actions';
import { GarageService } from '../services/garage.service';
import { map, switchMap } from 'rxjs/operators';
import { Setup } from '../interfaces/setup';

@Injectable()
export class GarageEffects {

  loadSetups$ = createEffect(() => this.actions$.pipe(
    ofType(GarageActions.loadSetups),
    switchMap(() => this.service.loadSetups()),
    map((setups: Setup[]) => GarageActions.setupsLoaded({setups}))
  ));

  constructor(private actions$: Actions,
              private service: GarageService) {
  }

}
