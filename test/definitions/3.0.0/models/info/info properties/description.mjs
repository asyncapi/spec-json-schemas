import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info: description', () => {
  it(`${TestHelper.propertyIsNotValidWhenIsTestName} null`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": null
    },
    ['must be string']
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} empty`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": ""
    },
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} string`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": "short description"
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} object`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": {
        "longVariant": "",
        "shortVariant": ""
      }
    },
    ['must be string']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} array`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": [
        null, [], "", {}, false, 123
      ]
    },
    ['must be string']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} number`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": 123
    },
    ['must be string']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} boolean`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "description": false
    },
    ['must be string']
  ));
});
