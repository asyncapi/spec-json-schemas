![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

# AsyncAPI

This package provides all the versions of the AsyncAPI schema.

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

# Repository structure

- schemas/
# Modifying the schemas
Making changes to schemas version 2.2.0 or beyond, should no longer be manually changed in the `./schemas` folder, but instead be done in their definition located in `definitions`.

## Creating a new version
To create a new version, simply run the npm script `npm run startNewVersion --newVersion=x.x.x`.

And replace `x.x.x` with the new version you want to create.