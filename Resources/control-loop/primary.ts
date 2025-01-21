import { logInfo } from '../utils/logger';

export class PrimaryControlLoop {
  private operational: boolean = true;
  private lastExecutionTime: number = Date.now();

  start(): void {
    logInfo('Primary control loop initialized.');
    setInterval(() => {
      if (this.operational) {
        this.execute();
      } else {
        throw new Error('Primary loop failure detected!');
      }
    }, 100); 
  }

  execute(): void {
    const now = Date.now();
    this.lastExecutionTime = now;
    logInfo(`Primary loop executed flight command at ${now}.`);
  }

  simulateFault(): void {
    this.operational = false;
  }

  stop (): void {
    this.operational = false;
  }

    recover(): void {
        this.operational = true;
    }

    getExecutionTime(): number {
        return this.lastExecutionTime;
    }

    status (): Array <string> {
        return this.operational ? ['Operational'] : ['Failure'];
    }
}
