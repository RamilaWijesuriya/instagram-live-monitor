import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const logFile = path.resolve('logs/errors.log');
if (!fs.existsSync(logFile)) {
  console.log('No error log found. Running full lint/tests.');
  spawn('npm test', { shell: true, stdio: 'inherit' });
  process.exit(0);
}

const logContent = fs.readFileSync(logFile, 'utf-8');
const fileMatches = logContent.match(/\b\w+\.ts:\d+/g);
if (!fileMatches) {
  console.log('No specific files found in error log. Running full lint/tests.');
  spawn('npm test', { shell: true, stdio: 'inherit' });
  process.exit(0);
}

const uniqueFiles = Array.from(new Set(fileMatches.map(match => match.split(':')[0])));
console.log('Rerunning for files:', uniqueFiles);

uniqueFiles.forEach(file => {
  spawn(`npx eslint ${file}`, { shell: true, stdio: 'inherit' });
});
