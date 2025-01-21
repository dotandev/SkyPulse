import { PrimaryControlLoop } from './Resources/control-loop/primary';
import readline from 'readline';
import { Telemetry } from './Resources/metrics/telemetry';
import { FailoverMechanism } from './Resources/control-loop/failover';

const telemetry = new Telemetry();
const failover = new FailoverMechanism();
const primaryControlLoop = new PrimaryControlLoop()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'SkyPulse> ',
});

const commands: { [key: string]: () => void } = {
  start: () => {
    console.log('Starting the Primary Control Loop...');
    primaryControlLoop.start();
    console.log('Control loop started.');
  },
  stop: () => {
    console.log('Stopping the Primary Control Loop...');
    primaryControlLoop.stop();
    console.log('Control loop stopped.');
  },
  status: () => {
    console.log('Fetching system status...');
    const status = telemetry.getTelemetry();
    console.log('Telemetry Data:', status);
  },
  fault: () => {
    console.log('Injecting a fault...');
    failover.simulateFault();
    console.log('Fault injected.');
  },
  help: () => {
    console.log(`
      Available Commands:
      - start: Start the Primary Control Loop
      - stop: Stop the Primary Control Loop
      - status: View system telemetry data
      - fault: Simulate a fault
      - exit: Exit the application
    `);
  },
};

console.log('SkyPulse Autonomous Control System Initialized.');
console.log('Type "help" for a list of commands.');

rl.prompt();
rl.on('line', (line) => {
  const command = line.trim();
  if (commands[command]) {
    commands[command]();
  } else if (command === 'exit') {
    console.log('Exiting SkyPulse...');
    rl.close();
  } else {
    console.log(`Unknown command: "${command}"`);
  }
  rl.prompt();
}).on('close', () => {
  console.log('SkyPulse shutting down. Goodbye!');
  process.exit(0);
});
