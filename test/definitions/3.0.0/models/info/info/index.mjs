import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/info.json');

describe('Info', () => {
  it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
  ));

  it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    [
      'must have required property \'version\'',
      'must have required property \'title\''
    ]
  ));

  it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    [
      'must have required property \'version\'',
      'must have required property \'title\''
    ]
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
