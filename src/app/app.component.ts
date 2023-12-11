import { Component, OnInit } from '@angular/core';
import { Job, Owner } from './owner/model/owner.model';
import { Observable } from 'rxjs';

import * as fromOwnerReducers from './owner/store/owner.reducer';
import * as fromOwnerActions from './owner/store/owner.actions';
import * as fromOwnerSelectors from './owner/store/owner.selectors';
import { Store } from '@ngrx/store';
import { OwnerService } from './owner/services/owner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ogc6-ngrx';

  ownerList: Owner[] = [];
  ownerList$!: Observable<Owner[]>;

  constructor(
    private store: Store<fromOwnerReducers.OwnerState>,
    private ownerSvc: OwnerService
  ) {}

  ngOnInit(): void {}

  onLoadOwners() {
    // this.ownerSvc.getOwnerList().subscribe ( resp => {
    //   console.log(resp);
    //   this.ownerList = resp;
    // });
    this.store.dispatch(fromOwnerActions.loadOwners());
    this.ownerList$ = this.store.select(fromOwnerSelectors.selectAllOwners);

    this.ownerList$.subscribe((data) => {
      console.log(data);
      this.ownerList = data;
    });
  }

  onUpdateJob() {
    let owname: string = 'OWNER3';
    let nmname: string = 'OWNER3-NETWORK2';
    let jbname: string = 'OWNER3-NETWORK2-JOB1';

    let updatedJob = new Job();
    updatedJob.name = jbname;
    updatedJob.description ='updated description';
    updatedJob.fileOrLibrary = 'library';
    updatedJob.member = 'updated member';
    updatedJob.jcl = { key: 'update_jcl_key', value: 'update jcl'};
    updatedJob.specialType = { key: 'update_specialtype_key', value: 'update specialtype'};
    updatedJob.type = { key: 'update_type_key', value: 'update type'};

    this.store.dispatch(fromOwnerActions.updateJob( {owners: this.ownerList, 
                                                      owname: owname, 
                                                      nmname: nmname, 
                                                      jbname: jbname, 
                                                      updatedJob: updatedJob }));
                                                      
    // at this point, ownerList$ is updated
    // -- if didn't add OwnerActions.updateJobSuccess in reducer, ownerList$ will not be updated
                                                
  }
}
