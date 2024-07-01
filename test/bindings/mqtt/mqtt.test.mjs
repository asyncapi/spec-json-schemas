import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
  '0.2.0'
])('MQTT bindings v%s', async (bindingVersion) => {

  const messageSchema = await import(`@bindings/mqtt/${bindingVersion}/message.json`);
  const operationSchema = await import(`@bindings/mqtt/${bindingVersion}/operation.json`);
  const serverSchema = await import(`@bindings/mqtt/${bindingVersion}/server.json`);

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