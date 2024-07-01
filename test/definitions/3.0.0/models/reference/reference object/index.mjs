import path from 'path';
import TestHelper from '@test/test-helper';

const jsonSchema = require('@definitions/3.0.0/Reference.json');

describe('Reference Object', () => {
  it('$ref may be empty', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
  ));

  it('$ref cannot be number', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './number.json'),
    ['must be string']
  ));

  it('$ref cannot be object', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './object.json'),
    ['must be string']
  ));

  it('$ref cannot be plain string', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './string.json'),
    ['must match format "uri-reference"']
  ));

  it('$ref cannot be boolean', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './boolean.json'),
    ['must be string']
  ));

  it('$ref cannot be null', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './null.json'),
    ['must be string']
  ));

  it('$ref cannot be array', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './array.json'),
    ['must be string']
  ));

  it('$ref is URI', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './uri.json'),
  ));
});
