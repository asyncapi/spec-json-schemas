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
    require(`@bindings/kafka/0.1.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
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
    require(`@bindings/kafka/0.3.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
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
  "0.4.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.4.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
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
  "0.5.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.5.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
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
}

describe.each([
  '0.1.0',
  '0.3.0',
  '0.4.0',
  '0.5.0',
])('Kafka operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
