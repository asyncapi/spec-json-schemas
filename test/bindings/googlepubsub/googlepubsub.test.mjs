import {it} from 'vitest';
import TestHelper from '@test/test-helper.mjs';
import path from 'path';

describe.each([
  '0.1.0',
  '0.2.0',
])('Google Pub/Sub bindings v%s', async (bindingVersion) => {

  const channelSchema = await import(`@bindings/googlepubsub/${bindingVersion}/channel.json`);
  const messageSchema = await import(`@bindings/googlepubsub/${bindingVersion}/message.json`);

  describe('channel', () => {
    it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
      channelSchema,
      path.resolve(__dirname, `./${bindingVersion}/channel/example.json`),
    ));

    it(TestHelper.cannotBeEmptyTestName, () => {
      const expectedValidationErrorMessages = bindingVersion === '0.1.0'
        ? [
          'must have required property \'schemaSettings\'',
          'must have required property \'topic\''
        ]
        : [
          'must have required property \'schemaSettings\'',
        ]

      TestHelper.objectIsNotValid(
        channelSchema,
        {},
        expectedValidationErrorMessages
      )
    });

    it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => {
      const expectedValidationErrorMessages = bindingVersion === '0.1.0'
        ? [
          'must have required property \'schemaSettings\'',
          'must have required property \'topic\''
        ]
        : [
          'must have required property \'schemaSettings\'',
        ]

      TestHelper.objectIsNotValid(
        channelSchema,
        path.resolve(__dirname, `./${bindingVersion}/channel/without required properties.json`),
        expectedValidationErrorMessages
      )
    });

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
})