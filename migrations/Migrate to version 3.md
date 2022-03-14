# Migrating to version 3

In version 3, the only breaking change is that the provided bundled schemas located under [schemas](../schemas) now use completely different `$id`s and definition namings.

> If you don't manually access schemas under `definitions`, you can upgrade the version without any problems.

Previously, each definition would have it defined as:

```json
{
  ...
  "definitions": {
    "Reference": { ... },
    "ReferenceObject": { ... },
    "info": { ... },
    ...
  }
}
```

With the new naming approach, those definitions would be called:

```json
{
  ...
  "definitions": {
    "http://asyncapi.com/definitions/2.2.0/Reference.json": { ... },
    "http://asyncapi.com/definitions/2.2.0/ReferenceObject.json": { ... },
    "http://asyncapi.com/definitions/2.2.0/info.json": { ... },
    ...
  }
}
```

All definitions follow the same change from `<name>` to `http://asyncapi.com/definitions/<version>/<name>.json`.
