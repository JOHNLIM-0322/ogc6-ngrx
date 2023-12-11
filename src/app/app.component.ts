import { Component, OnInit } from '@angular/core';
import { Job, NetworkMaster, Owner } from './owner/model/owner.model';
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

  onAddJob() {
    let owname: string = 'OWNER3';
    let nmname: string = 'OWNER3-NETWORK2';
    let jbname: string = 'OWNER3-NETWORK2-JOB-NEW';

    let newJob = new Job();
    newJob.name = jbname;
    newJob.description ='newJob description';
    newJob.fileOrLibrary = 'library';
    newJob.member = 'newJob member';
    newJob.jcl = { key: 'newJob_jcl_key', value: 'newJob jcl'};
    newJob.specialType = { key: 'newJob_specialtype_key', value: 'newJob specialtype'};
    newJob.type = { key: 'newJob_type_key', value: 'newJob type'};

    this.store.dispatch(fromOwnerActions.addJob( { owners: this.ownerList, owname: owname, nmname: nmname, newJob: newJob}));
  }

  onDeletJob() {
    let owname: string = 'OWNER1';
    let nmname: string = 'OWNER1-NETWORK2';
    let jbname: string = 'OWNER1-NETWORK2-JOB3';

    this.store.dispatch(fromOwnerActions.deleteJob( { owners: this.ownerList, owname: owname, nmname: nmname, jbname: jbname}));
  }

  onUpdateNetwork() {
    let owname: string = 'OWNER3';
    let nmname: string = 'OWNER3-NETWORK2';

    let updatedNetwork = new NetworkMaster();
    updatedNetwork.name = nmname;
    updatedNetwork.description = 'updated Network desc';
    updatedNetwork.loop = 99;
    updatedNetwork.node = 'updated network node';

    this.store.dispatch(fromOwnerActions.updateNetwork( { owners: this.ownerList, owname: owname, nmname: nmname, updatedNetwork: updatedNetwork}));
  }

  onAddNetwork() {
    let owname: string = 'OWNER3';
    let nmname: string = 'OWNER3-NETWORK-NEW';

    let newNetwork = new NetworkMaster();
    newNetwork.name = nmname;
    newNetwork.description = 'new Network desc';
    newNetwork.loop = 99;
    newNetwork.node = 'new network node';

    this.store.dispatch(fromOwnerActions.addNetwork( { owners: this.ownerList, owname: owname, newNetwork: newNetwork}));
  }

  onDeletNetwork() {
    let owname: string = 'OWNER1';
    let nmname: string = 'OWNER1-NETWORK2';

    this.store.dispatch(fromOwnerActions.deleteNetwork( { owners: this.ownerList, owname: owname, nmname: nmname }));
  }
}
