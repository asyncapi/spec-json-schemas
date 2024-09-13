import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

describe('HTTP Security Scheme', async (httpSecurity) => {
  const httpSecurityScheme = await import('@definitions/3.0.0/HTTPSecurityScheme.json');

  it.each([
    {
      name: 'API key',
      json: {
        "type": "httpApiKey",
        "description": "httpApiKey",
        "name": "api_key",
        "in": "header"
      }
    },
    {
      name: 'Basic',
      json: {
        "type": "http",
        "description": "http",
        "scheme": "basic"
      }
    },
    {
      name: 'Bearer',
      json: {
        "type": "http",
        "description": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  ])('oneOf recognize: $name', (httpSecurity) => TestHelper.objectIsValid(
    httpSecurityScheme,
    httpSecurity.json,
  ));
});

describe.each([
  {
    name: 'API Key',
    schema: 'APIKeyHTTPSecurityScheme',
    resources: 'httpApiKey',
    expectedErrors: [
      'must have required property \'type\'',
      'must have required property \'name\'',
      'must have required property \'in\''
    ]
  },
  {
    name: 'Basic',
    schema: 'NonBearerHTTPSecurityScheme',
    resources: 'httpBasic',
    expectedErrors: [
      'must NOT be valid',
      'must have required property \'scheme\'',
      'must have required property \'type\''
    ]
  },
  {
    name: 'Bearer',
    schema: 'BearerHTTPSecurityScheme',
    resources: 'httpBearer',
    expectedErrors: [
      'must have required property \'type\'',
      'must have required property \'scheme\''
    ]
  },
  {
    name: 'Security Scheme',
    schema: 'BearerHTTPSecurityScheme',
    resources: 'httpBearer',
    expectedErrors: [
      'must have required property \'type\'',
      'must have required property \'scheme\''
    ]
  }
])('HTTP security: $name', async (params) => {

  const jsonSchema = await import(`@definitions/3.0.0/${params.schema}.json`);

  it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, `./${params.resources}/example.json`),
  ));

  it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {},
    params.expectedErrors
  ));

  it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, `./${params.resources}/without required properties.json`),
    params.expectedErrors
  ));

  it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, `./${params.resources}/only required properties.json`),
  ));

  it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, `./${params.resources}/extended.json`),
  ));

  it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, `./${params.resources}/wrongly extended.json`),
  ));

})