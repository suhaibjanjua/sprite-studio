import { createAction, props } from '@ngrx/store';

export const setViewMode = createAction('[SpriteStudio] Set View Mode', props<{ mode: 'actual' | 'fixed' }>());
