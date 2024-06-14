import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
  '0.2.0',
  '0.3.0',
])('HTTP bindings v%s', async (bindingVersion) => {

  const messageSchema = await import(`@bindings/http/${bindingVersion}/message.json`);
  const operationSchema = await import(`@bindings/http/${bindingVersion}/operation.json`);

  describe('message', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/example.json`),
    ));

    it(TestHelper.canBeEmptyTestName, () => TestHelper.objectIsValid(
      messageSchema,
      {}
    ));

    it(TestHelper.isValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/without required properties.json`),
    ));

    it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/only required properties.json`),
    ));

    it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/extended.json`),
    ));

    it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/wrongly extended.json`),
    ));
  })

  describe('operation', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/example.json`),
    ));

    it(`${bindingVersion === '0.1.0' ? TestHelper.cannotBeEmptyTestName : TestHelper.canBeEmptyTestName}`, () => {
      if (bindingVersion === '0.1.0') {
        TestHelper.objectIsNotValid(
          operationSchema,
          {},
          ['must have required property \'type\'']
        )
      } else {
        TestHelper.objectIsValid(
          operationSchema,
          {},
        )
      }
    })

    it(`${bindingVersion === '0.1.0' ? TestHelper.isNotValidWithoutRequiredPropertiesTestName : TestHelper.isValidWithoutRequiredPropertiesTestName}`, () => {
      if (bindingVersion === '0.1.0') {
        TestHelper.objectIsNotValid(
          operationSchema,
          path.resolve(__dirname, `./${bindingVersion}/operation/without required properties.json`),
          ['must have required property \'type\'']
        )
      } else {
        TestHelper.objectIsValid(
          operationSchema,
          path.resolve(__dirname, `./${bindingVersion}/operation/without required properties.json`),
        )
      }
    })

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