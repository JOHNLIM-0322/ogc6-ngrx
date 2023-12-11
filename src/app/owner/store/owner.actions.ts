import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Job, Owner } from '../model/owner.model';

export const loadOwners = createAction('[Owner] load owners');
export const loadOwnersSuccess = createAction(
    '[Owner] load owners success',
    props<{owners: Owner[]}>()
);
export const loadOwnersFailure = createAction(
    '[Owner] load owners failure',
    props<{error: any}>()
);

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