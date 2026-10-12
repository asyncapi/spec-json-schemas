import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import TestHelper from '@test/test-helper';
import {describe, it} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

let data = {
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/redis/0.2.0/operation.json`),
    [
      {
        "consumerGroup": "my-service",
        "bindingVersion": "0.2.0"
      }
    ],
    {},
    {
      "consumerGroup": "my-service"
    },
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
])('Redis operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()

  it('is not valid with non-string consumerGroup', () => TestHelper.objectIsNotValid(
    data[bindingVersion].jsonSchema,
    {"consumerGroup": 1},
    ['must be string'],
  ));
})
