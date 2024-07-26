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
    require(`@bindings/jms/0.0.1/channel.json`),
    [
      {
        "destination": "user-signed-up",
        "destinationType": "fifo-queue"
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
])('JMS channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
