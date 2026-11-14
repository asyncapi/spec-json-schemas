# AsyncAPI schemas: validation concerns and typos

Notes collected while writing `jsonschema test` suites for `draft-07/schemas/v2`, `v2.0.0`–`v2.6.0`, `v3`, `v3.0.0` and `v3.1.0`
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
| [v3.0.0 channel messages](#v300-channel-messages) | `channels/messages/channelMessage`, `channelMessageTrait(s)`, `channelMessages` | 143 | 6 |
| [v3.0.0 channels](#v300-channels) | `channels/channel`, `channels/channels` | 54 | 2 |
| [v3.0.0 operations](#v300-operations) | `operations/operation`, `operationTrait(s)`, `operations` | 101 | 4 |
| [v3.0.0 components](#v300-components) | `components/components` | 155 | 3 |
| [v3.0.0 binding maps](#v300-binding-maps) | `{channel,operation,server,message}Bindings` | 440 | 2 |
| [v3.0.0 component bindings](#v300-component-bindings) | 6 components × 19 bindings | 1356 | 0 |
| [v3.0.0 asyncapi](#v300-asyncapi) | `asyncapi` | 32 | 1 |
| [v3.1.0 servers](#v310-servers) | `servers/server`, `servers/servers` | 58 | 0 (SRV1–SRV4 apply) |
| [v3.1.0 channel messages](#v310-channel-messages) | `channels/messages/channelMessage`, `channelMessageTrait(s)`, `channelMessages` | 144 | 1 (MSG1–MSG6 apply) |
| [v3.1.0 channels](#v310-channels) | `channels/channel`, `channels/channels` | 54 | 0 (CH1, CH2 apply) |
| [v3.1.0 operations](#v310-operations) | `operations/operation`, `operationTrait(s)`, `operations` | 101 | 0 (OP1–OP4 apply) |
| [v3.1.0 components](#v310-components) | `components/components` | 155 | 0 (COMP1, COMP3 apply) |
| [v3.1.0 component bindings](#v310-component-bindings) | 6 components × 20 bindings | 1410 | 0 |
| [v3.1.0 asyncapi](#v310-asyncapi) | `asyncapi` | 32 | 0 (DOC1 applies) |
| [v2 shared schemas](#v2-shared-schemas) | `v2/**` (tag, externalDocs, info, correlationId, schema, schemas, security, securityRequirements) | 434 | 2 |
| [v2.0.0 servers](#v200-servers) | `servers/server`, `servers`, `serverVariable(s)` | 75 | 3 |
| [v2.0.0 channels](#v200-channels) | `channels/channelItem`, `channels`, `parameter(s)` | 69 | 3 |
| [v2.0.0 messages](#v200-messages) | `channels/messages/message`, `messageTrait`, `messages`, `security/securitySchema` | 136 | 5 |
| [v2.0.0 operations](#v200-operations) | `channels/operations/operation`, `operationTrait` | 69 | 2 |
| [v2.0.0 components](#v200-components) | `components/components` | 79 | 2 |
| [v2.0.0 binding maps](#v200-binding-maps) | `{channel,operation,server,message}Bindings` | 296 | 2 |
| [v2.0.0 component bindings](#v200-component-bindings) | 6 components × 16 bindings | 1171 | 0 |
| [v2.0.0 asyncapi](#v200-asyncapi) | `asyncapi` | 27 | 0 |
| [v2.1.0 servers](#v210-servers) | `servers/server`, `servers`, `serverVariable(s)` | 75 | 0 |
| [v2.1.0 channels](#v210-channels) | `channels/channelItem`, `channels`, `parameter(s)` | 69 | 0 |
| [v2.1.0 messages](#v210-messages) | `channels/messages/message`, `messageTrait`, `messages` | 120 | 0 |
| [v2.1.0 operations](#v210-operations) | `channels/operations/operation`, `operationTrait` | 69 | 0 |
| [v2.1.0 components](#v210-components) | `components/components` | 79 | 0 |
| [v2.1.0 binding maps](#v210-binding-maps) | `{channel,operation,server,message}Bindings` | 296 | 0 |
| [v2.1.0 component bindings](#v210-component-bindings) | 6 components × 16 bindings | 1171 | 0 |
| [v2.1.0 asyncapi](#v210-asyncapi) | `asyncapi` | 27 | 0 |
| [v2.2.0 servers](#v220-servers) | `servers/server`, `servers`, `serverVariable(s)` | 75 | 0 |
| [v2.2.0 channels](#v220-channels) | `channels/channelItem`, `channels`, `parameter(s)` | 72 | 1 |
| [v2.2.0 messages](#v220-messages) | `channels/messages/message`, `messageTrait`, `messages` | 120 | 0 |
| [v2.2.0 operations](#v220-operations) | `channels/operations/operation`, `operationTrait` | 69 | 0 |
| [v2.2.0 components](#v220-components) | `components/components` | 79 | 0 |

All 78 v3 schemas are covered: v3 651, v3.0.0 2339, v3.1.0 1954 — **4944 tests**, all passing, **56 open** concerns.
No schema under `draft-07/` was changed.

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

## v3.0.0 channel messages

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| MSG1 | Validation | `channels/messages/channelMessageTrait.json` | `patternProperties` and `additionalProperties` are nested **inside** `properties`, so they define two properties with those names instead of restricting the object. As a result any unknown key passes (`messageId`, `$ref`, `x-`), `payload` and `traits` pass although the spec forbids them in a trait, and a property literally named `additionalProperties` is always rejected. `channelMessage.json` has them at the right level. | Open |
| MSG2 | Validation | `anySchema.json` (`payload`, `headers`, `components.schemas`) | `"type": "object"` rejects boolean schemas, so `"payload": true` fails although the Schema Object description allows `true`/`false`. | Open |
| MSG3 | Validation | `channels/messages/channelMessage.json` `headers` | The spec says headers MUST be a Schema of type `object`, but `{"type": "string"}` passes. | Open |
| MSG4 | Validation | `multiFormatSchema.json` | An unknown `schemaFormat` matches no branch, so its `schema` isn't validated (`{"schemaFormat": "application/x-unknown", "schema": 1}` passes), and `schema` isn't required. | Open |
| MSG5 | Validation | `channels/messages/channelMessage.json` `contentType` | Any string passes, e.g. `json`; there's no media-type pattern. | Open |
| MSG6 | Validation | `channels/messages/channelMessageTraits.json`, `operations/operationTraits.json` | No `uniqueItems`, so the same trait can be applied twice. | Open |

## v3.0.0 channels

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| CH1 | Validation | `channels/channel.json` `address` | No pattern or `minLength`, so `""` passes. It isn't checked that the expressions in `{braces}` have matching `parameters` (parser rule). | Open |
| CH2 | Example | `channels/channel.json` examples | `$ref`s point to paths that don't exist: `#/docs/user-events`, `#/components/user.signedUp` (should be `#/components/externalDocs/…` and `#/components/messages/…`). | Open |

## v3.0.0 operations

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| OP1 | Text | `operations/operationTraits.json` | `title` is "AsyncAPI v3.0.0 - **Channel Message Traits**" and the description says "Collection of Channel Message Traits … MUST be a valid **Message** Object"; it's the operation traits list. | Open |
| OP2 | Text | `operations/operationTraits.json`, `operations/operations.json` `description` | "…or **it's** reference(s)" should be "its" (see A2 in binding-concerns.md). | Open |
| OP3 | Example | `operations/operation.json` examples | `"reply": {"$ref": "#/channels/user-events-replies.v1"}` makes the reply a reference to a **channel**; other `$ref`s point to paths that don't exist (`#/security/oauth2`, `#/documents/…`, `#/messages/user/…`). "events **bases** on" is a typo. | Open |
| OP4 | Consistency | `operations/operationTrait.json` | `summary` and `description` are documented differently from `operation.json` ("A short summary of what the operation is about" vs "A brief summary of the operation"). | Open |

## v3.0.0 components

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| COMP1 | Validation | `components/components.json`, every section | Keys are checked with `patternProperties` `^[\w\d\.\-_]+$` but without `additionalProperties: false`, so an entry under a key outside the pattern isn't validated at all: `{"messages": {"a b": {"payload": true}}}` passes. The spec says keys MUST match the pattern. | Open |
| COMP2 | Consistency | `components/components.json` `*Bindings` | Components use `draft-07/bindings/*Bindings.json`, which include `ros2`, while `server`, `channel`, `operation` and `message` in v3.0.0 use `v3.0.0/*Bindings.json` without `ros2`. A `ros2` binding can be stored in components but not used on an object. | Open |
| COMP3 | Text | `components/components.json` `operations` | It's the only section without a `description`. | Open |

## v3.0.0 binding maps

`v3.0.0/{channel,operation,server,message}Bindings.json` are copies of `draft-07/bindings/*Bindings.json`
without `ros2`. The tests reuse `test/draft-07/bindings/*Bindings.test.json` cases, with the `ros2` cases flipped to invalid.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| BMAP1 | Consistency | all four maps | `ros2` is missing, so `bindings.ros2` is rejected on v3.0.0 objects but accepted in v3.0.0 `components.*Bindings` (see COMP2). | Open |
| BMAP2 | Text | `channelBindings.json`, `serverBindings.json`, `messageBindings.json` `description`; `operationBindings.json`, `serverBindings.json` `title` | Same as MAP1/MAP2 in binding-concerns.md: "for **an** channel/server/message", and lowercase "**server** Bindings", "**operation** Bindings". | Open |

## v3.0.0 component bindings

`{component}.{bindingKey}.test.json` next to each component with `bindings` (server, channel, operation,
operationTrait, channelMessage, channelMessageTrait), one file per key of the v3.0.0 binding map (19 keys, no `ros2`).
Each file goes through every binding version from latest to oldest: the version's own examples pass, and one rule
violation taken from that version's suite in `test/draft-07/bindings` fails. Shared cases cover a reference, a
reference with extra property, an unknown or non-string `bindingVersion`, a non-object binding and, where it differs,
the folder name used as a key.

Every component routes each key to the right binding and version; no new concerns. Binding-level quirks are in
[binding-concerns.md](binding-concerns.md).

## v3.0.0 asyncapi

The root accepts only `"asyncapi": "3.0.0"` (`3.1.0`, `2.6.0`, `3.0` and the number `3` are rejected), requires
`info`, and rejects the v2 root fields `tags` and `externalDocs` that moved into `info`.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| DOC1 | Example | `asyncapi.json` example #2, `servers/servers.json` examples #1 and #3 | `"mqtt": {"$ref": "#/servers/mqtt"}` is a server that references itself. `#/components/user.signedUp` (see CH2) also appears here. | Open |

## v3.1.0 servers

`server.json` and `servers.json` are identical to v3.0.0 except that `bindings` uses `draft-07/bindings/serverBindings.json`
(with `ros2`). Same concerns as [v3.0.0 servers](#v300-servers): SRV1–SRV4.

## v3.1.0 channel messages

Identical to v3.0.0 except `bindings` (`draft-07/bindings/messageBindings.json`). Same concerns as
[v3.0.0 channel messages](#v300-channel-messages): MSG1–MSG6, including the nested `additionalProperties` in `channelMessageTrait.json`.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| MSG7 | Validation | `multiFormatSchema.json` `schemaFormat` | The AsyncAPI formats stop at `version=3.0.0`, so a v3.1.0 document with `application/vnd.aai.asyncapi+json;version=3.1.0` falls into no branch and its schema isn't validated: `{"type": "map"}` passes. | Open |

## v3.1.0 channels

Identical to v3.0.0 except `bindings` (`draft-07/bindings/channelBindings.json`). Same concerns as [v3.0.0 channels](#v300-channels): CH1, CH2.

## v3.1.0 operations

Identical to v3.0.0 except `bindings` (`draft-07/bindings/operationBindings.json`). Same concerns as [v3.0.0 operations](#v300-operations): OP1–OP4.

## v3.1.0 components

Identical to v3.0.0 apart from the examples (which add `ros2`). Objects and components now use the same
`draft-07/bindings` maps, so COMP2/BMAP1 don't apply. COMP1 and COMP3 do.

## v3.1.0 component bindings

Same layout as [v3.0.0 component bindings](#v300-component-bindings), one file per key of `draft-07/bindings/*Bindings.json`
(20 keys, including `ros2`). Every component routes each key to the right binding and version; no new concerns.

## v3.1.0 asyncapi

Identical to v3.0.0 except `"asyncapi": "3.1.0"`; `3.0.0` is rejected. DOC1 applies.

## v2 shared schemas

`draft-07/schemas/v2` is shared by v2.0.0–v2.6.0. Security schemas match v3 except that the OAuth2 flows use `scopes`
(v3: `availableScopes`) and `openIdConnect` has no `scopes`. The v2 security suites are derived from the v3 ones.
These v3 concerns apply to v2 as well: TAG2, INFO2, CHAN2 (correlationId), SEC1, SEC2, SEC5–SEC7.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2-1 | Validation | `schema.json` | `allOf[1]` has `"type": "object"`, so boolean schemas are rejected: `true`, `false`, and nested ones like `{"properties": {"a": true}}`. JSON Schema draft-07 allows them. `additionalProperties: false` still passes because it's handled separately. | Open |
| V2-2 | Validation | `security/oauth2/oauth2.json` | It has the scheme-level `scopes` array that AsyncAPI added in v3, so a v2 document with `scopes` next to `flows` passes. | Open |

## v2.0.0 servers

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2S1 | Validation | `servers/server.json` `security` (all v2.x) | Items are inline Security Scheme objects (`v2/security/securitySchema.json`), with no Reference branch. A Security Requirement map such as `[{"x509": []}]`, the form the v2 spec describes, is rejected, and a scheme declared in `components.securitySchemes` can't be referenced. | Open |
| V2S2 | Validation | `servers/servers.json`, `servers/serverVariables.json` | Map keys aren't validated (see SRV1). | Open |
| V2S3 | Validation | `servers/serverVariable.json` | Same as SVAR1 and SVAR2: `default` isn't checked against `enum`, and `enum: []` passes. | Open |

## v2.0.0 channels

`channels.json` keys are checked with `propertyNames` (`format: uri-template`, `minLength: 1`), so empty names and
unclosed `{expressions}` are rejected.

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2C1 | Validation | `channels/channelItem.json` `$ref` | `$ref` is a plain property, so `{"$ref": "…", "publish": {…}}` passes and the siblings are validated as if the channel were inline. | Open |
| V2C2 | Validation | `channels/parameter.json` `$ref` (2.0.0–2.4.0) | The property is defined as `reference.json`, so it expects an object: `{"$ref": {"$ref": "#/…"}}` passes and `{"$ref": "#/…", "description": "x"}` is rejected. Plain references only work through `parameters.json`, which routes them with `if`/`then`. Removed in 2.5.0. | Open |
| V2C3 | Validation | `channels/parameter.json` | No `"type": "object"`, so a string or number passes as a parameter (see CHAN1). The `location` pattern is unanchored (see CHAN2). | Open |

## v2.0.0 messages

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2M1 | Validation | `channels/messages/message.json`, `messageTrait.json` `headers` (all v2.x) | `allOf` [schema, `{"properties": {"type": {"const": "object"}}}`] only checks `type` when it's present, so a headers schema without `type` passes. Boolean schemas are rejected (see V2-1). | Open |
| V2M2 | Validation | `channels/messages/message.json` `payload` (all v2.x) | An unknown `schemaFormat`, or an AsyncAPI format for a later version, matches no branch, so the payload isn't validated (see MSG4/MSG7). | Open |
| V2M3 | Consistency | `channels/messages/message.json` `examples` | In 2.0.0 example items allow only `headers` and `payload`, with neither required, so `{}` passes and `name` is rejected; 2.1.0+ adds `name`, `summary` and requires one of `payload`/`headers`. | Open |
| V2M4 | Consistency | `channels/messages/messageTrait.json` `examples` | Items are any object in 2.0.0 and 2.2.0–2.5.0, but fully defined (like the message examples) in 2.1.0 and 2.6.0. | Open |
| V2M5 | Consistency | `v2.0.0/security/securitySchema.json` | This 2.0.0-only copy (without SASL) isn't referenced: `server.json` and `components.json` use `v2/security/securitySchema.json`, so SASL types (`plain`, `scramSha256`, `gssapi`) are accepted in 2.0.0 documents. | Open |

## v2.0.0 operations

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2O1 | Example | `channels/operations/operation.json` examples #2, #4; `operationTrait.json` example #1 (all v2.x) | `externalDocs.url` values are relative (`messages/sending-rules`, `messages/validation-rules`), so these examples fail `format: uri`. The tests record them as invalid. | Open |
| V2O2 | Validation | `channels/operations/operation.json` `message` | Same as V2M2. | Open |

## v2.0.0 components

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2K1 | Validation | `components/components.json` `securitySchemes`, `correlationIds` | Keys are checked with `patternProperties` only, so entries under keys outside `^[\w\d\.\-_]+$` aren't validated (see COMP1). The other sections use `additionalProperties`, so every key is validated but none is restricted. | Open |
| V2K2 | Validation | `components/components.json` `operationTraits`, `messageTraits` | No Reference branch, so `{"$ref": "#/components/messageTraits/b"}` is rejected for a message trait (`$ref` is an unknown property) and validated as an operation trait. | Open |

## v2.0.0 binding maps

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2B1 | Validation | `{channel,operation,server,message}Bindings.json` (all v2.x) | The maps have `additionalProperties: true`, so any key is accepted unvalidated: unknown protocols, folder names like `apache-kafka`, `ros2`, and (before 2.6.0) `googlepubsub`/`pulsar`, e.g. `{"googlepubsub": {"bindingVersion": "9.9.9"}}`. Known keys are validated. | Open |
| V2B2 | Text | `channelBindings.json`, `serverBindings.json`, `messageBindings.json` `description` (all v2.x) | "…for **an** channel/server/message" (see MAP1). | Open |

## v2.0.0 component bindings

`{component}.{bindingKey}.test.json` next to server, channelItem, operation, operationTrait, message and messageTrait,
one file per key of the v2.0.0 binding maps (16 keys), built like [v3.0.0 component bindings](#v300-component-bindings).
Because the maps are open (V2B1), the folder-name case is recorded as accepted unvalidated. No new concerns.

## v2.0.0 asyncapi

The root requires `asyncapi`, `info` and `channels`, accepts only `"asyncapi": "2.0.0"`, and allows root `tags` and `externalDocs`. No new concerns.

## v2.1.0 servers

Same concerns as [v2.0.0 servers](#v200-servers): V2S1–V2S3.

## v2.1.0 channels

Same concerns as [v2.0.0 channels](#v200-channels).

## v2.1.0 messages

Same concerns as [v2.0.0 messages](#v200-messages): V2M1, V2M2, V2M4.

## v2.1.0 operations

Same concerns as [v2.0.0 operations](#v200-operations): V2O1, V2O2.

## v2.1.0 components

Same concerns as [v2.0.0 components](#v200-components): V2K1, V2K2.

## v2.1.0 binding maps

Same concerns as [v2.0.0 binding maps](#v200-binding-maps): V2B1, V2B2.

## v2.1.0 component bindings

Built like [v2.0.0 component bindings](#v200-component-bindings), one file per key of the v2.1.0 maps (16 keys). No new concerns.

## v2.1.0 asyncapi

Accepts only `"asyncapi": "2.1.0"`. No new concerns.

## v2.2.0 servers

Same concerns as [v2.0.0 servers](#v200-servers): V2S1–V2S3.

## v2.2.0 channels

`channelItem.servers` (added in 2.2.0) is a unique list of server names. Same concerns as [v2.0.0 channels](#v200-channels).

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| V2C4 | Validation | `channels/channelItem.json` `servers` (2.2.0+) | Names aren't checked to exist in `servers` (needs a parser rule), and any string passes, including `""`. | Open |

## v2.2.0 messages

Same concerns as [v2.0.0 messages](#v200-messages): V2M1, V2M2, V2M4.

## v2.2.0 operations

Same concerns as [v2.0.0 operations](#v200-operations): V2O1, V2O2.

## v2.2.0 components

Same concerns as [v2.0.0 components](#v200-components): V2K1, V2K2.
