import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromOwnerActions from './owner.actions';
//import * as fromOwnerModel from '../owner.model';
//import * as fromOwnerSelectors from '../state/owner.selectors';
import { IOwnerState } from './owner.reducer';
import { Store, select } from '@ngrx/store';
import { OwnerService } from '../services/owner.service';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { OwnerData } from '../data/owner.data';
import { Owner } from '../model/owner.model';

@Injectable()
export class OwnerEffects {

  constructor(
    private actions$: Actions,
    private ownersvc: OwnerService,
    private ownerdata: OwnerData,
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
      switchMap ((action) =>
        this.ownersvc.updateJob(action.owname, action.nmname, action.jbname, action.updatedJob).pipe(
          switchMap(() => {
            return of(
              fromOwnerActions.updateJobSuccess({ owners: action.owners }),
            )
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
        this.ownersvc.addJob(action.owname, action.nmname, action.newJob).pipe(
          switchMap(() => {
            return of(
              fromOwnerActions.addJobSuccess({ owners: action.owners }),
            )
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
        this.ownersvc.deleteJob(action.owname, action.nmname, action.jbname).pipe(
          switchMap(() => {
            return of(
              fromOwnerActions.deleteJobSuccess({ owners: action.owners }),
            )
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
        this.ownersvc.updateNetwork(action.owname, action.nmname, action.updatedNetwork).pipe(
          switchMap(() => {
            return of(
              fromOwnerActions.updateNetworkSuccess({ owners: action.owners }),
            )
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
        this.ownersvc.addNetwork(action.owname, action.newNetwork).pipe(
          switchMap(() => {
            return of(
              fromOwnerActions.addNetworkSuccess({ owners: action.owners }),
            )
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
        this.ownersvc.deleteNetwork(action.owname, action.nmname).pipe(
          switchMap(() => {
            return of(
              fromOwnerActions.deleteNetworkSuccess({ owners: action.owners }),
            )
          }),
          catchError((error) =>
            of(fromOwnerActions.deleteNetworkFailure({ error }))
          )
        )
      )
    );
  });
}
