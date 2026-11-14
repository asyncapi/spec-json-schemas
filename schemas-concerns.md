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
| [v3 info](#v3-info) | `info`, `contact`, `license`, `infoExtensions`, `extensions/x/0.1.0`, `extensions/linkedin/0.1.0` | 92 | 6 |
| [v3 server variables](#v3-server-variables) | `servers/serverVariable`, `servers/serverVariables` | 30 | 4 |

---

## v3 tag and externalDocs

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| TAG1 | Validation | `tags.json` | `uniqueItems` compares whole objects, so two tags with the same `name` and a different `description` pass. The spec says each tag name in the list MUST be unique. | Open |
| TAG2 | Validation | `tag.json` `name` | No `minLength`, so `"name": ""` passes. | Open |
| TAG3 | Consistency | `tag.json` `externalDocs` | It inlines `oneOf` [reference, externalDocs] instead of `$ref` to `externalDocsOrReference.json`, which every other object uses. Validation is the same. | Open |
| TAG4 | Example | `tag.json` example #3, `externalDocsOrReference.json` example #1 | The `$ref` points to a documentation page (`https://api.weather-forecast.am/docs…`) rather than to an External Docs object, e.g. `#/components/externalDocs/…`. | Open |
| TAG5 | Consistency | `tags.json` vs `externalDocsOrReference.json` | Tags pick the branch with `if`/`then`/`else` on `$ref`; External Docs or Reference uses `oneOf`. Both reject `$ref` with siblings, but the errors differ. | Open |

## v3 info

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| INFO1 | Consistency | `info.json` `tags`, `externalDocs` | Both are inlined (`oneOf` [reference, tag] / [reference, externalDocs]) instead of `$ref` to `tags.json` and `externalDocsOrReference.json`. Same result, but three copies of one rule. Tag names aren't unique here either (see TAG1). | Open |
| INFO2 | Validation | `info.json` `version` | The description says "A semantic version number", but any string passes, e.g. `"latest"`. | Open |
| INFO3 | Validation | `info.json` `title` | No `minLength`, so `"title": ""` passes. | Open |
| INFO4 | Validation | `extensions/linkedin/0.1.0` | The pattern `^http(s)?://(www\.)?linkedin\.com.*$` isn't anchored to the host, so `https://linkedin.com.evil.example/…` passes, while country subdomains such as `https://am.linkedin.com/in/…` are rejected. | Open |
| INFO5 | Validation | `extensions/x/0.1.0` | The description asks for a username, but there's no pattern: `@name`, a profile URL and `""` all pass. | Open |
| INFO6 | Example | `infoExtensions.json` examples #2, #3 | `x-x` is a profile URL (`https://x.com/…`), but the X extension expects a username (its own examples are `AsyncAPISpec`, `sambhavgupta75`). `info.json` example #5 uses `@weather-forecast`, a third form. | Open |

## v3 server variables

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| SVAR1 | Validation | `serverVariable.json` | `default` isn't checked against `enum`: `{"enum": ["8883", "8884"], "default": "1883"}` passes. JSON Schema can't express this; it needs a custom rule in the parser. | Open |
| SVAR2 | Validation | `serverVariable.json` `enum` | No `minItems`, so `"enum": []` passes, which leaves no valid substitution. | Open |
| SVAR3 | Validation | `serverVariables.json` | Map keys aren't validated (no `propertyNames`/`patternProperties`), so names like `{port}` or `base path` pass. Other v3 maps restrict keys to `^[\w\d\.\-_]+$`. | Open |
| SVAR4 | Example | `serverVariables.json` example | `"$ref": "#/variables/base-path"` points to a path that doesn't exist in an AsyncAPI document; it should be `#/components/serverVariables/…`. | Open |
