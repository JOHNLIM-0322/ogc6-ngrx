import { Injectable } from '@angular/core';
import { Job, NetworkMaster, Owner } from '../model/owner.model';
import { OwnerDataError } from './owner.data.error';

@Injectable({
  providedIn: 'root',
})
export class OwnerData {

  updateJob(
    owners: Owner[],
    owname: string,
    nmname: string,
    jbname: string,
    updatedJob: Job
  ): Owner[] {
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
            child: {
              ...networkMaster.child,
              jobMaster: [...networkMaster.child.jobMaster],
            },
          };

          const jobIndex = updatedNetworkMaster.child.jobMaster.findIndex(
            (jb) => jb.name === jbname
          );

          if (jobIndex !== -1) {
            // found Job record
            updatedNetworkMaster.child.jobMaster[jobIndex] = updatedJob;
          } else {
            console.error(`Job with ${jbname} not found`);
            throw new OwnerDataError(`Job with ${jbname} not found`);
          }

          updatedOwner.child.networkMaster = owner.child.networkMaster.map(
            (nm) => (nm.name === nmname ? updatedNetworkMaster : nm)
          );
        } else {
          console.error(`Network Master with ${nmname} not found`);
          throw new OwnerDataError(`Network Master with ${nmname} not found`);
        }

        return updatedOwner;
      } else {
        return owner;
      }
    });

    return updatedOwners;
  }

  addJob(
    owners: Owner[],
    owname: string,
    nmname: string,
    newJob: Job
  ): Owner[] {
    const updatedOwners = owners.map((owner) => {
      if (owner.name === owname) {
        const updatedOwner = { ...owner, child: { ...owner.child } };
        const networkMaster = owner.child.networkMaster.find(
          (nm) => nm.name === nmname
        );

        if (networkMaster) {
          // Found network master record
          const updatedNetworkMaster = {
            ...networkMaster,
            child: {
              ...networkMaster.child,
              jobMaster: [...networkMaster.child.jobMaster, newJob],
            },
          };

          updatedOwner.child.networkMaster = owner.child.networkMaster.map(
            (nm) => (nm.name === nmname ? updatedNetworkMaster : nm)
          );
        } else {
          console.error(`Network Master with ${nmname} not found`);
          throw new OwnerDataError(`Network Master with ${nmname} not found`);
        }

        return updatedOwner;
      } else {
        return owner;
      }
    });

    return updatedOwners;
  }

  deleteJob(
    owners: Owner[],
    owname: string,
    nmname: string,
    jbname: string
  ): Owner[] {
    const updatedOwners = owners.map((owner) => {
      if (owner.name === owname) {
        const updatedOwner = { ...owner, child: { ...owner.child } };
        const networkMaster = owner.child.networkMaster.find(
          (nm) => nm.name === nmname
        );

        if (networkMaster) {
          // Found network master record
          const updatedNetworkMaster = {
            ...networkMaster,
            child: {
              ...networkMaster.child,
              jobMaster: [...networkMaster.child.jobMaster],
            },
          };

          const jobIndex = updatedNetworkMaster.child.jobMaster.findIndex(
            (jb) => jb.name === jbname
          );

          if (jobIndex !== -1) {
            // Remove the job from the network's jobMaster
            updatedNetworkMaster.child.jobMaster = [
              ...updatedNetworkMaster.child.jobMaster.slice(0, jobIndex),
              ...updatedNetworkMaster.child.jobMaster.slice(jobIndex + 1),
            ];
          } else {
            console.error(`Job with ${jbname} not found`);
            throw new OwnerDataError(`Job with ${jbname} not found`);
          }

          updatedOwner.child.networkMaster = owner.child.networkMaster.map(
            (nm) => (nm.name === nmname ? updatedNetworkMaster : nm)
          );
        } else {
          console.error(`Network Master with ${nmname} not found`);
          throw new OwnerDataError(`Network Master with ${nmname} not found`);
        }

        return updatedOwner;
      } else {
        return owner;
      }
    });

    return updatedOwners;
  }

  updateNetwork(
    owners: Owner[],
    owname: string,
    nmname: string,
    updatedNetwork: NetworkMaster
  ): Owner[] {
    const updatedOwners = owners.map((owner) => {
      if (owner.name === owname) {
        const updatedOwner = { ...owner, child: { ...owner.child } };
        const networkMaster = owner.child.networkMaster.find(
          (nm) => nm.name === nmname
        );

        if (networkMaster) {
          // Found network master record
          const updatedNetworkMaster = {
            ...networkMaster,
            ...updatedNetwork,
            child: {
              ...networkMaster.child,
              jobMaster: [...networkMaster.child.jobMaster],
            },
          };

          updatedOwner.child.networkMaster = owner.child.networkMaster.map(
            (nm) => (nm.name === nmname ? updatedNetworkMaster : nm)
          );
        } else {
          console.error(`Network Master with ${nmname} not found`);
          throw new OwnerDataError(`Network Master with ${nmname} not found`);
        }

        return updatedOwner;
      } else {
        return owner;
      }
    });

    return updatedOwners;
  }

  addNetwork(
    owners: Owner[],
    owname: string,
    newNetwork: NetworkMaster
  ): Owner[] {
    const updatedOwners = owners.map((owner) => {
      if (owner.name === owname) {
        const updatedOwner = { ...owner, child: { ...owner.child } };

        // Check if the network name already exists
        const networkExists = owner.child.networkMaster.some(
          (nm) => nm.name === newNetwork.name
        );

        if (!networkExists) {
          // If the network doesn't exist, add it to the owner's networks
          updatedOwner.child.networkMaster = [
            ...owner.child.networkMaster,
            { ...newNetwork, child: { jobMaster: [] } },
          ];
        } else {
          console.error(`Network with ${newNetwork.name} already exists`);
          throw new OwnerDataError(`Network with ${newNetwork.name} already exists`);
        }

        return updatedOwner;
      } else {
        return owner;
      }
    });

    return updatedOwners;
  }

  deleteNetwork(owners: Owner[], owname: string, nmname: string): Owner[] {
    const updatedOwners = owners.map((owner) => {
      if (owner.name === owname) {
        const updatedOwner = { ...owner, child: { ...owner.child } };
        const networkMasterIndex = owner.child.networkMaster.findIndex(
          (nm) => nm.name === nmname
        );

        if (networkMasterIndex !== -1) {
          // Remove the network from the owner's networks
          // DELETE method here
          updatedOwner.child.networkMaster = [
            ...owner.child.networkMaster.slice(0, networkMasterIndex),
            ...owner.child.networkMaster.slice(networkMasterIndex + 1),
          ];
        } else {
          console.error(`Network Master with ${nmname} not found`);
          throw new OwnerDataError(`Network Master with ${nmname} not found`);
        }

        return updatedOwner;
      } else {
        return owner;
      }
    });

    return updatedOwners;
  }
}
