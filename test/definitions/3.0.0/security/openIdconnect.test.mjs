import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/openIdConnect.json');

describe('OpenID Connect', () => {
  it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": "openIdConnect",
      "description": "openIdConnect",
      "openIdConnectUrl": "https://server.com/.well-known/openid-configuration",
      "scopes": [
        "write:pets",
        "read:pets"
      ]
    },
  ));

  it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {},
    [
      'must have required property \'type\'',
      'must have required property \'openIdConnectUrl\''
    ]
  ));

  it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "description": "openIdConnect"
    },
    [
      'must have required property \'type\'',
      'must have required property \'openIdConnectUrl\''
    ]
  ));

  it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": "openIdConnect",
      "openIdConnectUrl": "https://server.com/.well-known/openid-configuration"
    },
  ));

  it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": "openIdConnect",
      "description": "openIdConnect",
      "openIdConnectUrl": "https://server.com/.well-known/openid-configuration",
      "scopes": [
        "write:pets",
        "read:pets"
      ],
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
      "type": "openIdConnect",
      "description": "openIdConnect",
      "openIdConnectUrl": "https://server.com/.well-known/openid-configuration",
      "scopes": [
        "write:pets",
        "read:pets"
      ],
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    },
  ));
});
