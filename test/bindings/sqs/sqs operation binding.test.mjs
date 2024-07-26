import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'queues\'',
  ],
  true,
  []
);

let data = {
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/sqs/0.2.0/operation.json`),
    [
      {
        "queues": [
          {
            "name": "myQueue",
            "fifoQueue": true,
            "deduplicationScope": "messageGroup",
            "fifoThroughputLimit": "perMessageGroupId",
            "deliveryDelay": 10,
            "redrivePolicy": {
              "deadLetterQueue": {
                "name": "myQueue_error"
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
            }
          },
          {
            "name": "myQueue_error",
            "deliveryDelay": 10
          }
        ]
      }
    ],
    {
      "queues": [
        {
          "name": "myQueue_error",
          "deliveryDelay": 10
        }
      ]
    },
    {},
    {
      "queues": [
        {
          "name": "myQueue_error",
          "deliveryDelay": 10
        }
      ],
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "queues": [
        {
          "name": "myQueue_error",
          "deliveryDelay": 10
        }
      ],
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
])('Amazon SNS operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
