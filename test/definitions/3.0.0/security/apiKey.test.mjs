import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/apiKey.json');

describe('API Key', () => {
  it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": "apiKey",
      "description": "apiKey",
      "in": "user"
    },
  ));

  it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {},
    [
      'must have required property \'type\'',
      'must have required property \'in\''
    ]
  ));

  it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "description": "apiKey"
    },
    [
      'must have required property \'type\'',
      'must have required property \'in\''
    ]
  ));

  it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": "apiKey",
      "in": "user"
    },
  ));

  it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": "apiKey",
      "description": "apiKey",
      "in": "user",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
  ));

  it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
    jsonSchema,
    {
      "type": "apiKey",
      "description": "apiKey",
      "in": "user",
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ));
});
