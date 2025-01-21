import { PrimaryControlLoop } from './primary';
import { BackupControlLoop } from './backup';
import { logInfo, logError } from '../utils/logger';

export class FailoverMechanism {
    private primaryLoop: PrimaryControlLoop;
    private backupLoop: BackupControlLoop;
    private isBackupActive: boolean = false;
    private metrics: { [key: string]: number };
    private logs: string[];
    public currentLoop: 'primary' | 'backup';
    public recoveryTime: number;

    constructor() {
        this.primaryLoop = new PrimaryControlLoop();
        this.backupLoop = new BackupControlLoop();
        this.metrics = { averageLatency: 0, maxLatency: 0 };
        this.logs = [];
        this.currentLoop = 'primary';
        this.recoveryTime = 0;
    }

    start(): void {
        try {
            this.primaryLoop.start();
        } catch (error: any) {
            logError('Primary loop failure: ' + error.message);
            this.activateBackup();
        }
    }

    activateBackup(): void {
        if (!this.isBackupActive) {
            this.isBackupActive = true;
            this.backupLoop.start();
        }
    }

    simulateFault(): void {
        this.primaryLoop.simulateFault();
    }

    simulateFailure(): void {
        this.logs.push('Switched to backup loop');
        this.currentLoop = 'backup';
        this.recoveryTime = Math.random() * 100; 
    }

    getLogs(): string[] {
        return this.logs;
    }

    getPerformanceMetrics(): { [key: string]: number } {
        return this.metrics;
    }

    displayMetrics(): void {
        console.table(this.metrics);
    }
}

