import path from 'path';
import TestHelper from '@test/test-helper.js';

const jsonSchema = require('@definitions/3.0.0/Reference.json');

describe('Reference', () => {
  it('example', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it('empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    ['must have required property \'$ref\'']
  ));

  it('without required properties', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    ['must have required property \'$ref\'']
  ));

  it('only required properties', () => () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json.json'),
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
