import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/contact.json');

describe('Contact', () => {
  it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it(TestHelper.canBeEmptyTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
  ));

  it(TestHelper.isValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
  ));

  it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
  ));

  it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json')
  ));
});
