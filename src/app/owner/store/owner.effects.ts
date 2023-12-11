import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromOwnerActions from './owner.actions';
//import * as fromOwnerModel from '../owner.model';
//import * as fromOwnerSelectors from '../state/owner.selectors';
import { IOwnerState } from './owner.reducer';
import { Store, select } from '@ngrx/store';
import { OwnerService } from '../services/owner.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class OwnerEffects {
  constructor(
    private actions$: Actions,
    private ownersvc: OwnerService,
    private store: Store<IOwnerState>
  ) {}

  loadOwners$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.loadOwners),
      mergeMap(() =>
        this.ownersvc.getOwnerList().pipe(
          map((data) => {
            //console.log('owners effect owner: ', data);
            return fromOwnerActions.loadOwnersSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.loadOwnersFailure({ error }))
          )
        )
      )
    );
  });

  updateJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.updateJob),
      switchMap((action) =>
        this.ownersvc.updateJob(action.owners, action.owname, action.nmname, action.jbname, action.updatedJob).pipe(
          map((data) => {
            return fromOwnerActions.updateJobSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.updateJobFailure({ error }))
          )
        )
      )
    );
  });

  addJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.addJob),
      switchMap((action) =>
        this.ownersvc.addJob(action.owners, action.owname, action.nmname, action.newJob).pipe(
          map((data) => {
            return fromOwnerActions.addJobSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.addJobFailure({ error }))
          )
        )
      )
    );
  });

  deleteJob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.deleteJob),
      switchMap((action) =>
        this.ownersvc.deleteJob(action.owners, action.owname, action.nmname, action.jbname).pipe(
          map((data) => {
            return fromOwnerActions.deleteJobSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.deleteJobFailure({ error }))
          )
        )
      )
    );
  });

  updateNetwork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.updateNetwork),
      switchMap((action) =>
        this.ownersvc.updateNetwork(action.owners, action.owname, action.nmname, action.updatedNetwork).pipe(
          map((data) => {
            return fromOwnerActions.updateNetworkSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.updateNetworkFailure({ error }))
          )
        )
      )
    );
  });

  addNetwork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.addNetwork),
      switchMap((action) =>
        this.ownersvc.addNetwork(action.owners, action.owname, action.newNetwork).pipe(
          map((data) => {
            return fromOwnerActions.addNetworkSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.addNetworkFailure({ error }))
          )
        )
      )
    );
  });

  deleteNetwork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromOwnerActions.deleteNetwork),
      switchMap((action) =>
        this.ownersvc.deleteNetwork(action.owners, action.owname, action.nmname).pipe(
          map((data) => {
            return fromOwnerActions.deleteNetworkSuccess({ owners: data });
          }),
          catchError((error) =>
            of(fromOwnerActions.deleteNetworkFailure({ error }))
          )
        )
      )
    );
  });
}
