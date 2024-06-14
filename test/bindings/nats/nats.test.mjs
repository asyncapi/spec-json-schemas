import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
])('NATS bindings v%s', async (bindingVersion) => {

  const operationSchema = await import(`@bindings/nats/${bindingVersion}/operation.json`);

  describe('operation', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/example.json`),
    ));

    it(TestHelper.canBeEmptyTestName, () => TestHelper.objectIsValid(
      operationSchema,
      {}
    ));

    it(TestHelper.isValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/without required properties.json`),
    ));

    it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/only required properties.json`),
    ));

    it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/extended.json`),
    ));

    it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/wrongly extended.json`),
    ));
  })

})