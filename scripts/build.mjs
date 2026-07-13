import { cp, mkdir, rm } from 'node:fs/promises';
import { publicFiles } from './public-files.mjs';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);

await rm(output, { recursive: true, force: true });

for (const file of publicFiles) {
  const destination = new URL(file, output);
  await mkdir(new URL('.', destination), { recursive: true });
  await cp(new URL(file, root), destination);
}

console.log(`Built ${publicFiles.length} allowlisted public files in dist.`);
