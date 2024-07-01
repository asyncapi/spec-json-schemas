import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
])('Pulsar bindings v%s', async (bindingVersion) => {

  const channelSchema = await import(`@bindings/pulsar/${bindingVersion}/channel.json`);
  const serverSchema = await import(`@bindings/pulsar/${bindingVersion}/server.json`);

  describe('channel', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/example.json`),
    ));

    it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
      channelSchema,
      {},
      [
        'must have required property \'namespace\'',
        'must have required property \'persistence\''
      ]
    ));

    it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/without required properties.json`),
      [
        'must have required property \'namespace\'',
        'must have required property \'persistence\''
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