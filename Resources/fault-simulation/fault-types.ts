export enum FaultType {
    TRANSIENT = 'transient',
    PERSISTENT = 'persistent',
    CASCADING = 'cascading',
  }
  
  export interface Fault {
    type: FaultType;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }
  