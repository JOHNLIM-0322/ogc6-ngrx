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
}
