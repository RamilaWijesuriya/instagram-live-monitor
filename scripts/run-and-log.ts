import { spawn } from 'child_process';
import logger from '../server/src/utils/logger';

const command = process.argv.slice(2).join(' ');
if (!command) {
  console.error('Usage: ts-node run-and-log.ts <command>');
  process.exit(1);
}

const child = spawn(command, { shell: true, stdio: 'inherit' });

child.on('close', (code) => {
  if (code !== 0) {
    logger.error(`Command failed: ${command}`);
  }
  process.exit(code || 0);
});
