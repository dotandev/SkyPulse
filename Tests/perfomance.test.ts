import { FailoverMechanism } from "../Resources/control-loop/failover";


describe('Performance Metrics', () => {
  let failover: FailoverMechanism;

  beforeEach(() => {
    failover = new FailoverMechanism();
  });

  it('should calculate average latency accurately', () => {
    failover.start();
    const metrics = failover.getPerformanceMetrics();
    expect(metrics.averageLatency).toBeGreaterThan(0);
  });

  it('should not exceed acceptable latency threshold', () => {
    failover.start();
    const metrics = failover.getPerformanceMetrics();
    expect(metrics.maxLatency).toBeLessThan(50); 
  });
});
