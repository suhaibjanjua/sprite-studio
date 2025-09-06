import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IconsState } from './icons.reducer';

export const selectIconsState = createFeatureSelector<IconsState>('icons');
export const selectIcons = createSelector(selectIconsState, state => state.icons);
