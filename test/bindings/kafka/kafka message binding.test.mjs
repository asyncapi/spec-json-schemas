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
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.1.0/message.json`),
    [
      {
        "key": {
          "type": "string",
          "enum": [
            "myKey"
          ]
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
  "0.3.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.3.0/message.json`),
    [
      {
        "key": {
          "type": "string",
          "enum": [
            "myKey"
          ]
        },
        "schemaIdLocation": "payload",
        "schemaIdPayloadEncoding": "apicurio-new",
        "schemaLookupStrategy": "TopicIdStrategy"
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
    require(`@bindings/kafka/0.4.0/message.json`),
    [
      {
        "key": {
          "type": "string",
          "enum": [
            "myKey"
          ]
        },
        "schemaIdLocation": "payload",
        "schemaIdPayloadEncoding": "apicurio-new",
        "schemaLookupStrategy": "TopicIdStrategy"
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
    require(`@bindings/kafka/0.5.0/message.json`),
    [
      {
        "key": {
          "type": "string",
          "enum": [
            "myKey"
          ]
        },
        "schemaIdLocation": "payload",
        "schemaIdPayloadEncoding": "apicurio-new",
        "schemaLookupStrategy": "TopicIdStrategy"
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
    require(`@bindings/kafka/0.6.0/message.json`),
    [
      {
        "key": {
          "type": "string",
          "enum": [
            "myKey"
          ]
        },
        "schemaIdLocation": "payload",
        "schemaIdPayloadEncoding": "apicurio-new",
        "schemaLookupStrategy": "TopicIdStrategy",
        "bindingVersion": "0.6.0"
      },
      {
        "schemaIdLocation": "payload",
        "schemaLookupStrategy": "TopicNameStrategy",
        "compatibility": "BACKWARD",
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
  '0.1.0',
  '0.3.0',
  '0.4.0',
  '0.5.0',
  '0.6.0',
])('Kafka message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})

describe('Kafka message binding v0.6.0 bindingVersion', () => {
  const schema = require(`@bindings/kafka/0.6.0/message.json`);

  it('rejects previous bindingVersion values', () => TestHelper.objectIsNotValid(
    schema,
    {
      "compatibility": "BACKWARD",
      "bindingVersion": "0.5.0"
    },
    [
      "must be equal to one of the allowed values"
    ]
  ));
})
