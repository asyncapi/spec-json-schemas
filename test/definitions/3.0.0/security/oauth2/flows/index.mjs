import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/oauth2Flows.json');

describe('OAuth2 Flows', () => {
  it('empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    [
      'must have required property \'type\'',
      'must have required property \'flows\''
    ]
  ));

  it('without required properties', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    [
      'must have required property \'type\'',
      'must have required property \'flows\''
    ]
  ));

  it('only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it('extended', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
  ));

  it.skip('wrongly extended', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json'),
  ));
});
