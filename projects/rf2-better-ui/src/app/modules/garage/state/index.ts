import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { GarageState, reducer } from './garage.reducer';

export const garageFeatureKey = 'garageFeature';

export interface State {
  garage: GarageState;
}

export const reducers: ActionReducerMap<State> = {
  garage: reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
