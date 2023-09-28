import { AppState } from "./app.sate.interface";
import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as appStateActions from './app.actions';

export const initialState: AppState = {
  isLayoutDirectionRtl: false
};

const appFeature = createFeature({
  name: 'appStore',
  reducer: createReducer(
    initialState,
    on(appStateActions.changeLayoutDirectionToRtl, (state, { isLayoutDirectionRtl }) => ({
      ...state,
      isLayoutDirectionRtl,
    })),
  )
});

export const {
  name: appFeatureKey,
  reducer: appReducers,
  selectIsLayoutDirectionRtl
} = appFeature;
