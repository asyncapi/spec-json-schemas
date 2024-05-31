import {describe, test} from 'vitest';

describe('Security Schemes', () => {
  test('API Key', require('./apiKey'));
  test('Asymmetric Encryption', require('./asymmetricEncryption'));
  test('GSS-API', require('./gssapi'));
  test('OpenID Connect', require('./openIdconnect'));
  test('SASL Security Scheme', require('./saslSecurityScheme'));
  test('Plain', require('./plain'));
  test('SCRAM-SHA-256', require('./scramSha256'));
  test('SCRAM-SHA-512', require('./scramSha512'));
  test('Symmetric Encryption', require('./symmetricEncryption'));
  test('user Password', require('./userPassword'));
  test('x509', require('./x509'));
  test('HTTP Security Scheme', require('./httpSecurityScheme'));
  test('HTTP API Key', require('./httpApiKey'));
  test('HTTP Bearer', require('./httpBearer'));
  test('HTTP Basic', require('./httpBasic'));
  test('OAuth2', require('./oauth2'));
});
