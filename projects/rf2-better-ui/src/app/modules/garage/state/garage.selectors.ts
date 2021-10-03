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
