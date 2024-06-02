import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@bindings/ibmmq/0.1.0/channel.json');

describe('Channel', () => {
  it('queue destination', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './examples/queue destination.json'),
  ));

  it('topic destination', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './examples/topic destination.json'),
  ));

  it('empty', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './empty.json'),
  ));

  it('without required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './without required properties.json'),
  ));

  it('only required properties', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './only required properties.json'),
  ));

  it('extended', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './extended.json'),
  ));

  it('wrongly extended', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, './wrongly extended.json'),
  ));
});
