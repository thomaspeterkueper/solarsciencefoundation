import { readFile, writeFile } from 'node:fs/promises';

const path = new URL('../lib/learningPaths.ts', import.meta.url);
const source = await readFile(path, 'utf8');
const broken = `Die NASA sagt: \"Yesterday's coffee is tomorrow's coffee.\"`;
const repaired = `Die NASA sagt: \"Yesterday’s coffee is tomorrow’s coffee.\"`;

if (source.includes(broken)) {
  await writeFile(path, source.replaceAll(broken, repaired), 'utf8');
  console.log('Repaired legacy apostrophe in lib/learningPaths.ts');
} else if (!source.includes(repaired)) {
  throw new Error('Expected Mars-water quotation was not found; refusing an unverified source rewrite.');
}
