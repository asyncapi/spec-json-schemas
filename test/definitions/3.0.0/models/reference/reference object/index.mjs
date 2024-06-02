import path from 'path';
import TestHelper from '@test/test-helper.js';

const jsonSchema = require('@definitions/3.0.0/Reference.json');

describe('Reference Object', () => {
  it('empty', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
  ));

  it('number', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './number.json'),
    ['must be string']
  ));

  it('object', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './object.json'),
    ['must be string']
  ));

  it('string', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './string.json'),
    ['must match format "uri-reference"']
  ));

  it('boolean', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './boolean.json'),
    ['must be string']
  ));

  it('null', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './null.json'),
    ['must be string']
  ));

  it('array', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './array.json'),
    ['must be string']
  ));

  it('URI', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './uri.json'),
  ));
});
