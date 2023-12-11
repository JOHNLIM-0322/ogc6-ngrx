import { Injectable } from '@angular/core';
import { Job, NetworkMaster, Owner } from '../model/owner.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  getOwnerList(): Observable<Owner[]> {
    let ow;
    let nm;
    let jb;
    let owList: Owner[] = [];
    let nmList: NetworkMaster[] = [];
    let jbList: Job[] = [];

    // owner
    for (let i = 0; i < 3; i++) {
      ow = new Owner();
      ow.name = 'OWNER' + (i + 1);

      // network master
      nmList = [];
      for (let j = 0; j < 3; j++) {
        nm = new NetworkMaster();
        nm.name = ow.name + '-' + 'NETWORK' + (j + 1);
        nm.loop = j + 1;
        nm.node = 'node ' + (j + 1);
        nm.description = 'desc-' + (j + 1);

        // job
        jbList = [];
        for (let x = 0; x < 3; x++) {
          jb = new Job();
          jb.name = nm.name + '-' + 'JOB' + (x + 1);
          jb.type = { key: 'type' + (x + 1), value: 'value' + (x + 1) };
          jb.jcl = { key: 'jcl' + (x + 1), value: 'value' + (x + 1) };
          jb.specialType = {
            key: 'specialType' + (x + 1),
            value: 'value' + (x + 1),
          };
          jb.description = 'desc-' + (x + 1);
          jb.fileOrLibrary = 'file' + (x + 1);
          jb.member = 'member' + (x + 1);

          jbList.push(jb);
        }
        nm.child.jobMaster = jbList;
        nmList.push(nm);
      }
      ow.child.networkMaster = nmList;
      owList.push(ow);
    }
    return of(owList);
  }

  updateJob(owners: Owner[], owname: string, nmname: string,jbname: string,updatedJob: Job): Observable<Owner[]> {
    const updatedOwners = owners.map((owner) => {
      if (owner.name === owname) {
        const updatedOwner = { ...owner, child: { ...owner.child } };
        const networkMaster = owner.child.networkMaster.find(
          (nm) => nm.name === nmname
        );
  
        if (networkMaster) {
          // found network record
          const updatedNetworkMaster = {
            ...networkMaster,
            child: { ...networkMaster.child, jobMaster: [...networkMaster.child.jobMaster] },
          };
  
          const jobIndex = updatedNetworkMaster.child.jobMaster.findIndex(
            (jb) => jb.name === jbname
          );
  
          if (jobIndex !== -1) {
            // found Job record
            updatedNetworkMaster.child.jobMaster[jobIndex] = updatedJob;
          } else {
            console.error(`Job with ${jbname} not found`);
          }
  
          updatedOwner.child.networkMaster = owner.child.networkMaster.map(
            (nm) => (nm.name === nmname ? updatedNetworkMaster : nm)
          );
        } else {
          console.error(`Network Master with ${nmname} not found`);
        }
  
        return updatedOwner;
      } else {
        return owner;
      }
    });
  
    return of(updatedOwners);
  }
}
