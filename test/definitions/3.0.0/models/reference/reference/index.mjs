import path from 'path';
import TestHelper from '@test/test-helper';

const jsonSchema = require('@definitions/3.0.0/Reference.json');

describe('Reference', () => {
  it('example is valid', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it('can\'t be empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    ['must have required property \'$ref\'']
  ));

  it('is not valid without required properties', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    ['must have required property \'$ref\'']
  ));

  it('is valid with only required properties', () => () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json.json'),
  ));

  it.skip('cannot be extended with valid extension names. add "additionalProperties": false', () => TestHelper.cantBeExtended(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
    [
      'x-number',
      'x-string',
      'x-object'
    ]
  ));

  it.skip('cannot be extended without valid extension names. add "additionalProperties": false', () => TestHelper.cantBeExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json'),
    [
      'x-number',
      'x-string',
      'x-object',
      'ext-number'
    ]
  ));
});
