import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as GarageActions from './garage.actions';
import { Setup, SetupSummary } from '../interfaces/setup';

export interface GarageState {
  setups: Setup[];
  currentSetupSummary: SetupSummary;
  currentSetupName: string;
  currentNote: string;
  showOnlyRelevant: boolean;
}

export const initialState: GarageState = {
  setups: [],
  currentSetupSummary: undefined,
  currentSetupName: undefined,
  currentNote: undefined,
  showOnlyRelevant: false
};

export const reducer: ActionReducer<GarageState, Action> = createReducer(
  initialState,
  on(GarageActions.loadSetups, (state: GarageState) => ({
    ...state,
    setups: []
  })),

  on(GarageActions.setupsLoaded, (state: GarageState, {setups}) => ({
    ...state,
    setups
  })),

  on(GarageActions.setupSummaryLoaded, (state: GarageState, summary) => ({
    ...state,
    currentSetupSummary: summary
  })),

  on(GarageActions.selectSetup, (state: GarageState, {setup}) => ({
    ...state,
    currentSetupName: setup.name
  })),

  on(GarageActions.notesLoaded, (state: GarageState, {notes}) => ({
    ...state,
    currentNote: notes
  })),

  on(GarageActions.showingRelevantLoaded, (state: GarageState, {showOnlyRelevant}) => ({
    ...state,
    showOnlyRelevant
  })),

  on(GarageActions.changeShowOnlyRelevant, (state: GarageState, {showOnlyRelevant}) => ({
    ...state,
    showOnlyRelevant
  }))
);
