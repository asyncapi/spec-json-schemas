import {describe, it} from 'vitest';
import TestHelper from '@test/test-helper';

describe('SASL Security Scheme', async (httpSecurity) => {
  const httpSecurityScheme = await import('@definitions/3.0.0/SaslSecurityScheme.json');

  it.each([
    {
      name: 'gssapi',
      json: {
        "type": "gssapi",
        "description": "gssapi"
      }
    },
    {
      name: 'plain',
      json: {
        "type": "plain",
        "description": "plain"
      }
    },
    {
      name: 'scramSha256',
      json: {
        "type": "scramSha256",
        "description": "scramSha256"
      }
    },
    {
      name: 'scramSha512',
      json: {
        "type": "scramSha512",
        "description": "scramSha512"
      }
    }
  ])('oneOf recognize: $name', (httpSecurity) => TestHelper.objectIsValid(
    httpSecurityScheme,
    httpSecurity.json,
  ));
});