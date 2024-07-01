import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/messageExampleObject.json');

describe('Message example', () => {
  it('example', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it('empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    [
      'must have required property \'payload\'',
      'must have required property \'headers\'',
      'must match a schema in anyOf'
    ]
  ));

  it('without required properties', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    [
      'must have required property \'payload\'',
      'must have required property \'headers\'',
      'must match a schema in anyOf'
    ]
  ));

  it('only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it.skip('extended. Reason: schema prohibites extendsion. Check', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
  ));

  it.skip('wrongly extended. Reason: schema prohibites extendsion. Check', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json'),
  ));
});
