![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

# AsyncAPI

This is a mono repository, which provides all the JSON Schemas documents for validating AsyncAPI documents.

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

## Bundling of schemas
Making changes to schemas version 2.2.0 or beyond, should no longer be manually changed in the [./schemas](./schemas), but instead be done in their definition located in [./definitions](./definitions).

These definitions are automatically bundled together on new releases through the `generate:assets` script, which runs the [bundler](./tools/bundler). 

For example for [2.2.0](./definitions/2.2.0), the bundler starts with the [asyncapi.json](definitions/2.2.0/asyncapi.json) file and recursively go through all references (`$ref`) to create the [appropriate bundled version](./schemas/2.2.0.json).


### Creating a new version
To create a new version, simply run the npm script `npm run startNewVersion --newVersion=x.x.x`, where `x.x.x` is the new version you want to create.

The manual process of creating a new version is to:
1. Duplicate the latest version under definitions.
2. Search and replace in the duplicated files `definitions/x.x.x`, where `x.x.x` is the latest version you duplicated, and replace it with `definitions/y.y.y`, where `y.y.y` is the new version.