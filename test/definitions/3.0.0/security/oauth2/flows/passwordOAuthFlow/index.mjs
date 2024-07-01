import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/oauth2Flow.json');

describe('Password Flow', () => {
  it('empty', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
  ));

  it('without required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
  ));

  it('only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it('extended', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
  ));

  it('wrongly extended', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json'),
  ));
});
