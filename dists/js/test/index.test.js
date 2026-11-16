/**
 * Tests for the npm package. Node.js built-ins only (node:test, node:assert).
 * Run with `npm test`, which syncs dists/schemas first.
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const packageDir = path.resolve(__dirname, '..');
const sourceDir = path.resolve(packageDir, '../schemas');
const targetDir = path.resolve(packageDir, 'schemas');

const specs = require('..');

// Versions exported from the main entry point. Older ones (1.x, 2.0.0-rcX)
// are reachable only by path, e.g. @asyncapi/specs/schemas/1.2.0.json.
const exportedVersions = ['2.0.0', '2.1.0', '2.2.0', '2.3.0', '2.4.0', '2.5.0', '2.6.0', '3.0.0', '3.1.0'];

const sourceSchemas = fs
  .readdirSync(sourceDir)
  .filter((file) => path.extname(file) === '.json')
  .sort();

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

test('exports the supported versions', () => {
  assert.deepEqual(Object.keys(specs).sort(), ['schemas', 'schemasWithoutId']);
  assert.deepEqual(Object.keys(specs.schemas), exportedVersions);
  assert.deepEqual(Object.keys(specs.schemasWithoutId), exportedVersions);
});

test('exported schemas are the ones from dists/schemas', () => {
  for (const version of exportedVersions) {
    assert.deepEqual(specs.schemas[version], readJson(path.join(sourceDir, `${version}.json`)), version);
    assert.deepEqual(
      specs.schemasWithoutId[version],
      readJson(path.join(sourceDir, `${version}-without-$id.json`)),
      `${version}-without-$id`
    );
  }
});

test('schemas/ is an exact copy of dists/schemas', () => {
  const copied = fs.readdirSync(targetDir).sort();
  assert.deepEqual(copied, sourceSchemas);

  for (const file of sourceSchemas) {
    const source = fs.readFileSync(path.join(sourceDir, file));
    const copy = fs.readFileSync(path.join(targetDir, file));
    assert.ok(source.equals(copy), `${file} differs from dists/schemas, run npm run sync`);
  }
});

test('index.d.ts declares the same versions as index.js', () => {
  const dts = fs.readFileSync(path.join(packageDir, 'index.d.ts'), 'utf8');

  for (const group of ['schemas', 'schemasWithoutId']) {
    const block = dts.match(new RegExp(`'${group}':\\s*{([^}]*)}`));
    assert.ok(block, `index.d.ts has no '${group}' block`);
    const versions = [...block[1].matchAll(/'([^']+)':\s*JSONSchema7/g)].map((m) => m[1]);
    assert.deepEqual(versions, exportedVersions, group);
  }
});

test('package contains only the entry points, schemas and legal files', () => {
  // --ignore-scripts: sync already ran in `npm test`, prepack would only repeat it.
  const output = execSync('npm pack --dry-run --json --ignore-scripts', {
    cwd: packageDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  const packed = JSON.parse(output)[0].files.map((file) => file.path).sort();

  const expected = [
    'LICENSE',
    'NOTICE',
    'README.md',
    'index.d.ts',
    'index.js',
    'package.json',
    ...sourceSchemas.map((file) => `schemas/${file}`),
  ].sort();

  assert.deepEqual(packed, expected);
});
