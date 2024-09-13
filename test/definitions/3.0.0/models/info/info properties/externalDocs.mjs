import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info: externalDocs', () => {
  it(`${TestHelper.propertyIsNotValidWhenIsTestName} null`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": null
    },
    [
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf'
    ]
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} empty`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": {}
    },
    [
      'must have required property \'$ref\'',
      'must have required property \'url\'',
      'must match exactly one schema in oneOf'
    ]
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} string`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": "short description"
    },
    [
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf'
    ]
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} object`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": {
        "description" : "Find more info here",
        "url" : "https://example.com"
      }
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} array`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": [
        null, [], "", {}, false, 123
      ]
    },
    [
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf'
    ]
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} number`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": 123
    },
    [
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf'
    ]
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} boolean`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "externalDocs": false
    },
    [
      'must be object',
      'must be object',
      'must match exactly one schema in oneOf'
    ]
  ));
});
