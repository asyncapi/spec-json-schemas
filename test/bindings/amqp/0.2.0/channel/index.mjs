import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@bindings/amqp/0.2.0/channel.json');

describe('Channel', () => {
  it('is: routingKey', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './examples/is routing key.json'),
  ));

  it('is: queue', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './examples/is queue.json'),
  ));

  it.skip('empty', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
    ['must have required property \'is\'']
  ));

  it.skip('without required properties', () => TestHelper.objectIsNotValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
    ['must have required property \'is\'']
  ));

  it.skip('only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it('extended', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
  ));

  it('wrongly extended', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json')
  ));
});
