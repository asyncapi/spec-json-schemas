import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'queue\'',
  ],
  true,
  []
);

let data = {
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/sqs/0.2.0/channel.json`),
    [
      {
        "queue": {
          "name": "myQueue",
          "fifoQueue": true,
          "deduplicationScope": "messageGroup",
          "fifoThroughputLimit": "perMessageGroupId",
          "deliveryDelay": 15,
          "visibilityTimeout": 60,
          "receiveMessageWaitTime": 0,
          "messageRetentionPeriod": 86400,
          "redrivePolicy": {
            "deadLetterQueue": {
              "arn": "arn:aws:SQS:eu-west-1:0000000:123456789"
            },
            "maxReceiveCount": 15
          },
          "policy": {
            "statements": [
              {
                "effect": "Deny",
                "principal": "arn:aws:iam::123456789012:user/dec.kolakowski",
                "action": [
                  "sqs:SendMessage",
                  "sqs:ReceiveMessage"
                ]
              }
            ]
          },
          "tags": {
            "owner": "AsyncAPI.NET",
            "platform": "AsyncAPIOrg"
          }
        },
        "deadLetterQueue": {
          "name": "myQueue_error",
          "fifoQueue": false,
          "deliveryDelay": 0,
          "visibilityTimeout": 0,
          "receiveMessageWaitTime": 0,
          "messageRetentionPeriod": 604800
        }
      }
    ],
    {
      "queue": {
        "name": "myQueue",
        "fifoQueue": true
      }
    },
    {},
    {
      "queue": {
        "name": "myQueue",
        "fifoQueue": true
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "queue": {
        "name": "myQueue",
        "fifoQueue": true
      },
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
])('Amazon SQS channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
