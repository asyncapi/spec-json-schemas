import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info: contact', () => {
  it(`${TestHelper.propertyIsNotValidWhenIsTestName} null`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "contact": null
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} empty`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "contact": {}
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} string`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "contact": "short description"
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsValidWhenIsTestName} object`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "contact":  {
        "name": "AsyncAPI",
        "url": "https://www.asyncapi.com",
        "email": "java@asyncapi.com"
      }
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} array`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "contact": [
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
      "contact": 123
    },
    ['must be object']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} boolean`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "contact": false
    },
    ['must be object']
  ));
});
