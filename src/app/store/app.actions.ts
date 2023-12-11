import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { App } from './app.model';

export const AppActions = createActionGroup({
  source: 'App/API',
  events: {
    'Load Apps': props<{ apps: App[] }>(),
    //'Add App': props<{ app: App }>(),
    'Upsert App': props<{ app: App }>(),
    'Add Apps': props<{ apps: App[] }>(),
    'Upsert Apps': props<{ apps: App[] }>(),
    'Update App': props<{ app: Update<App> }>(),
    'Update Apps': props<{ apps: Update<App>[] }>(),
    'Delete App': props<{ id: string }>(),
    'Delete Apps': props<{ ids: string[] }>(),
    'Clear Apps': emptyProps(),
  }
});

export const addApp = createAction(
  '[App Component] Add App',
  props<{ app: App }>()
);
