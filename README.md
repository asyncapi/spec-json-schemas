![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

# AsyncAPI

This package provides all the versions of the AsyncAPI schema.

## Installation

### NodeJS
```bash
npm install @asyncapi/specs
```

### Go
```bash
go get github.com/asyncapi/spec-json-schemas/v2
```

## Usage

### NodeJS

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

### Go

Grab a specific AsyncAPI version:

```go
import "github.com/asyncapi/spec_json_schemas/v2"

func Do() {
    schema, err := spec_json_schemas.Get("1.1.0")
    if err != nil {
        panic(err)
    }

    // Do something with the schema
}

```