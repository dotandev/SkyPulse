export class PerformanceMetrics {
    private startTime: number = 0;
    private recoveryTime: number | null = null;
  
    startMonitoring(): void {
      this.startTime = Date.now();
    }
  
    recordRecovery(): void {
      this.recoveryTime = Date.now() - this.startTime;
      console.log(`System recovered in ${this.recoveryTime} ms.`);
    }
  }
  