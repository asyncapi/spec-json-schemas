![npm](https://img.shields.io/npm/v/@asyncapi/specs?style=for-the-badge) ![npm](https://img.shields.io/npm/dt/@asyncapi/specs?style=for-the-badge)

## Overview

This is a mono repository, which provides all the JSON Schema documents for validating AsyncAPI documents.

### Two types of schemas

This repository contains [JSON Schema](https://json-schema.org) files for all the versions of AsyncAPI specification. There are two types of JSON Schema files, with and without **$id** feature. We need two versions of schemas because of the differences it tooling implementation of JSON Schema `$ref` and `$id` keywords. Some implementations treat `$id` by default as prefix reference for `$ref` and require it, therefore it is needed to properly correlate `$ref` and `$id` values. Unfortunately other tools do not understand `$id` values and fail dereferencing. This is why we need two different versions of schemas, with and without the `$id`.

### Releases and pre-releases

This repository contains JSON Schema files for official AsyncAPI releases and also for release candidates. Before you decide to use a specific JSON Schema file in production, make sure a corresponding [official release of AsyncAPI specification](https://github.com/asyncapi/spec/releases) is produced, not a release candidate.

JSON Schema which describes a version of AsyncAPI specification that is not yet officially released is considered an unstable pre-release that can change anytime and is not considered to be a breaking-change.

If you want to make sure you only use stable schemas, you have to make sure that you use only certain schema versions, not all by default.

### JSON Schema vs AsyncAPI specification

These JSON Schema files do not reflect 1:1 the specification and shouldn't be treated as specification itself but rather as a tool (e.g., for validation).

These JSON Schema files shouldn't be used as the only tool for validating AsyncAPI documents because some rules described in the AsyncAPI specification can't be described with JSON Schema.

### Libraries

In addition, this repo provides JavaScript and Go modules that make it easier to access JSON Schema files through code. These packages provide access only to schemas with version larger or equal 2.0.0.

## Custom Validation Needs

If you decide to validate AsyncAPI documents only with the JSON Schema files provided in this repo, your AsyncAPI documents will not be properly validated.
It's recommended to use [AsyncAPI JavaScript Parser](https://github.com/asyncapi/parser-js) that uses the AsyncAPI JSON Schema files for validation but also implements additional custom validations.
 
The following additional custom validations need to be provided for documents prior to `3.0.0`:

* Variables provided in the `url` property have a corresponding variable object defined and its example is correct.
* `operationId`s are not duplicated in the document.
* `messageId`s are not duplicated in the document.
* Server security is declared properly and the name has a corresponding `securitySchemes` definition in `components` with the same name.
* Server `securitySchemes` is an empty array when the security type requires it.
* Parameters specified in the channel name have corresponding parameters object defined.
* Channel names do not contain URL parameters.
* All servers listed for a channel in the `servers` property are declared in the top-level `servers` object.
* Tags specified in any object have no duplicates. Check must be done for: the top-level object, operations (publish and subscribe), operation traits, channels, messages, and message traits.
 
At the moment, the AsyncAPI JavaScript parser does not cover all validation cases yet.
All test cases and parsers coverage can be found [here](https://asyncapi.github.io/tck/)

## Installation

### NodeJS

```bash
npm install @asyncapi/specs
// OR by Yarn
yarn add @asyncapi/specs
```

See [dists/js/README.md](dists/js/README.md) for how the npm package is built and released.

### Go

```bash
go get github.com/asyncapi/spec-json-schemas/dists/go/v6
```

See [dists/go/README.md](dists/go/README.md) for how the Go module is built and released.

## Usage

### NodeJS

Grab a specific AsyncAPI version:

```js
const asyncapi = require('@asyncapi/specs');

console.log(asyncapi.schemas['2.0.0'])
console.log(asyncapi.schemasWithoutId['2.0.0'])
// Do something with the schema.
```

Get a list of supported versions:

```js
const versions = require('@asyncapi/specs').schemas;

console.log(versions);
// Outputs object:
//
// {
//   '2.0.0': [Object],
//   '2.1.0': [Object],
//   ...
// }
console.log(Object.keys(versions));
// Outputs array:
//
// [
//   '2.0.0',
//   '2.1.0',
//   ...
// ]
```

> **Note**
> The main export of the package provides only supported versions of AsyncAPI (newer or equal to `2.0.0`). To use older ones (e.g. `1.2.0`) please import an absolute path like `@asyncapi/specs/schemas/1.2.0`;

### Go

Grab a specific AsyncAPI version:

```go
import spec_json_schemas "github.com/asyncapi/spec-json-schemas/dists/go/v6"

func Do() {
    schema, err := spec_json_schemas.Get("1.1.0")
    if err != nil {
        panic(err)
    }

    // Do something with the schema
}
```

## Migration guidelines

If you are currently using version 2, check out [migration guideline to version 3](migrations/migrate-to-version-3.md).
If you are currently using version 3, check out [migration guideline to version 4](migrations/migrate-to-version-4.md).
If you are currently using version 4, check out [migration guideline to version 5](migrations/migrate-to-version-5.md).
If you are currently using version 5, check out [migration guideline to version 6](migrations/migrate-to-version-6.md).

## Repository structure

This is the current project structure explained:

- [./draft-04/schemas](draft-04/schemas) - AsyncAPI JSON Schemas written in JSON Schema Draft-04 (AsyncAPI `1.x`): shared [v1](draft-04/schemas/v1) blocks and one folder per version (`v1.0.0`, `v1.1.0`, `v1.2.0`).
- [./draft-07/bindings](draft-07/bindings) - AsyncAPI bindings JSON Schemas written in JSON Schema Draft-07. One folder per protocol, one subfolder per binding version. The `*Binding.json` files in the protocol folder pick the right version by `bindingVersion`.
- [./draft-07/integrations](draft-07/integrations) - external schemas used inside AsyncAPI documents, like [OpenAPI](draft-07/integrations/openapi) and [Avro](draft-07/integrations/avro).
- [./draft-07/schemas](draft-07/schemas) - AsyncAPI JSON Schemas written in JSON Schema Draft-07 (AsyncAPI `2.x` and `3.x`): shared [v2](draft-07/schemas/v2) and [v3](draft-07/schemas/v3) blocks, one folder per version (`v2.0.0` … `v3.1.0`) and shared root schemas (`reference.json`, `schema.json`, `multiFormatSchema.json`, …).
- [./examples](examples) - AsyncAPI examples used by the tests.
- [./test](test) - JSON Schema tests. The folders mirror `draft-04` and `draft-07`.
- [./dists](dists) - schemas ready for distribution:
  - [./dists/schemas](dists/schemas) - bundled schemas for every AsyncAPI version and [all.schema-store.json](dists/schemas/all.schema-store.json) for [JSON Schema Store](https://www.schemastore.org/json/).
  - [./dists/js](dists/js) - the `@asyncapi/specs` npm package.
  - [./dists/go](dists/go) - the Go module.

## Schema Bundling

Don't change the schemas in [./dists/schemas](dists/schemas) manually. They are generated. Make changes in the sources under [./draft-07](draft-07), then bundle them:

```bash
./bundle-draft-07.sh
```

The script runs the `bundle.sh` of every version folder (for example [draft-07/schemas/v3.1.0/bundle.sh](draft-07/schemas/v3.1.0/bundle.sh)). New versions are picked up automatically. It needs the [`jsonschema` CLI](https://github.com/sourcemeta/jsonschema) in `PATH`.

## Creating a new version

> [!CAUTION]
> **NEVER DELETE OLD VERSIONS OR FIX THEM.**
>
> Released schemas are immutable. Only these changes are allowed in them:
> - docs changes (`title`, `description`, `examples`);
> - re-assembling a schema, for example composing it from shared blocks in a new way, without changing what it validates.
>
> **Fix ALL typos, bugs and drifts ONLY in a new version.**

### Shared blocks

The [v2](draft-07/schemas/v2) and [v3](draft-07/schemas/v3) folders (and [v1](draft-04/schemas/v1) in draft-04) are not versions. They hold common blocks, like lego bricks, shared by every version of that major: `info`, `license`, `contact`, `externalDocs`, `tags`, `security`, server, channel and operation parts, references, etc. Version folders (`v3.0.0`, `v3.1.0`, …) reference these blocks and keep only what is specific to the version.

### New minor version

For example, `3.2.0`:

1. Create `draft-07/schemas/v3.2.0` and copy into it the latest available version (`v3.1.0`), including its `bundle.sh`.
1. Replace `3.1.0` with `3.2.0` in the new folder (`$id`s, titles, `asyncapi` const, examples).
1. Make the changes. Reuse the shared [v3](draft-07/schemas/v3) blocks. Keep version-specific changes in the version folder.
1. Once everything is ready, prepare the tests in `test/draft-07/schemas/v3.2.0` and add them.
1. Bundle with `./bundle-draft-07.sh` and follow [Publishing a new version](#publishing-a-new-version).

### New major version

For example, `4.0.0`:

1. It is allowed to start straight in `draft-07/schemas/v4.0.0`, write the schema there and release the new major version.
1. Once it is time to work on a new minor version (`4.1.0`), extract the common components into a shared `draft-07/schemas/v4` folder.
1. Once everything is ready, update the tests and relink the JSON Schemas (`v4.0.0` and `v4.1.0`) to the shared `v4` blocks. For `4.0.0` this is re-assembling only: it must validate exactly the same documents as before.

### Bindings

Same story for [bindings](draft-07/bindings). For example, `apache-kafka` `0.7.0`:

1. Create `draft-07/bindings/apache-kafka/0.7.0` and copy into it the latest available version (`0.6.0`).
1. Make the changes.
1. Add an `if`/`then` branch for `0.7.0` to every `*Binding.json` file in [draft-07/bindings/apache-kafka](draft-07/bindings/apache-kafka), so the new version is picked by `bindingVersion`.
1. Once everything is ready, prepare the tests in `test/draft-07/bindings/apache-kafka/0.7.0`, add them and update the `*Binding.test.json` files in [test/draft-07/bindings/apache-kafka](test/draft-07/bindings/apache-kafka).

### Publishing a new version

1. Edit the [index.js](dists/js/index.js) file adding a new line with the new version. I.e.:
   ```js
   '2.6.0': require('./schemas/2.6.0.json'),
   '2.6.0-without-$id': require('./schemas/2.6.0-without-$id.json'),
   ```
1. Edit the [index.d.ts](dists/js/index.d.ts) file adding a new line with the types for the new version. I.e.:
   ```js
   '2.6.0': JSONSchema7;
   '2.6.0-without-$id': JSONSchema7;
   ```
1. Edit the [schemas/all.schema-store.json](dists/schemas/all.schema-store.json) file adding a new entry under the `oneOf` keyword with the new version. Remember about adding `-without-$id` suffix which points to alternative generated schema without $ids. I.e.:

    ```json
    {
       "allOf":[
          {
             "properties":{
                "asyncapi":{
                   "const":"2.6.0"
                }
             }
          },
          {
             "$ref":"http://asyncapi.com/schema-store/2.6.0-without-$id.json"
          }
       ]
    }
    ```

## Handling breaking changes
Whenever a Breaking Change is introduced, the following steps should be taken in Go package:

1. Edit [dists/go/go.mod](dists/go/go.mod), and increase the version package suffix in the module name. For example, if the current version is `v6.0.0`, and you are releasing `v7.0.0`, the module name should be `github.com/asyncapi/spec-json-schemas/dists/go/v7`. See [dists/go/README.md](dists/go/README.md#major-versions).

## SchemaStore compatibility testing

AsyncAPI JSON Schema is referenced in [SchemaStore](https://www.schemastore.org/json/). In many IDEs, like VSCode, some extensions integrate with SchemaStore, like [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml). This way we enable autocompletion, validation and tooltips that help write AsyncAPI documents.

Whenever you make changes in AsyncAPI JSON Schema, you should always manually verify that the schema is still supported by [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and that it will be able to fetch and dereference it.

- Make sure you have VSCode and YAML extension
- Once you make changes in schemas, bundle them with `./bundle-draft-07.sh`
- Open any AsyncAPI document and add the following line at the top, so YAML uses your local schema and not the one from SchemaStore. Make sure it points to the schema bundle that you generated and that contains your changes. Then add a new field and hover over some property to see if the tooltip still shows up:
   ```yaml
   # yaml-language-server: $schema=YOUR-PROJECTS-DIRECTORY/spec-json-schemas/dists/schemas/2.6.0-without-$id.json
   ```
   
## Extensions

Extensions are a way to [extend AsyncAPI specification](https://www.asyncapi.com/docs/concepts/asyncapi-document/extending-specification) with fields that are not yet defined inside the specification. To add JSON schema of the extension in this repository, you need to first make sure it is added to the [extension-catalog](https://github.com/asyncapi/extensions-catalog) repository.
### How to add schema of the extension

1. All the extensions must be present in [draft-07/schemas/v3/info/extensions](draft-07/schemas/v3/info/extensions) folder.
2. A proper folder structure must be followed to add the extensions.
3. A new folder just as [x extension](draft-07/schemas/v3/info/extensions/x) must be added with proper `versioning` and `schema file`.
4. All the schemas must be added in a file named `schema.json` just as one is defined for [x extension](draft-07/schemas/v3/info/extensions/x/0.1.0/schema.json).

5. Extension schema should not be referenced directly in the definition of the object it extends. For example if you add an extension for `info`, your extension's schema should not be referenced from `info.json` but [infoExtensions.json](draft-07/schemas/v3/info/infoExtensions.json). If the object that you extend doesn't have a corresponding `*Extensions.json` file, you need to create one.

## Running tests

Tests are run with the [`jsonschema` CLI](https://github.com/sourcemeta/jsonschema) `test` command. Every run needs:

- `--format-assertion`, so that `format` (`uri`, `email`, `uri-reference`, …) is asserted. Without it some tests fail.
- `--resolve` for every folder or file the tested schemas reference.

Add `--verbose` to print every test case. Use `--json` for CTRF output in CI.

### All tests (draft-04 and draft-07)

```bash
jsonschema test test \
  --resolve draft-04 --resolve draft-07 \
    --format-assertion
```

### draft-04 (AsyncAPI v1)

```bash
jsonschema test test/draft-04 \
  --resolve draft-04 \
  --format-assertion
```

### Bindings

Bindings reference these shared schemas: `reference.json`, `schema.json`, `avroSchema_v1.json`, and through `schema.json` also `v3/externalDocs.json`.

All bindings:

```bash
jsonschema test test/draft-07/bindings \
  --resolve draft-07/bindings \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/v3/externalDocs.json \
  --format-assertion
```

One binding with all its versions, e.g. `apache-kafka`. Use the binding's folder name, not its key (`apache-kafka`, not `kafka`):

```bash
jsonschema test test/draft-07/bindings/apache-kafka \
  --resolve draft-07/bindings \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/v3/externalDocs.json \
  --format-assertion
```

One binding version, e.g. `apache-kafka` `0.5.0`:

```bash
jsonschema test test/draft-07/bindings/apache-kafka/0.5.0 \
  --resolve draft-07/bindings \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/v3/externalDocs.json \
  --format-assertion
```

The version folder holds only that version's objects. The routing by `bindingVersion` is tested by the files in the binding's root folder (`serverBinding.test.json`, `serverBindingOrReference.test.json`, …).

### Root schemas

Shared schemas in `draft-07/schemas` (`reference`, `schema`, `avroSchema_v1`, `openapiSchema_3_0`, `multiFormatSchema`, `anySchema`). The `*.examples.test.json` files load documents from `examples/schemas` with `dataPath`:

```bash
jsonschema test test/draft-07/schemas/*.test.json \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/openapiSchema_3_0.json \
  --resolve draft-07/schemas/multiFormatSchema.json --resolve draft-07/schemas/anySchema.json \
  --resolve draft-07/schemas/v3/externalDocs.json \
  --format-assertion
```

One root schema, e.g. `multiFormatSchema`: `test/draft-07/schemas/multiFormatSchema.test.json test/draft-07/schemas/multiFormatSchema.examples.test.json` with the same options.

### AsyncAPI v3

All v3 tests (shared `v3`, `v3.0.0`, `v3.1.0`):

```bash
jsonschema test test/draft-07/schemas/v3 test/draft-07/schemas/v3.0.0 test/draft-07/schemas/v3.1.0 \
  --resolve draft-07/schemas/v3 --resolve draft-07/schemas/v3.0.0 --resolve draft-07/schemas/v3.1.0 \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/anySchema.json \
  --resolve draft-07/schemas/multiFormatSchema.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/openapiSchema_3_0.json \
  --resolve draft-07/bindings \
  --format-assertion
```

One version, e.g. `v3.0.0`. Use the version's test and schema folders, and keep `draft-07/schemas/v3`, which every version uses:

```bash
jsonschema test test/draft-07/schemas/v3.0.0 \
  --resolve draft-07/schemas/v3 --resolve draft-07/schemas/v3.0.0 \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/anySchema.json \
  --resolve draft-07/schemas/multiFormatSchema.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/openapiSchema_3_0.json \
  --resolve draft-07/bindings \
  --format-assertion
```

Only the shared `v3` schemas: the same command with `test/draft-07/schemas/v3` and without the version folder.

### AsyncAPI v2

v2 messages also need `draft-07/integrations` (Avro and OpenAPI payloads).

All v2 tests (shared `v2`, `v2.0.0`–`v2.6.0`, release candidates excluded):

```bash
jsonschema test test/draft-07/schemas/v2 \
  test/draft-07/schemas/v2.0.0 test/draft-07/schemas/v2.1.0 test/draft-07/schemas/v2.2.0 \
  test/draft-07/schemas/v2.3.0 test/draft-07/schemas/v2.4.0 test/draft-07/schemas/v2.5.0 test/draft-07/schemas/v2.6.0 \
  --resolve draft-07/schemas/v2 \
  --resolve draft-07/schemas/v2.0.0 --resolve draft-07/schemas/v2.1.0 --resolve draft-07/schemas/v2.2.0 \
  --resolve draft-07/schemas/v2.3.0 --resolve draft-07/schemas/v2.4.0 --resolve draft-07/schemas/v2.5.0 \
  --resolve draft-07/schemas/v2.6.0 \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/v3/externalDocs.json \
  --resolve draft-07/integrations \
  --resolve draft-07/bindings \
  --format-assertion
```

One version, e.g. `v2.6.0`. Use the version's test and schema folders, and keep `draft-07/schemas/v2`, which every version uses:

```bash
jsonschema test test/draft-07/schemas/v2.6.0 \
  --resolve draft-07/schemas/v2 --resolve draft-07/schemas/v2.6.0 \
  --resolve draft-07/schemas/reference.json --resolve draft-07/schemas/schema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/v3/externalDocs.json \
  --resolve draft-07/integrations \
  --resolve draft-07/bindings \
  --format-assertion
```

Only the shared `v2` schemas:

```bash
jsonschema test test/draft-07/schemas/v2 --resolve draft-07/schemas/v2 --format-assertion
```
