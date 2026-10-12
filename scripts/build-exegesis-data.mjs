// scripts/build-exegesis-data.mjs
// Runner script to rebuild dist/exegesis-data.js
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pyScript = path.join(__dirname, 'build_exegesis.py');

try {
  const out = execSync(`python "${pyScript}"`, { encoding: 'utf8' });
  console.log(out);
} catch (err) {
  console.error('Failed to build exegesis data:', err);
  process.exit(1);
}
