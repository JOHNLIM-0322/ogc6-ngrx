import { Injectable } from '@angular/core';
import { Job, NetworkMaster, Owner } from '../model/owner.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

    constructor(private httpClient: HttpClient) {
        
    }

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

  updateJob(owname: string, nmname: string,jbname: string, updatedJob: Job) {
    let resp: any;

    //throw new Error('This is a testing error message');
    //return this.httpClient.put('http://localhost:3000/', updatedJob);
    return of(resp);
  }

  addJob(owname: string, nmname: string, newJob: Job) {
    let resp: any;

    // return this.httpClient.post(....);
    return of(resp);
  }

  deleteJob(owname: string, nmname: string, jbname: string) {
    let resp: any;

    // return this.httpClient.delete(....);
    return of(resp);
  }

  updateNetwork(owname: string, nmname: string, updatedNetwork: NetworkMaster) {
    let resp: any;

    // return this.httpClient.put(....);
    return of(resp);
  }
  
  addNetwork(owname: string, newNetwork: NetworkMaster) {
    let resp: any;

    // return this.httpClient.post(....);
    return of(resp);
  }
  
  deleteNetwork(owname: string, nmname: string) {
    let resp: any;

    // return this.httpClient.delete(....);
    return of(resp);
  }

 
  
  
  
}
