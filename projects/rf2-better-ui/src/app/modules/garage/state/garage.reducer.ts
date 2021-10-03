import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as GarageActions from './garage.actions';
import { Setup } from '../interfaces/setup';

export interface GarageState {
  setups: Setup[];
}

export const initialState: GarageState = {
  setups: []
};

export const reducer: ActionReducer<GarageState, Action> = createReducer(
  initialState,
  on(GarageActions.setupsLoaded, (state: GarageState, {setups}) => ({
    ...state,
    setups
  }))
);
