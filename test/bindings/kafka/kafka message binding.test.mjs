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
}

describe.each([
  '0.1.0',
  '0.3.0',
  '0.4.0',
  '0.5.0',
])('Kafka message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
