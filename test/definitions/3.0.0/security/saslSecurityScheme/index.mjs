import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';
import path from 'path';

const jsonSchema = require('@definitions/3.0.0/SaslSecurityScheme.json');

describe('SASL Security Scheme', () => {
  it('Plain', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './plain.json'),
  ));

  it('SCRAM-SHA-256', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './scramSha256.json'),
  ));

  it('SCRAM-SHA-512', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './scramSha512.json'),
  ));

  it('GSS-API', () => TestHelper.objectIsValid(
    jsonSchema,
    path.resolve(__dirname, './gssapi.json'),
  ));
});
