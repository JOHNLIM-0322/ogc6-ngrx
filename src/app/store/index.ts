import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as fromOwner from '../owner/store/owner.reducer';
// import * as fromHome from '../home/state/home.reducer';
// import * as fromGlobalActCond from '../global-act-cond/state/global-act-cond.reducer';
// import * as fromMailboxDef from '../mailbox-definition/state/mailbox-def.reducer';
// import * as fromNode from '../node/state/node.reducer';
// import * as fromOwnerViaGranting from '../owner-via-granting/state/owner-via-granting.reducer';
// import * as fromResourceMaster from '../resource-master/state/resource-master.reducer';
// import * as fromGeneral from '../general/state/general.reducer';
// import * as fromAdministration from '../administration/state/administration.reducer';


export interface AppState {
  // [fromApp.appsFeatureKey]: fromApp.IAppState,
  // [fromHome.homesFeatureKey]: fromHome.HomeState;
  // [fromGlobalActCond.globalActCondsFeatureKey]: fromGlobalActCond.GlobalActCondState;
  // [fromMailboxDef.mailboxDevesFeatureKey]: fromMailboxDef.MailboxDefState;
  // [fromNode.nodesFeatureKey]: fromNode.NodeState;
  // [fromOwnerViaGranting.ownerViaGrantingsFeatureKey]: fromOwnerViaGranting.OVGState;
  // [fromResourceMaster.resourceMastersFeatureKey]: fromResourceMaster.ResourceMasterState;
  // [fromGeneral.generalsFeatureKey]: fromGeneral.GeneralState;
  // [fromAdministration.administrationsFeatureKey]: fromAdministration.AdministrationState;
  
  [fromOwner.ownersFeatureKey]: fromOwner.IOwnerState;

}

export const reducers: ActionReducerMap<AppState> = {
  // [fromApp.appsFeatureKey]: fromApp.IAppreducer,
  // [fromHome.homesFeatureKey]: fromHome.reducer,
  // [fromGlobalActCond.globalActCondsFeatureKey]: fromGlobalActCond.reducer,
  // [fromMailboxDef.mailboxDevesFeatureKey]: fromMailboxDef.reducer,
  // [fromNode.nodesFeatureKey]: fromNode.reducer,
  // [fromOwnerViaGranting.ownerViaGrantingsFeatureKey]: fromOwnerViaGranting.reducer,
  // [fromResourceMaster.resourceMastersFeatureKey]: fromResourceMaster.reducer,
  // [fromGeneral.generalsFeatureKey]: fromGeneral.reducer,
  // [fromAdministration.administrationsFeatureKey]: fromAdministration.reducer,
  
  [fromOwner.ownersFeatureKey]: fromOwner.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
