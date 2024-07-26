import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'namespace\'',
    'must have required property \'persistence\'',
  ],
  true,
  []
);

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/pulsar/0.1.0/channel.json`),
    [
      {
        "namespace": "staging",
        "persistence": "persistent",
        "compaction": 1000,
        "geo-replication": [
          "us-east1",
          "us-west1"
        ],
        "retention": {
          "time": 7,
          "size": 1000
        },
        "ttl": 360,
        "deduplication": false
      }
    ],
    {
      "namespace": "staging",
      "persistence": "persistent"
    },
    {},
    {
      "namespace": "staging",
      "persistence": "persistent",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "namespace": "staging",
      "persistence": "persistent",
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
  '0.1.0',
])('Pulsar channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
