import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'name\'',
  ],
  true,
  []
);

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/sns/0.1.0/channel.json`),
    [
      {
        "name": "my-sns-topic",
        "policy": {
          "statements": [
            {
              "effect": "Allow",
              "principal": "*",
              "action": "SNS:Publish"
            }
          ]
        }
      }
    ],
    {
      "name": "my-sns-topic"
    },
    {},
    {
      "name": "my-sns-topic",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "name": "my-sns-topic",
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
])('Amazon SNS channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})
