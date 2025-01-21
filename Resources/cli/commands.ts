import { FailoverMechanism } from '../control-loop/failover';
import { FaultInjector } from '../fault-simulation/fault-injector';

export class CLI {
  private failover: FailoverMechanism;
  private faultInjector: FaultInjector;

  constructor() {
    this.failover = new FailoverMechanism();
    this.faultInjector = new FaultInjector(this.failover);
  }

  run(): void {
    console.log(`
      Welcome to Falcon 9 Flight Simulator.
      Commands:
      1. start      - Start the control system.
      2. inject     - Inject a random fault.
      3. metrics    - Display current performance metrics.
    `);
    process.stdin.on('data', (data) => {
      const command = data.toString().trim();
      switch (command) {
        case 'start':
          this.failover.start();
          break;
        case 'inject':
          this.faultInjector.injectFault();
          break;
        case 'metrics':
          this.failover.displayMetrics();
          break;
        default:
          console.log('Unknown command.');
      }
    });
  }
}
