import { FailoverMechanism } from "../Resources/control-loop/failover";


describe('FailoverMechanism', () => {
  let failover: FailoverMechanism;

  beforeEach(() => {
    failover = new FailoverMechanism();
  });

  it('should switch to backup loop on failure', () => {
    failover.simulateFailure();
    expect(failover.currentLoop).toBe('backup');
  });

  it('should log the failure and recovery time', () => {
    failover.simulateFailure();
    const logs = failover.getLogs();
    expect(logs).toContain('Switched to backup loop');
  });

  it('should recover within the specified time', () => {
    failover.simulateFailure();
    expect(failover.recoveryTime).toBeLessThan(100);
  });
});
