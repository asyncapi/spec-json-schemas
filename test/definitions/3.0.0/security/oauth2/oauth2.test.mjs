import {describe} from 'vitest';

describe('OAuth2 Test Suite', async () => {
  await import('./flows');
  await import('./flows/implicitOAuthFlow');
  await import('./flows/passwordOAuthFlow');
  await import('./flows/authorizationCodeOAuthFlow');
  await import('./flows/clientCredentialsOAuthFlow');
});
