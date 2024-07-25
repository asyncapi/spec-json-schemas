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
  "0.0.1": new JsonSchemaTestSuiteData(
    require(`@bindings/anypointmq/0.0.1/message.json`),
    [
      {
        "headers": {
          "type": "object",
          "properties": {
            "correlationId": {
              "description": "Correlation ID set by application",
              "type": "string"
            }
          }
        },
        "bindingVersion": "0.0.1"
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
  '0.0.1',
])('Anypoint MQ message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
