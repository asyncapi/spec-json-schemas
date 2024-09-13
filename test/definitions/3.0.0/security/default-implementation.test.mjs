import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

describe.each([
  {
    name: 'X509',
    type: 'X509',
    description: 'X509 example',
    schema: 'X509',
  },
  {
    name: 'userPassword',
    type: 'userPassword',
    description: 'userPassword example',
    schema: 'userPassword',
  },
  {
    name: 'symmetricEncryption',
    type: 'symmetricEncryption',
    description: 'symmetricEncryption example',
    schema: 'symmetricEncryption',
  },
  {
    name: 'asymmetricEncryption',
    type: 'asymmetricEncryption',
    description: 'asymmetricEncryption example',
    schema: 'asymmetricEncryption',
  },
  {
    name: 'SASL: plain',
    type: 'plain',
    description: 'SASL plain example',
    schema: 'SaslPlainSecurityScheme',
  },
  {
    name: 'SASL: GSS-API',
    type: 'gssapi',
    description: 'SASL GSS-API example',
    schema: 'SaslGssapiSecurityScheme',
  },
  {
    name: 'SASL: SCRAM-SHA-256',
    type: 'scramSha256',
    description: 'SASL SCRAM-SHA-256 example',
    schema: 'SaslScramSecurityScheme',
  },
  {
    name: 'SASL: SCRAM-SHA-512',
    type: 'scramSha512',
    description: 'SASL SCRAM-SHA-512 example',
    schema: 'SaslScramSecurityScheme',
  },
])('$name', async (params) => {

  const jsonSchema = await import(`@definitions/3.0.0/${params.schema}.json`);

  it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": params.type,
      "description": params.description,
    },
  ));

  it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {},
    [
      'must have required property \'type\''
    ]
  ));

  it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "description": params.description,
    },
    [
      'must have required property \'type\''
    ]
  ));

  it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": params.type,
    },
  ));

  it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "type": params.type,
      "description": params.description,
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
      "type": params.type,
      "description": params.description,
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    },
  ));

})