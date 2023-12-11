import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Job, NetworkMaster, Owner } from '../model/owner.model';

export const loadOwners = createAction('[Owner] load owners');
export const loadOwnersSuccess = createAction(
    '[Owner] load owners success',
    props<{owners: Owner[]}>()
);
export const loadOwnersFailure = createAction(
    '[Owner] load owners failure',
    props<{error: any}>()
);

// update Job
export const updateJob = createAction(
    '[Owner] update job',
    props<{owners: Owner[], owname: string, nmname: string, jbname: string, updatedJob: Job}>()
);
export const updateJobSuccess = createAction(
    '[Owner] update job success',
    props<{owners: Owner[]}>()
);
export const updateJobFailure = createAction(
    '[Owner] update job failure',
    props<{error: any}>()
);

// add Job
export const addJob = createAction(
    '[Owner] add job',
    props<{owners: Owner[], owname: string, nmname: string, newJob: Job}>()
);
export const addJobSuccess = createAction(
    '[Owner] add job success',
    props<{owners: Owner[]}>()
);
export const addJobFailure = createAction(
    '[Owner] add job failure',
    props<{error: any}>()
);

// delete Job
export const deleteJob = createAction(
    '[Owner] delete job',
    props<{owners: Owner[], owname: string, nmname: string, jbname: string}>()
);
export const deleteJobSuccess = createAction(
    '[Owner] delete job success',
    props<{owners: Owner[]}>()
);
export const deleteJobFailure = createAction(
    '[Owner] delete job failure',
    props<{error: any}>()
);

// update Network
export const updateNetwork = createAction(
    '[Owner] update network',
    props<{owners: Owner[], owname: string, nmname: string, updatedNetwork: NetworkMaster}>()
);
export const updateNetworkSuccess = createAction(
    '[Owner] update network success',
    props<{owners: Owner[]}>()
);
export const updateNetworkFailure = createAction(
    '[Owner] update network failure',
    props<{error: any}>()
);

// add Network
export const addNetwork = createAction(
    '[Owner] add network',
    props<{owners: Owner[], owname: string, newNetwork: NetworkMaster}>()
);
export const addNetworkSuccess = createAction(
    '[Owner] add network success',
    props<{owners: Owner[]}>()
);
export const addNetworkFailure = createAction(
    '[Owner] add network failure',
    props<{error: any}>()
);

// delete Network
export const deleteNetwork = createAction(
    '[Owner] delete network',
    props<{owners: Owner[], owname: string, nmname: string}>()
);
export const deleteNetworkSuccess = createAction(
    '[Owner] delete network success',
    props<{owners: Owner[]}>()
);
export const deleteNetworkFailure = createAction(
    '[Owner] delete network failure',
    props<{error: any}>()
);