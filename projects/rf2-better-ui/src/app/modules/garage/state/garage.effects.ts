import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GarageActions from './garage.actions';
import { GarageService } from '../services/garage.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Setup } from '../interfaces/setup';

@Injectable()
export class GarageEffects {

  loadSetups$ = createEffect(() => this.actions$.pipe(
    ofType(GarageActions.loadSetups),
    switchMap(() => this.service.loadSetups()),
    map((setups: Setup[]) => GarageActions.setupsLoaded({setups}))
  ));

  loadSavedSetup$ = createEffect(() => this.actions$.pipe(
    ofType(GarageActions.loadSavedSetup),
    switchMap((setup: Setup) => this.service.loadSavedSetup(setup.name)),
    map(() => GarageActions.updateView())
  ));

  updateView$ = createEffect(() => this.actions$.pipe(
    ofType(GarageActions.updateView),
    map(() => angular.element('left-section').controller()),
    switchMap((controller) => this.service.loadSetupSummary().pipe(
      tap((summary: any) => {
        const summaryService: any = controller.summaryService;
        controller.settingsSummary = summary;
        summaryService.initSummaryBoxes(summary.settingSummaries);
      }),
      switchMap((summary: any) => this.service.loadNotes(summary.activeSetup).pipe(
        tap((notes: string) => controller.setupNotes = notes),
        switchMap(() => this.service.loadNotes(summary.compareToSetup)),
        tap((notes: string) => controller.comparedSetupNotes = notes)
      )),
    )),
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private service: GarageService) {
  }

}
