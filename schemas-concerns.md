# AsyncAPI schemas: validation concerns and typos

Notes collected while writing `jsonschema test` suites for `draft-07/schemas/v3`, `v3.0.0` and `v3.1.0`
(`test/draft-07/schemas/`). Binding schemas are covered separately in [binding-concerns.md](binding-concerns.md).

Released JSON Schemas are **not changed without review**. Until something is fixed, the tests record the
current behavior and the test description names the quirk. When a fix lands, the matching test is flipped
and the entry moves to **Fixed**.

**Category**
- **Validation:** the schema accepts or rejects something it probably shouldn't.
- **Consistency:** the same thing is modeled differently across versions or objects.
- **Text:** a typo or stale wording in `title`/`description`. These have no effect on validation.
- **Example:** a wrong value in `examples`. These have no effect on validation.

**Status**
- **Open:** waiting for review.
- **By design:** confirmed as intended.
- **Fixed:** fixed, with its commit.

## Running the tests

`draft-07/schemas` can't be resolved as a whole: the v2.x folders register the same `$id` twice, and
`jsonschema.json` catalogs aren't JSON Schemas. Resolve only what v3 needs:

```bash
jsonschema test test/draft-07/schemas/v3 \
  --resolve draft-07/schemas/v3 \
  --resolve draft-07/schemas/anySchema.json --resolve draft-07/schemas/reference.json \
  --resolve draft-07/schemas/schema.json --resolve draft-07/schemas/multiFormatSchema.json \
  --resolve draft-07/schemas/avroSchema_v1.json --resolve draft-07/schemas/openapiSchema_3_0.json \
  --resolve draft-07/bindings --ignore draft-07/bindings/jsonschema.json \
  --format-assertion --verbose
```

For `v3.0.0` and `v3.1.0`, change the test folder and add `--resolve draft-07/schemas/<version>`.

## Summary

| Area | Schemas | Tests | Open |
|---|---|---|---|
| [v3 tag and externalDocs](#v3-tag-and-externaldocs) | `tag`, `tags`, `externalDocs`, `externalDocsOrReference` | 63 | 5 |

---

## v3 tag and externalDocs

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| TAG1 | Validation | `tags.json` | `uniqueItems` compares whole objects, so two tags with the same `name` and a different `description` pass. The spec says each tag name in the list MUST be unique. | Open |
| TAG2 | Validation | `tag.json` `name` | No `minLength`, so `"name": ""` passes. | Open |
| TAG3 | Consistency | `tag.json` `externalDocs` | It inlines `oneOf` [reference, externalDocs] instead of `$ref` to `externalDocsOrReference.json`, which every other object uses. Validation is the same. | Open |
| TAG4 | Example | `tag.json` example #3, `externalDocsOrReference.json` example #1 | The `$ref` points to a documentation page (`https://api.weather-forecast.am/docs…`) rather than to an External Docs object, e.g. `#/components/externalDocs/…`. | Open |
| TAG5 | Consistency | `tags.json` vs `externalDocsOrReference.json` | Tags pick the branch with `if`/`then`/`else` on `$ref`; External Docs or Reference uses `oneOf`. Both reject `$ref` with siblings, but the errors differ. | Open |
