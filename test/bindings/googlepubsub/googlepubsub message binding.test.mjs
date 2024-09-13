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
    require(`@bindings/googlepubsub/0.1.0/message.json`),
    [
      {
        "schema": {
          "name": "projects/your-project/schemas/message-avro",
          "type": "avro"
        },
        "bindingVersion": "0.1.0"
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
    require(`@bindings/googlepubsub/0.2.0/message.json`),
    [
      {
        "schema": {
          "name": "projects/your-project/schemas/message-avro"
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
  '0.2.0',
])('Google Pub/Sub message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config[bindingVersion]).testSuite()
})
