import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = {
  "0.1.0": new JsonSchemaTestSuiteConfig(
    true,
    [
      'must have required property \'type\''
    ],
    true,
    []
  ),
  "0.2.0": new JsonSchemaTestSuiteConfig(
    false,
    [],
    true,
    []
  ),
  "0.3.0": new JsonSchemaTestSuiteConfig(
    false,
    [],
    true,
    []
  )
}

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/http/0.1.0/operation.json`),
    [
      {
        "type": "request",
        "method": "GET",
        "query": {
          "type": "object",
          "required": [
            "companyId"
          ],
          "properties": {
            "companyId": {
              "type": "number",
              "minimum": 1,
              "description": "The Id of the company."
            }
          },
          "additionalProperties": false
        }
      }
    ],
    {
      "type": "request",
    },
    {},
    {
      "type": "request",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "type": "request",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/http/0.2.0/operation.json`),
    [
      {
        "method": "GET",
        "query": {
          "type": "object",
          "required": [
            "companyId"
          ],
          "properties": {
            "companyId": {
              "type": "number",
              "minimum": 1,
              "description": "The Id of the company."
            }
          },
          "additionalProperties": false
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
    require(`@bindings/http/0.3.0/operation.json`),
    [
      {
        "method": "GET",
        "query": {
          "type": "object",
          "required": [
            "companyId"
          ],
          "properties": {
            "companyId": {
              "type": "number",
              "minimum": 1,
              "description": "The Id of the company."
            }
          },
          "additionalProperties": false
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
  )
}

describe.each([
  '0.1.0',
  '0.2.0',
  '0.3.0',
])('HTTP message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config[bindingVersion]).testSuite()
})
