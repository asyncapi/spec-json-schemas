import {describe} from 'vitest';

describe('Security Schemes Test Suite', async () => {
  await import('./apiKey');
  await import('./asymmetricEncryption');
  await import('./gssapi');
  await import('./openIdconnect');
  await import('./saslSecurityScheme');
  await import('./plain');
  await import('./scramSha256');
  await import('./scramSha512');
  await import('./symmetricEncryption');
  await import('./userPassword');
  await import('./x509');
  await import('./oauth2');
});
