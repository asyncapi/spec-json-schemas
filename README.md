![](https://travis-ci.org/asyncapi/asyncapi-node.svg?branch=master)

# AsyncAPI

This package provides all the versions of the AsyncAPI schema.

## Installation

```bash
npm install asyncapi
```

## Usage

Grab a specific AsyncAPI version:

```js
const asyncapi = require('asyncapi/schemas/1.0.0');

// Do something with the schema.
```

Get a list of versions:

```js
const versions = require('asyncapi');

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

## Author

Fran Méndez – [www.fmvilas.com](https://www.fmvilas.com)
