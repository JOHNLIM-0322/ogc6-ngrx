import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { App } from './app.model';
import { AppActions } from './app.actions';

export const appsFeatureKey = 'apps';
import * as fromAppAction from './app.actions';
//import { Owner } from '../owner/models/owner.model';


export interface IAppState extends EntityState<App> {
  // additional entities state properties
}

export const adapter: EntityAdapter<App> = createEntityAdapter<App>();

export const initialState: IAppState = adapter.getInitialState({
  // additional entity state properties
});

export const IAppreducer = createReducer(
  initialState,
  on(fromAppAction.addApp,
    (state, action) => adapter.addOne(action.app, state)
  ),
  on(AppActions.upsertApp,
    (state, action) => adapter.upsertOne(action.app, state)
  ),
  on(AppActions.addApps,
    (state, action) => adapter.addMany(action.apps, state)
  ),
  on(AppActions.upsertApps,
    (state, action) => adapter.upsertMany(action.apps, state)
  ),
  on(AppActions.updateApp,
    (state, action) => adapter.updateOne(action.app, state)
  ),
  on(AppActions.updateApps,
    (state, action) => adapter.updateMany(action.apps, state)
  ),
  on(AppActions.deleteApp,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AppActions.deleteApps,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AppActions.loadApps,
    (state, action) => adapter.setAll(action.apps, state)
  ),
  on(AppActions.clearApps,
    state => adapter.removeAll(state)
  ),
);

// export const appsFeature = createFeature({
//   name: appsFeatureKey,
//   reducer,
//   extraSelectors: ({ selectAppsState }) => ({
//     ...adapter.getSelectors(selectAppsState)
//   }),
// });

// export const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal,
// } = appsFeature;
