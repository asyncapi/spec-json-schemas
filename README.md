![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

> If you are currently using version 2, check out [migration guideline to version 3](./migrations/Migrate%20to%20version%203.md). You might be able to update it without any change.
# AsyncAPI

This is a mono repository, which provides all the JSON Schema documents for validating AsyncAPI documents.

## Installation

```bash
npm install @asyncapi/specs
```

## Usage

Grab a specific AsyncAPI version:

```js
const asyncapi = require('@asyncapi/specs/schemas/2.0.0');

// Do something with the schema.
```

Get a list of versions:

```js
const versions = require('@asyncapi/specs');

console.log(versions);
// Outputs:
//
// {
//   '1.0.0': [Object],
//   '1.1.0': [Object]
// }

const asyncapi = versions['1.1.0'];

// Do something with the schema.
```

## Repository structure
This is the current project structure explained.
- [./definitions](./definitions) - contain all the individual schemas that will automatically be bundled together to provide the schemas in [./schemas](./schemas).
- [./tools/bundler](./tools/bundler) - is the tool that bundles all the individual schemas together.
- [./schemas](./schemas) - contain all automatically bundled and complete schemas for each AsyncAPI version. These schemas should **NOT** be manually changed as they are automatically generated. Any changes should be done in [./definitions](./definitions).

## Schema Bundling
Changes should not be done manually to the schemas in [./schemas](./schemas), but instead be done in their individual definitions located in [./definitions](./definitions).

These definitions are automatically bundled together on new releases through the `generate:assets` script, which runs the [bundler](./tools/bundler). 

For example, for [2.2.0](./definitions/2.2.0), the [bundler](./tools/bundler/index.js) starts with the [asyncapi.json](definitions/2.2.0/asyncapi.json) file and recursively goes through all references (`$ref`) to create the [appropriate bundled version](./schemas/2.2.0.json).

### Creating a new version
To create a new version, simply run the following command:
```
npm run startNewVersion --new-version=x.x.x
```
Where `x.x.x` is the new version you want to create.

The manual process of creating a new version is to:
1. Duplicate the latest version (`y.y.y`) under definitions (so we have the correct base to make changes from). 
2. Rename the folder to the new version.
3. Search and replace in the new duplicated folder for `definitions/y.y.y` and replace it with `definitions/x.x.x`, where `x.x.x` is the new version.