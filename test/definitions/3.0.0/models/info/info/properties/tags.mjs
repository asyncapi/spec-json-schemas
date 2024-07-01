import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info: tags', () => {
  it(`${TestHelper.propertyIsNotValidWhenIsTestName} null`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": null
    },
    ['must be array']
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} empty`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": []
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} string`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": "short description"
    },
    ['must be array']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} object`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags":  {}
    },
    ['must be array']
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} array of tags`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": [
        {
          "$ref": "#/components/tags"
        },
        {
          "name": "user",
          "description": "User-related messages",
        }
      ]
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} array of duplicated tags`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": [
        {
          "$ref": "#/components/tags"
        },
        {
          "$ref": "#/components/tags"
        },
        {
          "name": "user",
          "description": "User-related messages",
        }
      ]
    },
    ['must NOT have duplicate items (items ## 0 and 1 are identical)']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} not array of tags`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": [
        null, [], "", {}, false, 123
      ]
    },
    // 6 properties to check
    [
      // null
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf',
      // []
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf',
      // ""
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf',
      // {}
      'must have required property \'$ref\'',
      'must have required property \'name\'',
      'must match exactly one schema in oneOf',
      // false
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf',
      // 123
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf',
    ]
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} number`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": 123
    },
    ['must be array']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} boolean`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "tags": false
    },
    ['must be array']
  ));
});
