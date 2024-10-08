import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/messageObject.json');

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "name": "UserSignup",
      "title": "User signup",
      "summary": "Action to sign a user up.",
      "description": "A longer description",
      "contentType": "application/json",
      "tags": [{ "name": "user" }, { "name": "signup" }, { "name": "register" }],
      "headers": {
        "type": "object",
        "properties": {
          "correlationId": {
            "description": "Correlation ID set by application",
            "type": "string"
          },
          "applicationInstanceId": {
            "description": "Unique identifier for a given instance of the publishing application",
            "type": "string"
          }
        }
      },
      "payload": {
        "type": "object",
        "properties": {
          "user": {
            "$ref": "#/components/schemas/userCreate"
          },
          "signup": {
            "$ref": "#/components/schemas/signup"
          }
        }
      },
      "correlationId": {
        "description": "Default Correlation ID",
        "location": "$message.header#/correlationId"
      },
      "traits": [{ "$ref": "#/components/messageTraits/commonHeaders" }],
      "examples": [
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
);

describe('Channel Message', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
