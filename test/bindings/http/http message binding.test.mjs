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
    require(`@bindings/http/0.1.0/message.json`),
    [
      {
        "headers": {
          "type": "object",
          "properties": {
            "Content-Type": {
              "type": "string",
              "enum": [
                "application/json"
              ]
            }
          }
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
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/http/0.2.0/message.json`),
    [
      {
        "headers": {
          "type": "object",
          "properties": {
            "Content-Type": {
              "type": "string",
              "enum": [
                "application/json"
              ]
            }
          }
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
    require(`@bindings/http/0.3.0/message.json`),
    [
      {
        "headers": {
          "type": "object",
          "properties": {
            "Content-Type": {
              "type": "string",
              "enum": [
                "application/json"
              ]
            }
          }
        },
        "statusCode": 200
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
  )
}

describe.each([
  '0.1.0',
  '0.2.0',
  '0.3.0',
])('HTTP message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config[bindingVersion]).testSuite()
})
