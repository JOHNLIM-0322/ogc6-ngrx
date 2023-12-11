import { createFeature, createReducer, on } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { Owner } from '../model/owner.model';
import * as OwnerActions from './owner.actions';
import * as sharedModel from '../../@shared/model/shared.model';

export const ownersFeatureKey = 'owners';

export interface OwnerState extends EntityState<Owner> {
  // additional entities state properties
  status: sharedModel.LOADING_STATUS;
}

export interface IOwnerState {
  owner: OwnerState;
}

export const adapter: EntityAdapter<Owner> = createEntityAdapter<Owner>({
  selectId: (owner) => owner.name,
});

export const initialState: IOwnerState = {
  owner: adapter.getInitialState({ status: sharedModel.LOADING_STATUS.START }),
};

export const reducer = createReducer(
  initialState,
  on(OwnerActions.loadOwners, (state, action) => ({
    ...state,
    owner: {
      ...state.owner,
      status: sharedModel.LOADING_STATUS.START,
    },
  })),
  on(OwnerActions.loadOwnersSuccess, (state, action) => ({
    ...state,
    owner: adapter.setAll(action.owners, {
      ...state.owner,
      status: sharedModel.LOADING_STATUS.SUCCESS,
    }),
  })),
  on(OwnerActions.updateJobSuccess, (state, action) => {
    return {
      ...state,
      owner: adapter.setAll(action.owners, state.owner),
    };
  }),
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors();