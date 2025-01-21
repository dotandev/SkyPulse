import { logInfo } from '../utils/logger';

export class BackupControlLoop {
  start(): void {
    logInfo('Backup control loop activated.');
    setInterval(() => {
      logInfo('Backup loop executing flight commands...');
    }, 100);
  }
}
