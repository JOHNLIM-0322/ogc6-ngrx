import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOwnerReducer from './owner.reducer';

// Get feature from store
export const selectIOwnerState =
  createFeatureSelector<fromOwnerReducer.IOwnerState>(
    fromOwnerReducer.ownersFeatureKey
  );

// Select status name from feature
export const selectStatus = createSelector(
  selectIOwnerState,
  (state: fromOwnerReducer.IOwnerState) => state.owner.status
);

export const selectOwnerState = createSelector(
  selectIOwnerState,
  (state: fromOwnerReducer.IOwnerState) => state.owner
);

export const selectAllOwners = createSelector(
  selectOwnerState,
  fromOwnerReducer.selectAll
);
