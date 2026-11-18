# @asyncapi/specs

![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

Bundled [AsyncAPI](https://www.asyncapi.com) JSON Schemas for Node.js. The package contains only the schemas and has no code dependencies. Its single dependency, [`@types/json-schema`](https://www.npmjs.com/package/@types/json-schema), provides TypeScript types and nothing else.

These JSON Schemas don't reflect the specification 1:1. Some rules of the specification can't be expressed in JSON Schema, so use them as a tool (e.g. for validation), not as the only one. For full validation, use the [AsyncAPI JavaScript Parser](https://github.com/asyncapi/parser-js).

## Installation

```bash
npm install @asyncapi/specs
```

## Usage

Grab a specific AsyncAPI version:

```js
const asyncapi = require('@asyncapi/specs');

console.log(asyncapi.schemas['3.0.0']);
console.log(asyncapi.schemasWithoutId['3.0.0']);
```

Get a list of supported versions:

```js
const { schemas } = require('@asyncapi/specs');

console.log(Object.keys(schemas));
// [ '2.0.0', '2.1.0', ..., '3.0.0', '3.1.0' ]
```

The main export provides only versions `2.0.0` and newer. Older ones (`1.0.0`, `1.1.0`, `1.2.0`, `2.0.0-rc1`, `2.0.0-rc2`) and the [SchemaStore](https://www.schemastore.org/json/) schema are reachable by path:

```js
const v1 = require('@asyncapi/specs/schemas/1.2.0.json');
const v1WithoutId = require('@asyncapi/specs/schemas/1.2.0-without-$id.json');
const schemaStore = require('@asyncapi/specs/schemas/all.schema-store.json');
```

> [!NOTE]
> Up to `6.11.1` the package also shipped the source folders (`definitions/`, `bindings/`, `extensions/`, `common/`, `examples/`). It now ships only the bundled schemas listed above.

## How the package is built

```
dists/schemas/*.json  --sync.js-->  dists/js/schemas/*.json  --npm pack-->  @asyncapi/specs
```

1. [`dists/schemas`](../schemas) holds the bundled schemas. The npm package and the [Go module](../go) are both built from this folder.
2. [`sync.js`](sync.js) copies every `*.json` from `dists/schemas` into `dists/js/schemas`. It also copies `LICENSE` and `NOTICE` from the repository root.
3. `npm publish` runs `sync.js` through the `prepack` script, so the published package always matches `dists/schemas`.

The copies aren't committed (see the root `.gitignore`). `npm test` runs the sync before testing, and `npm run sync` runs it alone.

Tests use only Node.js built-ins (`node:test`, `node:assert`):

```bash
cd dists/js && npm test
```

To add a new version, add it to [`index.js`](index.js) and [`index.d.ts`](index.d.ts). The tests fail if the two files disagree, or if a schema doesn't match `dists/schemas`.

## Releases

The centrally managed GitHub workflows run from the repository root, so the root keeps a private `package.json`. That file isn't published; it only forwards to this package:

| Root script       | Runs                                   | Used by                                   |
|-------------------|----------------------------------------|-------------------------------------------|
| `test`            | `npm test` in `dists/js`               | PR testing, release testing               |
| `generate:assets` | `npm run sync` in `dists/js`           | PR testing, version bump                  |
| `bump:version`    | `npm version $VERSION` in `dists/js`   | version bump PR after a release           |

semantic-release publishes this folder (`pkgRoot: dists/js` in the root `.releaserc`). Each release gets the `vX.Y.Z` git tag, which the Go module reuses as `dists/go/vX.Y.Z`.
