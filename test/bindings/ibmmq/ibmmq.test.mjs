import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
])('IBM MQ bindings v%s', async (bindingVersion) => {

  const channelSchema = await import(`@bindings/ibmmq/${bindingVersion}/channel.json`);
  const messageSchema = await import(`@bindings/ibmmq/${bindingVersion}/message.json`);
  const serverSchema = await import(`@bindings/ibmmq/${bindingVersion}/server.json`);

  describe('channel', () => {
    it('queue destination', () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/examples/queue destination.json`),
    ));

    it('topic destination', () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/examples/topic destination.json`),
    ));

    it(TestHelper.canBeEmptyTestName, () => TestHelper.objectIsValid(
      channelSchema,
      {},
    ));

    it(TestHelper.isValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/without required properties.json`),
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

  describe('message', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/example.json`),
    ));

    it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
      messageSchema,
      {},
      ['must match exactly one schema in oneOf']
    ));

    it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
      messageSchema,
      path.resolve(__dirname, `./${bindingVersion}/message/without required properties.json`),
      ['must match exactly one schema in oneOf']
    ));

    it.todo('\'type\' must be required?', () => TestHelper.objectIsValid(
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