import {describe, test} from 'vitest';

describe('OAuth2', () => {
  test('Implicit OAuth Flow', require('./flows/implicitOAuthFlow'));
  test('Password OAuth Flow', require('./flows/passwordOAuthFlow'));
  test('OAuth Flows', require('./flows'));
  test('Authorization Code OAuth Flow', require('./flows/authorizationCodeOAuthFlow'));
  test('Client Credentials OAuth Flow', require('./flows/clientCredentialsOAuthFlow'));
});
