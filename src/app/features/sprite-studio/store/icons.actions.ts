import { createAction, props } from '@ngrx/store';

export const loadIcons = createAction('[SpriteStudio] Load Icons', props<{ icons: any[] }>());
export const clearIcons = createAction('[SpriteStudio] Clear Icons');
