
// Job class
export class Job {
    name: string;
    type: { key?: string; value?: string };
    jcl: { key?: string; value?: string };
    specialType: { key?: string; value?: string };
    description: string;
    fileOrLibrary: string;
    member: string;
    constructor() {
      this.name = '',
      this.type = {
        key: '',
        value: ''
      },
      this.jcl = {
        key: '',
        value: ''
      },
      this.specialType = {
        key: '',
        value: ''
      },
      this.description = '',
      this.fileOrLibrary = '',
      this.member = ''
    }
}

// network master Node
export class NetworkMasterNode {
    jobMaster: Job[];
    constructor() {
        this.jobMaster = []
    }
}

// network master
export class NetworkMaster {
    name: string;
    loop: number;
    node: string;
    description: string;
    child: NetworkMasterNode;
    constructor() {
        this.name = '',
        this.loop = 0,
        this.node = '',
        this.description = '',
        this.child = new NetworkMasterNode()
    }
}

// owner node
export class OwnerNode {
    networkMaster: NetworkMaster[];
    constructor() {
        this.networkMaster = []
    }
 }

 // owner
 export class Owner {
    name: string;
    child: OwnerNode;
    constructor(){
        this.name = '',
        this.child = new OwnerNode()
    }
 }

