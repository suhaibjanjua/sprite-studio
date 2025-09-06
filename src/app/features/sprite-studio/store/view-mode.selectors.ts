import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewModeState } from './view-mode.reducer';

export const selectViewModeState = createFeatureSelector<ViewModeState>('viewMode');
export const selectViewMode = createSelector(selectViewModeState, state => state.mode);
