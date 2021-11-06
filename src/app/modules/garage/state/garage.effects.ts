import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as GarageActions from './garage.actions';
import * as GarageSelectors from './garage.selectors';
import { GarageService } from '../services/garage.service';
import { Setup, SetupSummary } from '../interfaces/setup';
import { GarageState } from './garage.reducer';

interface SummaryService {
  initSummaryBoxes(data: unknown): void;
}

@Injectable()
export class GarageEffects {
  loadSetups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.loadSetups),
      switchMap(() => this.service.loadSetups()),
      map((setups: Setup[]) => GarageActions.setupsLoaded({ setups }))
    )
  );

  loadSavedSetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.loadSavedSetup),
      concatLatestFrom(() => this.store.pipe(select(GarageSelectors.selectDisplayedSetupName))),
      switchMap(([, setupName]: [never, string]) => this.service.loadSavedSetup(setupName)),
      map(() => GarageActions.updateView())
    )
  );

  updateView$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GarageActions.updateView),
        map(() => angular.element('left-section').controller()),
        switchMap(controller =>
          this.service.loadSetupSummary().pipe(
            tap((summary: SetupSummary) => {
              const summaryService: SummaryService = controller.summaryService;
              controller.settingsSummary = summary;
              summaryService.initSummaryBoxes(summary.settingSummaries);
            }),
            switchMap((summary: SetupSummary) =>
              this.service.loadNotes(summary.activeSetup).pipe(
                tap((notes: string) => (controller.setupNotes = notes)),
                switchMap(() => this.service.loadNotes(summary.compareToSetup)),
                tap((notes: string) => (controller.comparedSetupNotes = notes))
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  loadSetupSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.loadSetupSummary),
      switchMap(() => this.service.loadSetupSummary()),
      mergeMap((summary: SetupSummary) => [
        GarageActions.setupSummaryLoaded(summary),
        GarageActions.loadNotes({ setupName: summary.activeSetup })
      ])
    )
  );

  selectSetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.selectSetup),
      map(action => GarageActions.loadNotes({ setupName: action.setup.name }))
    )
  );

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.loadNotes),
      switchMap((data: { setupName: string }) => this.service.loadNotes(data.setupName)),
      map((notes: string) => GarageActions.notesLoaded({ notes }))
    )
  );

  loadShowingOnlyRelevant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.loadShowingRelevant),
      switchMap(() => this.service.loadShowingOnlyRelevant()),
      map((showOnlyRelevant: boolean) => GarageActions.showingRelevantLoaded({ showOnlyRelevant }))
    )
  );

  changeShowOnlyRelevant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.changeShowOnlyRelevant),
      switchMap(action => this.service.changeShowingOnlyRelevant(action.showOnlyRelevant)),
      map(() => GarageActions.loadSetups())
    )
  );

  deleteSetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.deleteSelectedSetup),
      concatLatestFrom(() => this.store.pipe(select(GarageSelectors.selectDisplayedSetupName))),
      switchMap(([, setup]: [never, string]) => this.service.deleteSetup(setup)),
      map(() => GarageActions.loadSetups())
    )
  );

  compare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.compareSelected),
      concatLatestFrom(() => this.store.pipe(select(GarageSelectors.selectDisplayedSetupName))),
      switchMap(([, setup]: [never, string]) => this.service.compareSetup(setup)),
      map(() => GarageActions.updateView())
    )
  );

  setDefaultSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.setDefaultSelected),
      concatLatestFrom(() => this.store.pipe(select(GarageSelectors.selectDisplayedSetupName))),
      switchMap(([, setup]: [never, string]) => this.service.setDefault(setup)),
      map(() => GarageActions.updateView())
    )
  );

  factoryDefault$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.factoryDefault),
      switchMap(() => this.service.loadSavedSetup('<Factory Defaults>')),
      map(() => GarageActions.updateView())
    )
  );

  loadCurrentTrackFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.loadCurrentTrackFolder),
      switchMap(() => this.service.loadCurrentTrackFolder()),
      map((currentTrackFolder: string) => GarageActions.currentTrackFolderLoaded({ currentTrackFolder }))
    )
  );

  copySetup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GarageActions.copySetup),
      switchMap((data: { dest: string; src: string }) => this.service.copySetup(data.dest, data.src)),
      map(() => GarageActions.loadSetups())
    )
  );

  constructor(private actions$: Actions, private store: Store<GarageState>, private service: GarageService) {}
}
