import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as GarageActions from './garage.actions';
import { Setup, SetupSummary } from '../interfaces/setup';

export interface GarageState {
  setups: Setup[];
  setupsLoading: boolean;
  currentSetupSummary: SetupSummary;
  selectedSetupName: string;
  currentNote: string;
  showOnlyRelevant: boolean;
  currentTrackFolder: string;
}

export const initialState: GarageState = {
  setups: [],
  setupsLoading: false,
  currentSetupSummary: undefined,
  selectedSetupName: undefined,
  currentNote: undefined,
  showOnlyRelevant: false,
  currentTrackFolder: undefined
};

export const reducer: ActionReducer<GarageState, Action> = createReducer(
  initialState,
  on(GarageActions.loadSetups, (state: GarageState) => ({
    ...state,
    setups: [],
    setupsLoading: true
  })),

  on(GarageActions.setupsLoaded, (state: GarageState, { setups }) => ({
    ...state,
    setups,
    setupsLoading: false
  })),

  on(
    GarageActions.setupSummaryLoaded,
    (state: GarageState, summary) =>
      ({
        ...state,
        currentSetupSummary: summary
      } as GarageState)
  ),

  on(
    GarageActions.selectSetup,
    (state: GarageState, { setup }) =>
      ({
        ...state,
        selectedSetupName: setup.name
      } as GarageState)
  ),

  on(GarageActions.notesLoaded, (state: GarageState, { notes }) => ({
    ...state,
    currentNote: notes
  })),

  on(GarageActions.showingRelevantLoaded, (state: GarageState, { showOnlyRelevant }) => ({
    ...state,
    showOnlyRelevant
  })),

  on(GarageActions.changeShowOnlyRelevant, (state: GarageState, { showOnlyRelevant }) => ({
    ...state,
    showOnlyRelevant
  })),

  on(GarageActions.currentTrackFolderLoaded, (state: GarageState, { currentTrackFolder }) => ({
    ...state,
    currentTrackFolder
  }))
);
