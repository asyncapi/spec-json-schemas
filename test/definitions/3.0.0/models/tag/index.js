import {describe, test} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/tag.json');

describe('Tag', () => {
  test('example', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  test('empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    ['must have required property \'name\'']
  ));

  test('without required properties', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    ['must have required property \'name\'']
  ));

  test('only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json')
  ));

  test.skip('extended. Reason: schema doesn\'t check for extensions', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, '../../../extended.json')
  ));

  test.skip('wrongly extended. Reason: schema doesn\'t check for extensions', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, '../../../wrongly extended.json')
  ));
});
