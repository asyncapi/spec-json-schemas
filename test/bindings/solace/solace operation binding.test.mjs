import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  false, // TODO: enable after schema patch
  []
);

let data = {
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/solace/0.2.0/operation.json`),
    [
      {
        "destinations": [
          {
            "destinationType": "queue",
            "queue": {
              "name": "CreatedHREvents",
              "topicSubscriptions": [
                "person/*/created"
              ],
              "accessType": "exclusive"
            }
          },
          {
            "destinationType": "topic",
            "topicSubscriptions": [
              "person/*/updated"
            ]
          }
        ]
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
    require(`@bindings/solace/0.3.0/operation.json`),
    [
      {
        "destinations": [
          {
            "destinationType": "queue",
            "queue": {
              "name": "CreatedHREvents",
              "topicSubscriptions": [
                "person/*/created"
              ],
              "accessType": "exclusive",
              "maxMsgSpoolSize": "1,500",
              "maxTtl": "60"
            }
          },
          {
            "destinationType": "topic",
            "topicSubscriptions": [
              "person/*/updated"
            ]
          }
        ]
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
    require(`@bindings/solace/0.4.0/operation.json`),
    [
      {
        "destinations": [
          {
            "destinationType": "queue",
            "queue": {
              "name": "sampleQueue",
              "topicSubscriptions": [
                "samples/*"
              ],
              "accessType": "nonexclusive"
            }
          },
          {
            "destinationType": "topic",
            "topicSubscriptions": [
              "samples/*"
            ]
          }
        ]
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
  '0.2.0',
  '0.3.0',
  '0.4.0',
])('Solace operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
