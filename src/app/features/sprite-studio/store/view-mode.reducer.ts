import { createReducer, on } from '@ngrx/store';
import { setViewMode } from './view-mode.actions';

export interface ViewModeState {
  mode: 'actual' | 'fixed';
}

export const initialState: ViewModeState = {
  mode: 'actual'
};

export const viewModeReducer = createReducer(
  initialState,
  on(setViewMode, (state, { mode }) => ({ ...state, mode }))
);
