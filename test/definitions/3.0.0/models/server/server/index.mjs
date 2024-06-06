import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/server.json');

describe(`Server`, () => {
  it.skip('example is valid. Reason: errors with bindings, external docs, ...', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it('cannot be empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    [
      'must have required property \'host\'',
      'must have required property \'protocol\''
    ]
  ));

  it.skip('is not valid without required properties. Reason: errors with bindings, external docs, ...', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    [
      'must have required property \'host\'',
      'must have required property \'protocol\''
    ]
  ));

  it('is valid with only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it.skip('extended. Reason: schema doesn\'t check for extensions', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, '../../../extended.json')
  ));

  it.skip('wrongly extended. Reason: schema doesn\'t check for extensions', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, '../../../../wrongly extended.json')
  ));
});
