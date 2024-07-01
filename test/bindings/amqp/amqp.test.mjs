import {it, test} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.2.0',
  '0.3.0'
])('AMQP bindings v%s', async (bindingVersion) => {

  const channelSchema = await import(`@bindings/amqp/${bindingVersion}/channel.json`);
  const messageSchema = await import(`@bindings/amqp/${bindingVersion}/message.json`);
  const operationSchema = await import(`@bindings/amqp/${bindingVersion}/operation.json`);

  describe('channel', () => {
    it('is: routingKey', () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/examples/is routing key.json`),
    ));

    it('is: queue', () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/examples/is queue.json`),
    ));

    it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
      channelSchema,
      {},
      [
        'must have required property \'exchange\'',
        'must have required property \'queue\'',
        'must match exactly one schema in oneOf'
      ]
    ));

    it.todo('without required properties - \'is\' must be required property?', () => TestHelper.objectIsNotValid(
      channelSchema,
      {
        bindingVersion: bindingVersion
      },
      []
    ));

    it.todo('only required properties - \'is\' must be required property?', () => TestHelper.objectIsNotValid(
      channelSchema,
      {
        bindingVersion: bindingVersion
      },
      []
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
})