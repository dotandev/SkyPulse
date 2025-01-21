import { Telemetry } from "../Resources/metrics/telemetry";


describe('Telemetry', () => {
  let telemetry: Telemetry;

  beforeEach(() => {
    telemetry = new Telemetry();
  });

  it('should capture real-time data updates', () => {
    telemetry.start();
    telemetry.update('loopStatus', 'primary');
    expect(telemetry.get('loopStatus')).toBe('primary');
  });

  it('should handle multiple telemetry streams', () => {
    telemetry.start();
    telemetry.update('metric1', 42);
    telemetry.update('metric2', 100);
    expect(telemetry.get('metric1')).toBe(42);
    expect(telemetry.get('metric2')).toBe(100);
  });
});
