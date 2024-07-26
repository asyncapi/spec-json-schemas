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
    require(`@bindings/mqtt/0.1.0/server.json`),
    [
      {
        "clientId": "guest",
        "cleanSession": true,
        "lastWill": {
          "topic": "/last-wills",
          "qos": 2,
          "message": "Guest gone offline.",
          "retain": false
        },
        "keepAlive": 60
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
    require(`@bindings/mqtt/0.2.0/server.json`),
    [
      {
        "clientId": "guest",
        "cleanSession": true,
        "lastWill": {
          "topic": "/last-wills",
          "qos": 2,
          "message": "Guest gone offline.",
          "retain": false
        },
        "keepAlive": 60,
        "sessionExpiryInterval": 120,
        "maximumPacketSize": 1024
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
])('MQTT server binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
