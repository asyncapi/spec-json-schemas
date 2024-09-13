import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/Reference.json');

describe('Reference Object', () => {
  it('$ref may be empty', () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "$ref": ""
    },
  ));

  it('$ref cannot be number', () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "$ref": 1234
    },
    ['must be string']
  ));

  it('$ref cannot be object', () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "$ref": {
        "$ref": "#/components/schemas/user"
      }
    },
    ['must be string']
  ));

  it('$ref cannot be plain string', () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "$ref": "string value"
    },
    ['must match format "uri-reference"']
  ));

  it('$ref cannot be boolean', () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "$ref": true
    },
    ['must be string']
  ));

  it('$ref cannot be null', () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "$ref": null
    },
    ['must be string']
  ));

  it('$ref cannot be array', () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "$ref": [
        1,
        null,
        false,
        "#/components/schemas/user",
        {
          "$ref": "#/components/schemas/user"
        }
      ]
    },
    ['must be string']
  ));

  it('$ref MUST be URI', () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "$ref": "#/components/schemas/user"
    },
  ));
});
