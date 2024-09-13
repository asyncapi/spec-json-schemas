import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/oauth2Flows.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'type\'',
    'must have required property \'flows\''
  ],
  false, // TODO: enable after schema patch
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "type": "oauth2",
      "description": "oauth2",
      "flows": {
        "authorizationCode": {
          "authorizationUrl": "https://example.com/api/oauth/dialog",
          "tokenUrl": "https://example.com/api/oauth/token",
          "refreshUrl": "https://example.com/api/oauth/refresh",
          "availableScopes": {
            "write:pets": "modify pets in your account",
            "read:pets": "read your pets"
          }
        },
        "clientCredentials": {
          "tokenUrl": "https://example.com/api/oauth/token",
          "refreshUrl": "https://example.com/api/oauth/refresh",
          "availableScopes": {
            "write:pets": "modify pets in your account",
            "read:pets": "read your pets"
          }
        },
        "implicit": {
          "authorizationUrl": "https://example.com/api/oauth/dialog",
          "refreshUrl": "https://example.com/api/oauth/refresh",
          "availableScopes": {
            "write:pets": "modify pets in your account",
            "read:pets": "read your pets"
          }
        },
        "password": {
          "tokenUrl": "https://example.com/api/oauth/token",
          "refreshUrl": "https://example.com/api/oauth/refresh",
          "availableScopes": {
            "write:pets": "modify pets in your account",
            "read:pets": "read your pets"
          }
        }
      },
      "scopes": [ "write:pets", "read:pets" ]
    }
  ],
  {
    "type": "oauth2",
    "flows": {
      "authorizationCode": {
        "authorizationUrl": "https://example.com/api/oauth/dialog",
        "tokenUrl": "https://example.com/api/oauth/token",
        "refreshUrl": "https://example.com/api/oauth/refresh",
        "availableScopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      },
      "clientCredentials": {
        "tokenUrl": "https://example.com/api/oauth/token",
        "refreshUrl": "https://example.com/api/oauth/refresh",
        "availableScopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      },
      "implicit": {
        "authorizationUrl": "https://example.com/api/oauth/dialog",
        "refreshUrl": "https://example.com/api/oauth/refresh",
        "availableScopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      },
      "password": {
        "tokenUrl": "https://example.com/api/oauth/token",
        "refreshUrl": "https://example.com/api/oauth/refresh",
        "availableScopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      }
    }
  },
  {
    "description": "oauth2",
    "scopes": [ "write:pets", "read:pets" ]
  },
  {
    "type": "oauth2",
    "flows":{
      "password": {
        "tokenUrl": "https://example.com/api/oauth/token",
        "refreshUrl": "https://example.com/api/oauth/refresh",
        "availableScopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      }
    },
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "type": "oauth2",
    "flows":{
      "password": {
        "tokenUrl": "https://example.com/api/oauth/token",
        "refreshUrl": "https://example.com/api/oauth/refresh",
        "availableScopes": {
          "write:pets": "modify pets in your account",
          "read:pets": "read your pets"
        }
      }
    },
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('OAuth2 Flows', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
