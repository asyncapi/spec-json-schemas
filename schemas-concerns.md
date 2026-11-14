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
| [v3 security](#v3-security) | `security/**`, `securityRequirements` | 331 | 8 |
| [v3 channels](#v3-channels) | `channels/channelAddressParameter(s)`, `channels/messages/*` | 86 | 7 |
| [v3 operation reply](#v3-operation-reply) | `operations/operationReply*` | 49 | 3 |
| [v3.0.0 servers](#v300-servers) | `servers/server`, `servers/servers` | 58 | 4 |

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
| SVAR3 | Validation | `serverVariables.json` | Map keys aren't validated (no `propertyNames`/`patternProperties`), so names like `{port}` or `base path` pass. The `components` maps restrict keys to `^[\w\d\.\-_]+$`. | Open |
| SVAR4 | Example | `serverVariables.json` example | `"$ref": "#/variables/base-path"` points to a path that doesn't exist in an AsyncAPI document; it should be `#/components/serverVariables/…`. | Open |

## v3 security

All 14 security types are mutually exclusive in `securitySchema.json` `oneOf`: every type has its own `const`
(or enum for SCRAM), and `nonBearerHTTPSecuritySchema.json` excludes `scheme: bearer` with `not`. `apiKey`
(`in`: user/password) and `httpApiKey` (`in`: header/query/cookie) don't overlap.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| SEC1 | Validation | `http/nonBearerHTTPSecuritySchema.json` | `not` excludes only lowercase `bearer`. RFC 7235 schemes are case-insensitive, so `{"type": "http", "scheme": "Bearer"}` passes as non-bearer, and then `bearerFormat` is rejected. | Open |
| SEC2 | Validation | `oauth2/oauth2.json` `flows` | No `minProperties`, so `"flows": {}` passes and the scheme has no flow at all. | Open |
| SEC3 | Validation | `oauth2/oauth2.json`, `openIdConnect.json` `scopes` | No `uniqueItems`, and `oauth2` `scopes` aren't checked against the flows' `availableScopes` (the latter needs a parser rule). | Open |
| SEC4 | Validation | `securityRequirements.json` | No `uniqueItems`, so the same scheme can be listed twice. | Open |
| SEC5 | Text | `oauth2/flows/passwordOAuthFlow.json` `description` | It starts "Contains information about OAuth2 **Implicit** flow"; it's the Password flow. | Open |
| SEC6 | Text | `sasl/saslPlainSecuritySchema.json` `type`; `sasl/saslScramSecuritySchema.json` `description`; `http/nonBearerHTTPSecuritySchema.json` `not.properties.scheme` | "The type of the security scheme. **Valid values**" is cut off. The SCRAM description contains link titles pasted as text ("uses **Apache Kafka Documentation** or similar platforms, utilizing … like **Confluent Platform SCRAM Overview** (…)"). The `not` scheme is described as "A short description for security scheme". | Open |
| SEC7 | Consistency | `userPassword.json`, `X509.json`, `symmetricEncryption.json` | `description` and `type` have no `description`; every other security type documents them. | Open |
| SEC8 | Example | `securityRequirements.json` example | `"$ref": "#/security/x.509"` points to a path that doesn't exist; security schemes live under `#/components/securitySchemes/…`. `v3.0.0` / `v3.1.0` `server.json` examples use `#/components/security/x.509`, which doesn't exist either. | Open |

## v3 channels

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| CHAN1 | Validation | `channelAddressParameter.json` | There's no `"type": "object"`, so any non-object passes as a parameter, e.g. `"user-id"` or `1`. | Open |
| CHAN2 | Validation | `channelAddressParameter.json`, `messages/channelMessageCorrelationId.json` `location` | The runtime-expression pattern has no `$` anchor, so after `#` anything passes: `$message.payload#user.id` is accepted although a JSON Pointer must start with `/`. | Open |
| CHAN3 | Validation | `channelAddressParameter.json` `enum`, `default` | `enum` has no `uniqueItems` (Server Variable has it), and `default` isn't checked against `enum` (see SVAR1). | Open |
| CHAN4 | Validation | `channelAddressParameters.json` | Map keys aren't validated (see SVAR3). | Open |
| CHAN5 | Validation | `messages/channelMessageExample.json` | `additionalProperties: false` with no `patternProperties`, so `x-` extensions are rejected; the spec says the Message Example Object MAY be extended. `headers` is described as "It can be of any type" but is `type: object`. | Open |
| CHAN6 | Text | `messages/channelMessageCorrelationId.json` | "…an identifier at design time that **can used** for…" and "**A optional** description". | Open |
| CHAN7 | Example | `channelAddressParameters.json`, `messages/channelMessageCorrelationIdOrReference.json` | `$ref`s point to paths that don't exist: `#/parameters/time-zone` and `#/messages/profile-updates/correlation-id`; they should be `#/components/parameters/…` and `#/components/correlationIds/…`. | Open |

## v3 operation reply

`operationReplyOrReference.json` and `operationReplyAddressOrReference.json` branches are mutually exclusive:
Reference requires `$ref` and allows nothing else; the other branch has `additionalProperties: false` without `$ref`.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| REPLY1 | Validation | `operationReplyAddress.json` `location` | Same unanchored runtime-expression pattern as CHAN2. | Open |
| REPLY2 | Validation | `operationReply.json` `messages` | No `uniqueItems`, so the same message reference can be listed twice. The "subset of the channel's messages" rule needs a parser check. | Open |
| REPLY3 | Example | `operationReply.json`, `operationReplyOrReference.json`, `operationReplyAddressOrReference.json` | `$ref`s point to paths that don't exist: `#/replies/…` and `#/messages/…`; they should be `#/components/replies/…`, `#/components/replyAddresses/…` and `#/channels/<channel>/messages/…`. | Open |

## v3.0.0 servers

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| SRV1 | Validation | `servers/servers.json` | Map keys aren't validated, so server names like `a b` pass. The spec restricts component keys to `^[a-zA-Z0-9\.\-_]+$`. Same in `channels.json`, `operations.json` and `channelMessages.json`. | Open |
| SRV2 | Validation | `servers/server.json` `host`, `pathname` | `host` accepts a scheme (`amqp://…`, the spec says host name and port only), and `pathname` doesn't require a leading `/`. | Open |
| SRV3 | Text | `servers/server.json` `protocolVersion` | It's described as "An optional string describing the server. CommonMark syntax MAY be used…", which is the `description` text; it should be "The version of the protocol used for connection". | Open |
| SRV4 | Example | `servers/server.json` example | `"$ref": "#/components/security/x.509"` (see SEC8) and `"$ref": "#/tags/secured"` point to paths that don't exist; "**Reade** step by step guide" is a typo. | Open |
