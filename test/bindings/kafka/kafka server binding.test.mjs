import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import TestHelper from '@test/test-helper';
import {describe, it} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

let data = {
  "0.3.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.3.0/server.json`),
    [
      {
        "schemaRegistryUrl": "https://my-schema-registry.com",
        "schemaRegistryVendor": "confluent"
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
    require(`@bindings/kafka/0.4.0/server.json`),
    [
      {
        "schemaRegistryUrl": "https://my-schema-registry.com",
        "schemaRegistryVendor": "confluent"
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
    require(`@bindings/kafka/0.5.0/server.json`),
    [
      {
        "schemaRegistryUrl": "https://my-schema-registry.com",
        "schemaRegistryVendor": "confluent"
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
  "0.6.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.6.0/server.json`),
    [
      {
        "schemaRegistryUrl": "https://my-schema-registry.com",
        "schemaRegistryVendor": "confluent",
        "bindingVersion": "0.6.0"
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
  '0.6.0',
])('Kafka server binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})

describe('Kafka server binding v0.6.0 bindingVersion', () => {
  const schema = require(`@bindings/kafka/0.6.0/server.json`);

  it('rejects previous bindingVersion values', () => TestHelper.objectIsNotValid(
    schema,
    {
      "bindingVersion": "0.5.0"
    },
    [
      "must be equal to one of the allowed values"
    ]
  ));
})
