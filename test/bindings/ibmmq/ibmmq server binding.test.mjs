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
    require(`@bindings/ibmmq/0.1.0/server.json`),
    [
      {
        "groupId": "PRODCLSTR1",
        "ccdtQueueManagerName": "*",
        "multiEndpointServer": false,
        "heartBeatInterval": 300,
        "cipherSpec": "ANY_TLS12_OR_HIGHER"
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
])('IBM MQ server binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
