import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'consumers\'',
  ],
  true,
  []
);

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/sns/0.1.0/operation.json`),
    [
      {
        "topic": {
          "name": "someTopic"
        },
        "consumers": [
          {
            "protocol": "sqs",
            "endpoint": {
              "name": "someQueue"
            },
            "filterPolicyScope": "MessageAttributes",
            "rawMessageDelivery": false,
            "redrivePolicy": {
              "deadLetterQueue": {
                "arn": "arn:aws:SQS:eu-west-1:0000000:123456789"
              },
              "maxReceiveCount": 25
            },
            "deliveryPolicy": {
              "minDelayTarget": 10,
              "maxDelayTarget": 100,
              "numRetries": 5,
              "numNoDelayRetries": 2,
              "numMinDelayRetries": 3,
              "numMaxDelayRetries": 5,
              "backoffFunction": "linear",
              "maxReceivesPerSecond": 2
            }
          }
        ]
      }
    ],
    {
      "consumers": [
        {
          "protocol": "sqs",
          "endpoint": {
            "name": "someQueue"
          },
          "filterPolicyScope": "MessageAttributes",
          "rawMessageDelivery": false,
        }
      ]
    },
    {},
    {
      "consumers": [
        {
          "protocol": "sqs",
          "endpoint": {
            "name": "someQueue"
          },
          "filterPolicyScope": "MessageAttributes",
          "rawMessageDelivery": false,
        }
      ],
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "consumers": [
        {
          "protocol": "sqs",
          "endpoint": {
            "name": "someQueue"
          },
          "filterPolicyScope": "MessageAttributes",
          "rawMessageDelivery": false,
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
  '0.1.0',
])('Amazon SNS operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
