import { createAction, props } from '@ngrx/store';
import { Setup } from '../interfaces/setup';

export const loadSetups = createAction(
  '[Garage] Load Setups'
);

export const setupsLoaded = createAction(
  '[Garage] Setups Loaded',
  props<{setups: Setup[]}>()
);
