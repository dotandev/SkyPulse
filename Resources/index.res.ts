import { FailoverMechanism } from './control-loop/failover';
import { FaultInjector } from './fault-simulation/fault-injector';
import { PerformanceMetrics } from './metrics/performance';

const failoverMechanism = new FailoverMechanism();
const faultInjector = new FaultInjector(failoverMechanism);
const metrics = new PerformanceMetrics();

metrics.startMonitoring();
failoverMechanism.start();
faultInjector.injectFault();

setTimeout(() => {
  metrics.recordRecovery();
}, 7000); 
