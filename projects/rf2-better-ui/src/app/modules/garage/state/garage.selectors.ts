import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromState from './index';
import { Setup } from '../interfaces/setup';
import { GarageState } from './garage.reducer';
import { State } from './index';

const selectGarageFeatureState = createFeatureSelector(fromState.garageFeatureKey);

export const selectGarageState = createSelector(
  selectGarageFeatureState,
  (state: State) => state.garage
);

export const selectSetups: MemoizedSelector<GarageState, Setup[]> = createSelector(
  selectGarageState,
  (state: GarageState) => state.setups
);

export const selectSetupsLoading: MemoizedSelector<GarageState, boolean> = createSelector(
  selectGarageState,
  (state: GarageState) => state.setupsLoading
);

export const selectDisplayedSetupName: MemoizedSelector<GarageState, string> = createSelector(
  selectGarageState,
  (state: GarageState) => state.selectedSetupName ?? state.currentSetupSummary?.activeSetup
);

export const selectActiveSetupName: MemoizedSelector<GarageState, string> = createSelector(
  selectGarageState,
  (state: GarageState) => state.currentSetupSummary?.activeSetup
);

export const selectCurrentNotes: MemoizedSelector<GarageState, string> = createSelector(
  selectGarageState,
  (state: GarageState) => state.currentNote
);

export const showingOnlyRelevant: MemoizedSelector<GarageState, boolean> = createSelector(
  selectGarageState,
  (state: GarageState) => state.showOnlyRelevant
);
