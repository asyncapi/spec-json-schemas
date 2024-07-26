import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

let data = {
  "0.3.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.3.0/channel.json`),
    [
      {
        "topic": "my-specific-topic",
        "partitions": 20,
        "replicas": 3
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.4.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.4.0/channel.json`),
    [
      {
        "topic": "my-specific-topic-name",
        "partitions": 20,
        "replicas": 3,
        "topicConfiguration": {
          "cleanup.policy": [
            "delete",
            "compact"
          ],
          "retention.ms": 604800000,
          "retention.bytes": 1000000000,
          "delete.retention.ms": 86400000,
          "max.message.bytes": 1048588
        }
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.5.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.5.0/channel.json`),
    [
      {
        "topic": "my-specific-topic-name",
        "partitions": 20,
        "replicas": 3,
        "topicConfiguration": {
          "cleanup.policy": [
            "delete",
            "compact"
          ],
          "retention.ms": 604800000,
          "retention.bytes": 1000000000,
          "delete.retention.ms": 86400000,
          "max.message.bytes": 1048588
        }
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
}

describe.each([
  '0.3.0',
  '0.4.0',
  '0.5.0',
])('Kafka channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
