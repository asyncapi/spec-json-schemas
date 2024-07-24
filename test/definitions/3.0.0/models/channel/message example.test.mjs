import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/messageExampleObject.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'payload\'',
    'must have required property \'headers\'',
    'must match a schema in anyOf'
  ],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "name": "SimpleSignup",
      "summary": "A simple UserSignup example message",
      "headers": {
        "correlationId": "my-correlation-id",
        "applicationInstanceId": "myInstanceId"
      },
      "payload": {
        "user": {
          "someUserKey": "someUserValue"
        },
        "signup": {
          "someSignupKey": "someSignupValue"
        }
      }
    }
  ],
  {
    "headers": {
      "correlationId": "my-correlation-id",
      "applicationInstanceId": "myInstanceId"
    }
  },
  {},
  {
    "payload": {
      "user": {
        "someUserKey": "someUserValue"
      },
      "signup": {
        "someSignupKey": "someSignupValue"
      }
    },
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "payload": {
      "user": {
        "someUserKey": "someUserValue"
      },
      "signup": {
        "someSignupKey": "someSignupValue"
      }
    },
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Channel Message Example', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
