import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info: termsOfService', () => {
  it(`${TestHelper.propertyIsValidWhenIsTestName} URI`, () => TestHelper.objectIsValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "termsOfService": "https://stage.lo/terms-of-service"
    },
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} null`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "termsOfService": null
    },
    ['must be string']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} empty`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "termsOfService": ""
    },
    ['must match format "uri"']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} string`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "termsOfService": "terms of service"
    },
    ['must match format "uri"']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} object`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "termsOfService": {
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
      "termsOfService": [
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
      "termsOfService": 123
    },
    ['must be string']
  ));

  it(`${TestHelper.propertyIsNotValidWhenIsTestName} boolean`, () => TestHelper.objectIsNotValid(
    jsonSchema,
    {
      "title": "AsyncApi sample",
      "version": "2.0",
      "termsOfService": false
    },
    ['must be string']
  ));
});
