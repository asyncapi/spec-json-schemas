import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info: license', () => {
  it(`${TestHelper.propertyIsNotValidWhenIsTestName} null`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": null
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} empty`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": {}
    },
    ['must have required property \'name\'']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} string`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": "short description"
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} object`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": {
        "name": "Apache License 2.0",
        "url": "http://www.apache.org/licenses/"
      }
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} array`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": [
        null, [], "", {}, false, 123
      ]
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} number`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": 123
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} boolean`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "license": false
    },
    ['must be object']
  ));
});
