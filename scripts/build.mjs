import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { publicFiles } from './public-files.mjs';
import { generatedAssets } from './favicon-assets.mjs';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);

await rm(output, { recursive: true, force: true });

for (const file of publicFiles) {
  const destination = new URL(file, output);
  await mkdir(new URL('.', destination), { recursive: true });
  await cp(new URL(file, root), destination);
}

for (const [file, base64] of Object.entries(generatedAssets)) {
  const destination = new URL(file, output);
  await mkdir(new URL('.', destination), { recursive: true });
  await writeFile(destination, Buffer.from(base64, 'base64'));
}

console.log(`Built ${publicFiles.length + Object.keys(generatedAssets).length} allowlisted public files in dist.`);
