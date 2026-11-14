# Binding schemas: validation concerns and typos

Notes collected while writing `jsonschema test` suites for `draft-07/bindings` (`test/draft-07/bindings/`).

Released JSON Schemas are **not changed without review**. A fix to a released schema ships through a new
binding version, except validation-rule fixes, which may be applied in place after review. Until something
is fixed, the tests record the current behavior and the test description names the quirk. When a fix lands,
the matching test is flipped and the entry moves to **Fixed**.

**Category**
- **Validation:** the schema accepts or rejects something it probably shouldn't.
- **Consistency:** the same thing is modeled differently across versions or objects.
- **Text:** a typo or stale wording in `title`/`description`. These have no effect on validation.
- **Example:** a wrong value in `examples`. These have no effect on validation.

**Status**
- **Open:** waiting for review.
- **By design:** confirmed as intended.
- **Fixed:** fixed, with its commit.

## Summary

| Binding | Versions | Tests | Open |
|---|---|---|---|
| [amazon-sns](#amazon-sns) | 0.1.0, 0.2.0 | 517 | 4 |
| [amazon-sqs](#amazon-sqs) | 0.1.0, 0.2.0, 0.3.0 | 715 | 6 |
| [amqp](#amqp) | 0.1.0, 0.2.0, 0.3.0 | 511 | 5 |
| [amqp1](#amqp1) | 0.1.0 | 116 | 2 |
| [anypointmq](#anypointmq) | 0.0.1 | 148 | 1 |
| [apache-kafka](#apache-kafka) | 0.1.0, 0.3.0, 0.4.0, 0.5.0 | 588 | 3 |
| [apache-pulsar](#apache-pulsar) | 0.1.0 | 159 | 2 |
| [googlepubsub](#googlepubsub) | 0.1.0, 0.2.0 | 267 | 6 |
| [http](#http) | 0.1.0, 0.2.0, 0.3.0 | 390 | 5 |
| [ibmmq](#ibmmq) | 0.1.0 | 194 | 7 |
| [jms](#jms) | 0.0.1 | 157 | 5 |
| [mercure](#mercure) | 0.1.0 | 128 | 1 |
| [mqtt](#mqtt) | 0.1.0, 0.2.0 | 288 | 7 |
| [mqtt5](#mqtt5) | 0.1.0, 0.2.0 | 204 | 5 |
| [nats](#nats) | 0.1.0 | 128 | 2 |
| [redis](#redis) | 0.1.0 | 128 | 1 |
| [All bindings](#all-bindings) | | | 3 |

Not covered yet: ros2, solace, stomp, websockets, and the
top-level `channelBindings.json`, `operationBindings.json`, `serverBindings.json`, `messageBindings.json`.

---

## All bindings

| # | Category | Where | Concern | Status |
|---|---|---|---|---|
| A1 | Text | every `*Binding.json` | "If bindingVersion is omitted, **than** use latest JSON Schema" | Fixed `6c6047a` |
| A2 | Text | every `*BindingOrReference.json` | "…or **it's** reference" | Fixed `88e1e4c` |
| A3 | Text | every `operationBinding*.json` | "…definitions for **a operation**" | Fixed `6f221d7` |
| A4 | Consistency | many version schemas (listed per binding) | Some objects allow `x-` extensions (`patternProperties`) and others don't, even within one binding version. Tests record `{"x-owner": "team"}` as invalid where there's no `patternProperties`. | Open |
| A5 | Example | `messageBindingOrReference.json` in all bindings except amazon-sqs | The message example `$ref` points to a channel-style name (`my-<binding>-queue`, `my-sns-topic`, `my-ros2-binding`). | Open |
| A6 | Example | `amqp1/*BindingOrReference.json`, `websockets/*BindingOrReference.json` | The example `$ref` uses the **amqp** binding path (`#/bindings/amqp/my-amqp-…`). It's a copy-paste from amqp. | Open |

Outside `draft-07/bindings`, the A2/A3 typos are still present. These files are out of scope here:
`draft-07/schemas/v3.0.0/operations/*`, `v3.1.0/operations/*`, `multiFormatSchema.json`, and the
`v2.0.0-rc2` bundled files.

---

## amazon-sns

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| SNS1 | Validation | 0.1.0, 0.2.0 | channel `ordering`; operation `consumer`, `deliveryPolicy` | No `additionalProperties`, so unknown keys are accepted. For example, `ordering.deduplicationScope` and `consumer.region` pass. | Open |
| SNS2 | Validation | 0.1.0, 0.2.0 | channel `tags` | Tag values aren't validated: `{"replicas": 3}` passes. | Open |
| SNS3 | Validation | 0.1.0 | channel `statement` | `condition` and `resource` aren't defined, and `statement` has no `additionalProperties`, so any value passes (e.g. `"condition": 1`). 0.2.0 defines both. | Open |
| SNS4 | Consistency | 0.1.0, 0.2.0 | server, message | No `x-` extensions are allowed (see A4). | Open |

## amazon-sqs

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| SQS1 | Validation | 0.3.0 | operation `queue.deliveryDelay` | The `maximum` was 15; it should be 900, the same as everywhere else. | Fixed `2cfe74c` |
| SQS2 | Consistency | 0.2.0, 0.3.0 | channel `queue` vs operation `queue` | The channel queue requires `fifoQueue`; the operation queue doesn't. | Open |
| SQS3 | Validation | 0.2.0, 0.3.0 | channel and operation `queue`, `identifier` | No `additionalProperties`, so unknown keys are accepted (e.g. `kmsMasterKeyId`). | Open |
| SQS4 | Validation | 0.2.0, 0.3.0 | `queue.receiveMessageWaitTime` | No bounds: `100000` passes. AWS allows 0–20 seconds. | Open |
| SQS5 | Validation | 0.2.0, 0.3.0 | `queue.tags` | Tag values aren't validated. | Open |
| SQS6 | Validation | 0.2.0 | `statement` | `condition` and `resource` aren't defined and aren't validated (same as SNS3). 0.3.0 defines both. | Open |
| SQS7 | Consistency | 0.1.0 (all objects), 0.2.0 and 0.3.0 (server, message) | | No `x-` extensions are allowed (see A4). | Open |

## amqp

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| AMQP1 | Validation | 0.1.0–0.3.0 | channel | `is` is optional: `exchange` or `queue` without `is` passes. | Open |
| AMQP2 | Validation | 0.1.0–0.3.0 | channel `exchange`, `queue` | No `additionalProperties`, so unknown keys are accepted. In 0.1.0 this means `vhost` (added in 0.2.0) passes unvalidated, even as `"vhost": 1`. | Open |
| AMQP3 | Validation | 0.1.0–0.3.0 | operation `priority` | No bounds: `-100` passes. AMQP 0-9-1 priority is 0–255; brokers commonly use 0–9. | Open |
| AMQP4 | Consistency | 0.1.0–0.3.0 | server | No `x-` extensions are allowed (see A4). | Open |
| AMQP5 | Text | 0.3.0 | `server.json` `title` | It's "AMQP 0-9-1 - Server Binding", missing " v0.3.0"; every other version file has the version. | Open |

## amqp1

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| AMQP1-1 | Consistency | 0.1.0 | all four objects and roots | No `x-` extensions are allowed anywhere (see A4). | Open |
| AMQP1-2 | Example | root | `*BindingOrReference.json` | The example `$ref` uses `#/bindings/amqp/…` (see A6). | Open |

## anypointmq

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| APMQ1 | Validation | root | `*Binding.json` fallback branch | The fallback used `"const": "0.1.0"` instead of `0.0.1`. | Fixed `dc165f9` |
| APMQ2 | Consistency | 0.0.1 | operation, server | No `x-` extensions are allowed; channel and message allow them (see A4). | Open |

## apache-kafka

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| KAFKA1 | Validation | root | `operationBinding.json`, `serverBinding.json` fallback | The fallback enum listed a nonexistent `0.2.0`, so `{"bindingVersion": "0.2.0", …}` matched no branch and validated nothing. | Fixed `835289e` |
| KAFKA2 | Consistency | 0.4.0 → 0.5.0 | message `key` | 0.4.0 is `anyOf` [reference, schema, avroSchema_v1]; 0.5.0 is Schema only. Avro was retired, and Reference and Schema overlap on `$ref`, which broke completion. | By design |
| KAFKA3 | Consistency | — | `apache-kafka/0.6.0/` | The empty folder is a placeholder for the next version. | By design |
| KAFKA4 | Consistency | 0.4.0 vs 0.5.0 | channel `topicConfiguration` | `additionalProperties` is `false` in 0.4.0 and `true` in 0.5.0, so unknown keys like `segment.ms` are rejected in 0.4.0 and accepted in 0.5.0. | Open |
| KAFKA5 | Validation | 0.3.0–0.5.0 | server `schemaRegistryUrl` | There's no `format: uri`, so `"not a url"` passes. | Open |
| KAFKA6 | Consistency | 0.1.0 (channel, server), 0.4.0 (`topicConfiguration`) | | No `x-` extensions are allowed (see A4). | Open |

## apache-pulsar

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| PULSAR1 | Validation | 0.1.0 | channel `ttl` | There's no `minimum`, so `-1` passes. `compaction` and `retention.*` have `minimum: 0`. | Open |
| PULSAR2 | Consistency | 0.1.0 | operation, message, channel `retention` | No `x-` extensions are allowed; channel and server allow them (see A4). | Open |

The root fallback routes both the matching and the non-matching branch to 0.1.0, so an unknown version fails only through the 0.1.0 enum. That's correct, and there's nothing to fix.

## googlepubsub

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| PUBSUB1 | Text | root | all four `*BindingOrReference.json` `title` | It's "**Mercure** - … Binding or Reference" but should be "Google Cloud Pub/Sub - …". It's a copy-paste from mercure. | Open |
| PUBSUB2 | Validation | 0.1.0, 0.2.0 | channel `schemaSettings.encoding` | Any string passes (e.g. `"xml"`). Pub/Sub defines `JSON` and `BINARY`. | Open |
| PUBSUB3 | Validation | 0.1.0 | message `schema.type` | Any string passes. Pub/Sub defines `AVRO` and `PROTOCOL_BUFFER`. | Open |
| PUBSUB4 | Validation | 0.1.0, 0.2.0 | channel `messageRetentionDuration` | The duration format isn't validated (e.g. `"one day"` passes). | Open |
| PUBSUB5 | Validation | 0.1.0, 0.2.0 | channel `labels`, message `attributes` | Plain `object`, so values aren't validated (e.g. `{"label1": 1}`). Pub/Sub expects strings. | Open |
| PUBSUB6 | Consistency | 0.1.0, 0.2.0 | operation, server, channel `messageStoragePolicy`, `schemaSettings`, message `schema` | No `x-` extensions are allowed (see A4). | Open |

## http

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| HTTP1 | Validation | 0.1.0 | `operation.json` `oneOf[1]` | The response branch checks `"properties": {"is": {"const": "response"}}`, but it should check `type`. `is` isn't an allowed property, so the check never applies. As a result, `{"type": "request"}` without `method` passes. | Open |
| HTTP2 | Text | 0.2.0, 0.3.0 | operation `method` description | "When 'type' is 'request'…" is stale, because `type` was removed in 0.2.0. | Open |
| HTTP3 | Validation | 0.1.0–0.3.0 | message `headers`, operation `query` | The descriptions say the schema "MUST be of type 'object'", but that isn't enforced, so `{"type": "string"}` passes. | Open |
| HTTP4 | Validation | 0.3.0 | message `statusCode` | It's `"type": "number"` with no bounds, so `200.5` and `999` pass. RFC 9110 suggests an integer from 100 to 599. | Open |
| HTTP5 | Consistency | 0.1.0–0.3.0 | channel, server | No `x-` extensions are allowed; operation and message allow them (see A4). | Open |

## ibmmq

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| IBMMQ1 | Validation | 0.1.0 | `message.json` `oneOf` | When `type` is missing, all three branches (binary, jms, string) match, so `oneOf` fails. As a result, `{}` and `{"expiry": 10}` are rejected, even though `type` defaults to `string`. | Open |
| IBMMQ2 | Validation | 0.1.0 | `message.json` `oneOf` | When `type` is missing, `headers` matches only the binary branch, so `{"headers": "k=v;"}` passes. With the `string` default it should be rejected, since `headers` isn't allowed for string. | Open |
| IBMMQ3 | Validation | 0.1.0 | `channel.json` `oneOf` | When `destinationType` is missing, `{"queue": {…}}` passes through the queue branch. `destinationType` defaults to `topic`, and the topic branch forbids `queue`. | Open |
| IBMMQ4 | Validation | 0.1.0 | channel `queue`, `topic` | No `additionalProperties`, so unknown keys are accepted (e.g. `queue.maxDepth`). `topic` has no required properties, so `{}` passes. | Open |
| IBMMQ5 | Text | 0.1.0 | `channel.queue.isPartitioned`, `server.cipherSpec`, `server.heartBeatInterval` descriptions | "…can be found on this page in the IBM MQ Knowledge Center" has no link. The other descriptions use `[page](https://…)`. | Open |
| IBMMQ6 | Text | 0.1.0 | `message.expiry` description | "API **dependant**" should be "dependent". | Open |
| IBMMQ7 | Consistency | 0.1.0 | operation | No `x-` extensions are allowed; channel, server and message allow them (see A4). | Open |

## jms

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| JMS1 | Text | 0.0.1 | `server.json` `definitions.property.properties.value` description | It says "The **name** of a property", copied from `name`; it should be "The value of a property". | Open |
| JMS2 | Validation | 0.0.1 | server `definitions.property` | No `additionalProperties`, so unknown keys in a property item are accepted. | Open |
| JMS3 | Validation | 0.0.1 | message `headers` | The description says the schema "MUST be of type 'object'", but that isn't enforced, so `{"type": "string"}` passes. This is the same as HTTP3. | Open |
| JMS4 | Consistency | 0.0.1 | operation | No `x-` extensions are allowed; channel, server and message allow them (see A4). | Open |
| JMS5 | Example | 0.0.1 | `message.json` example, `JMSTimestamp` description | The sentence "The time the message was sent." appears twice. | Open |

## mercure

All four objects define only `bindingVersion`, and the root routing (0.1.0 for every branch) is correct.

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| MERCURE1 | Consistency | 0.1.0 | channel, operation, server, message | No `x-` extensions are allowed anywhere (see A4). This is the same as amqp1. | Open |

## mqtt

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| MQTT1 | Validation | 0.1.0 | operation `qos` | It's `"type": "integer"` without an enum, so `3` and `-1` pass, even though the description says "MUST be either 0, 1, or 2". 0.2.0 uses `enum: [0, 1, 2]`, the same as `lastWill.qos` in both versions. | Open |
| MQTT2 | Validation | 0.1.0, 0.2.0 | server `lastWill` | No `additionalProperties` and no `required`, so `{}` and unknown keys pass. In MQTT a will needs both `topic` and `message`. | Open |
| MQTT3 | Validation | 0.1.0, 0.2.0 | server `keepAlive` | No bounds, so `-1` passes. MQTT keep alive is a 16-bit value (0–65535). | Open |
| MQTT4 | Consistency | 0.2.0 | server `sessionExpiryInterval` | The integer branch has `minimum: 0` but no `maximum`. `maximumPacketSize` and `messageExpiryInterval` cap it at `4294967295`, which is also the MQTT 4-byte limit. | Open |
| MQTT5 | Example | 0.2.0 | `message.json` example #3 | `"responseTopic": {"type": "object", "name": "application/responses"}`: `name` isn't a schema keyword, and a topic is a string, not an object. It passes only because Schema accepts unknown keywords. | Open |
| MQTT6 | Text | 0.2.0 | `server.sessionExpiryInterval`, `message.payloadFormatIndicator` descriptions | Double space after the first sentence ("interval.  The broker", "data.  0 indicates"). | Open |
| MQTT7 | Consistency | 0.1.0 (channel, message), 0.2.0 (channel) | | No `x-` extensions are allowed; operation and server allow them (see A4). | Open |

## mqtt5

Only the 0.2.0 server defines a field (`sessionExpiryInterval`). Everything else defines only `bindingVersion`. The root routing is correct.

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| MQTT5-1 | Consistency | 0.2.0 | `server.json` `patternProperties` | The pattern is `^x-[\\w\\d\\.\\-\\_]+$`; every other binding uses `^x-[\\w\\d\\.\\x2d_]+$`. `\\_` is an invalid escape in Unicode-mode ECMA-262 regexes, so validators that compile with the `u` flag (e.g. Ajv with `unicodeRegExp`) may reject the schema. The jsonschema CLI accepts it, and `x-a_b`, `x-a-b` and `x-a.b` pass. | Open |
| MQTT5-2 | Consistency | 0.2.0 | server `sessionExpiryInterval` | The integer branch has `minimum: 0` but no `maximum`, so `4294967296` passes. This is the same as MQTT4. | Open |
| MQTT5-3 | Text | 0.2.0 | `server.json` `description` | "…representation in **MQTT5 v5.0**" should be "MQTT v5.0". | Open |
| MQTT5-4 | Text | 0.2.0 | `channel.json` `description` | "…in MQTT v5"; every other file says "MQTT v5.0". | Open |
| MQTT5-5 | Consistency | 0.1.0 (all), 0.2.0 (channel, operation, message) | | No `x-` extensions are allowed (see A4). | Open |

## nats

Only operation defines a field (`queue`). The root routing (0.1.0 for every branch) is correct.

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| NATS1 | Validation | 0.1.0 | operation `queue` | There's a `maxLength: 255` but no `minLength`, so `""` passes. | Open |
| NATS2 | Consistency | 0.1.0 | channel, server, message | No `x-` extensions are allowed; operation allows them (see A4). | Open |

## redis

All four objects define only `bindingVersion`, and the root routing (0.1.0 for every branch) is correct.

| # | Category | Version | Where | Concern | Status |
|---|---|---|---|---|---|
| REDIS1 | Consistency | 0.1.0 | channel, operation, server, message | No `x-` extensions are allowed anywhere (see A4). This is the same as amqp1 and mercure. | Open |
