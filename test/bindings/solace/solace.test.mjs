import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.2.0',
  '0.3.0',
  '0.4.0',
])('Solace bindings v%s', async (bindingVersion) => {

  const operationSchema = await import(`@bindings/solace/${bindingVersion}/operation.json`);
  const serverSchema = await import(`@bindings/solace/${bindingVersion}/server.json`);

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

    it.todo('Can be extended or not?', () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/extended.json`),
    ));

    it.todo('Can be extended or not?', () => TestHelper.wronglyExtended(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/wrongly extended.json`),
    ));
  })

  describe('server', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      serverSchema,
      path.resolve(__dirname, `./${bindingVersion}/server/example.json`),
    ));

    it(TestHelper.canBeEmptyTestName, () => TestHelper.objectIsValid(
      serverSchema,
      {}
    ));

    it(TestHelper.isValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      serverSchema,
      path.resolve(__dirname, `./${bindingVersion}/server/without required properties.json`),
    ));

    it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      serverSchema,
      path.resolve(__dirname, `./${bindingVersion}/server/only required properties.json`),
    ));

    it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
      serverSchema,
      path.resolve(__dirname, `./${bindingVersion}/server/extended.json`),
    ));

    it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
      serverSchema,
      path.resolve(__dirname, `./${bindingVersion}/server/wrongly extended.json`),
    ));
  })

})