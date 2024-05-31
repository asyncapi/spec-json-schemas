import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/server.json');

describe.skip(`Server. Reason: errors with bindings, external docs, ...`, () => {
  it('example', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './example.json'),
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

  it.skip('extended. Reason: schema doesn\'t check for extensions', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, '../../../extended.json')
  ));

  it.skip('wrongly extended. Reason: schema doesn\'t check for extensions', () => TestHelper.wronglyExtended(
    jsonSchema,
    path.resolve(__dirname, '../../../../wrongly extended.json')
  ));
});
