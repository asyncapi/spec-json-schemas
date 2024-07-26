import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'jmsConnectionFactory\'',
  ],
  true,
  []
);

let data = {
  "0.0.1": new JsonSchemaTestSuiteData(
    require(`@bindings/jms/0.0.1/server.json`),
    [
      {
        "jmsConnectionFactory": "org.apache.activemq.ActiveMQConnectionFactory",
        "properties": [
          {
            "name": "disableTimeStampsByDefault",
            "value": false
          }
        ],
        "clientID": "my-application-1"
      }
    ],
    {
      "jmsConnectionFactory": "org.apache.activemq.ActiveMQConnectionFactory"
    },
    {},
    {
      "jmsConnectionFactory": "org.apache.activemq.ActiveMQConnectionFactory",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "jmsConnectionFactory": "org.apache.activemq.ActiveMQConnectionFactory",
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
])('JMS server binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
