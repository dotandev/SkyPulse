import { FailoverMechanism } from '../control-loop/failover';

export class FaultInjector {
  private failoverMechanism: FailoverMechanism;

  constructor(failoverMechanism: FailoverMechanism) {
    this.failoverMechanism = failoverMechanism;
  }

  injectFault(): void {
    setTimeout(() => {
      console.log('Injecting fault into primary control loop...');
      this.failoverMechanism.simulateFault();
    }, 5000); 
  }
}
