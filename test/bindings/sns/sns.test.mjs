import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
])('Pulsar bindings v%s', async (bindingVersion) => {

  const channelSchema = await import(`@bindings/sns/${bindingVersion}/channel.json`);
  const operationSchema = await import(`@bindings/sns/${bindingVersion}/operation.json`);

  describe('channel', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/example.json`),
    ));

    it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
      channelSchema,
      {},
      [
        'must have required property \'name\'',
      ]
    ));

    it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/without required properties.json`),
      [
        'must have required property \'name\'',
      ]
    ));

    it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/only required properties.json`),
    ));

    it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/extended.json`),
    ));

    it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/wrongly extended.json`),
    ));
  })

  describe.skip('operation has wrong example in schema', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/example.json`),
    ));

    it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
      operationSchema,
      {},
      ['must have required property \'consumers\'']
    ));

    it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
      operationSchema,
      path.resolve(__dirname, `./${bindingVersion}/operation/without required properties.json`),
      ['must have required property \'consumers\'']
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