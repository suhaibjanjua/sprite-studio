import { createReducer, on } from '@ngrx/store';
import { loadIcons, clearIcons } from './icons.actions';

export interface IconsState {
  icons: any[];
}

export const initialState: IconsState = {
  icons: []
};

export const iconsReducer = createReducer(
  initialState,
  on(loadIcons, (state, { icons }) => ({ ...state, icons })),
  on(clearIcons, state => ({ ...state, icons: [] }))
);
