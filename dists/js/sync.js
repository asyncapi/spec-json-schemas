/**
 * Copies the bundled schemas from dists/schemas into dists/js/schemas, and
 * LICENSE + NOTICE from the repository root, so they end up in the npm package.
 *
 * npm can only pack files inside the package directory, so the copy is needed.
 * It isn't committed (see .gitignore): it runs before tests and on `prepack`,
 * which `npm publish` triggers.
 *
 * Node.js built-ins only, no dependencies.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const packageDir = __dirname;
const sourceDir = path.resolve(packageDir, '../schemas');
const targetDir = path.resolve(packageDir, 'schemas');
const rootFiles = ['LICENSE', 'NOTICE'];

console.log('> sync npm package schemas');

const schemas = fs
  .readdirSync(sourceDir)
  .filter((file) => path.extname(file) === '.json');

if (schemas.length === 0) {
  throw new Error(`no JSON Schemas found in ${sourceDir}`);
}

// Start clean, so schemas deleted from the source disappear here too.
fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir);

for (const file of schemas) {
  console.log(`|---> ${file}`);
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
}

for (const file of rootFiles) {
  console.log(`|---> ${file}`);
  fs.copyFileSync(path.resolve(packageDir, '../..', file), path.join(packageDir, file));
}

console.log('> sync npm package schemas - done');
