import { EventEmitter } from 'events';

interface TelemetryRecord {
  timestamp: number;
  primaryStatus?: boolean;
  key?: string;
  value?: any;
  additionalData?: Record<string, any>;
}

export class Telemetry extends EventEmitter {
  private records: TelemetryRecord[] = [];
  private retentionLimit: number;
  private data: Record<string, any> = {};
  private isRunning: boolean = false;

  constructor(retentionLimit = 1000) {
    super();
    this.retentionLimit = retentionLimit;
  }

  start(): void {
    this.isRunning = true;
    this.emit('telemetryStarted');
  }

  stop(): void {
    this.isRunning = false;
    this.emit('telemetryStopped');
  }


  record(primaryStatus: boolean, additionalData?: Record<string, any>): void {
    if (!this.isRunning) {
      throw new Error('Telemetry collection is not running.');
    }

    const record: TelemetryRecord = {
      timestamp: Date.now(),
      primaryStatus,
      additionalData,
    };

    this.records.push(record);
    this.pruneRecords();
    this.emit('telemetryRecorded', record);
  }

  update(key: string, value: any): void {
    if (!this.isRunning) {
      throw new Error('Telemetry collection is not running.');
    }

    this.data[key] = value;

    const record: TelemetryRecord = {
      timestamp: Date.now(),
      key,
      value,
    };

    this.records.push(record);
    this.pruneRecords();
    this.emit('telemetryUpdated', record);
  }

  get(key: string): any {
    return this.data[key];
  }

  getTelemetry(): TelemetryRecord[] {
    return [...this.records];
  }

  private pruneRecords(): void {
    if (this.records.length > this.retentionLimit) {
      this.records.splice(0, this.records.length - this.retentionLimit);
    }
  }

  generateSnapshot(): TelemetryRecord[] {
    return [...this.records];
  }

  setRetentionLimit(newLimit: number): void {
    this.retentionLimit = newLimit;
    this.pruneRecords();
  }

  clear(): void {
    this.records = [];
    this.data = {};
    this.emit('telemetryCleared');
  }
}
