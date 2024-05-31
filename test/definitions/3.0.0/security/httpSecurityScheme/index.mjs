import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/HTTPSecurityScheme.json');

describe('HTTP Security Scheme', () => {
  it('HTTP API Key', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './apiKey.json'),
  ));

  it('HTTP Basic', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './basic.json'),
  ));

  it('HTTP Bearer', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './bearer.json'),
  ));
});
