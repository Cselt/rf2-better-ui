import { createAction, props } from '@ngrx/store';
import { Setup, SetupSummary } from '../interfaces/setup';

export const loadSetups = createAction('[Garage] Load Setups');

export const setupsLoaded = createAction('[Garage] Setups Loaded', props<{ setups: Setup[] }>());

export const loadSavedSetup = createAction('[Garage] Load Saved Setup');

export const updateView = createAction('[Garage] Update View');

export const loadSetupSummary = createAction('[Garage] Load Setup Summary');

export const setupSummaryLoaded = createAction('[Garage] Setup Summary Loaded', props<SetupSummary>());

export const selectSetup = createAction('[Garage] Select Setup', props<{ setup: Setup }>());

export const loadNotes = createAction('[Garage] Load Notes', props<{ setupName: string }>());

export const notesLoaded = createAction('[Garage] Notes Loaded', props<{ notes: string }>());

export const loadShowingRelevant = createAction('[Garage] Load Showing Relevant');

export const showingRelevantLoaded = createAction(
  '[Garage] Showing Relevant Loaded',
  props<{ showOnlyRelevant: boolean }>()
);

export const changeShowOnlyRelevant = createAction(
  '[Garage] Change Show Only Relevant',
  props<{ showOnlyRelevant: boolean }>()
);

export const deleteSelectedSetup = createAction('[Garage] Delete Selected Setup');

export const compareSelected = createAction('[Garage] Compare Selected');
