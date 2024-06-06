import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/serverVariable.json');

describe('Server Variable', () => {
  it('example is valid', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it('can be empty', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
  ));

  it('is valid without required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
  ));

  it('is valid with only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it('is valid when is extended', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, '../../../../extended.json')
  ));

  it('is not valid when is wrongly extended', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, '../../../../wrongly extended.json')
  ));
});
