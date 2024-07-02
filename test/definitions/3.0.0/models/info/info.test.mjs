import {describe} from 'vitest';
import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const example = {
  "title": "AsyncAPI sample",
  "version": "2.0",
  "description": "short description",
  "termsOfService": "https://www.asyncapi.com/about/",
  "contact": {
    "name": "AsyncApi",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com"
  },
  "license": {
    "name": "Apache License 2.0",
    "url": "https://www.apache.org/licenses/"
  },
  "tags": [
    {
      "name": "user",
      "description": "User-related messages",
      "externalDocs": {
        "description" : "Find more info here",
        "url" : "https://example.com"
      }
    }
  ],
  "externalDocs": {
    "description": "Find more info here",
    "url": "https://example.com"
  }
}

const onlyRequiredProperties = {
  "title": "AsyncApi sample",
  "version": "1.2.34"
}

const withoutRequiredProperties = {
  "description": "Short description",
  "termsOfService": "https://www.asyncapi.com/about/",
  "contact": {
    "name": "AsyncApi",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com"
  },
  "license": {
    "name": "Apache License 2.0",
    "url": "https://www.apache.org/licenses/"
  },
  "tags": [
    {
      "name": "user",
      "description": "User-related messages",
      "externalDocs": {
        "description": "Find more info here",
        "url": "https://example.com"
      }
    }
  ],
  "externalDocs": {
    "description": "Find more info here",
    "url": "https://example.com"
  }
}

const extended = {
  "title": "AsyncApi sample",
  "version": "1.2.34",
  "description": "Short description",
  "termsOfService": "https://www.asyncapi.com/about/",
  "contact": {
    "name": "AsyncApi",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com"
  },
  "license": {
    "name": "Apache License 2.0",
    "url": "https://www.apache.org/licenses/"
  },
  "tags": [
    {
      "name": "user",
      "description": "User-related messages",
      "externalDocs": {
        "description": "Find more info here",
        "url": "https://example.com"
      }
    }
  ],
  "externalDocs": {
    "description": "Find more info here",
    "url": "https://example.com"
  },
  "x-number": 0,
  "x-string": "",
  "x-object": {
    "property": {}
  },
  "x-x": "PBodiachevskii",
  "x-linkedin": "https://www.linkedin.com/company/asyncapi/"
}

const wronglyExtended = {
  "title": "AsyncApi sample",
  "version": "1.2.34",
  "description": "Short description",
  "termsOfService": "https://www.asyncapi.com/about/",
  "contact": {
    "name": "AsyncApi",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com"
  },
  "license": {
    "name": "Apache License 2.0",
    "url": "https://www.apache.org/licenses/"
  },
  "tags": [
    {
      "name": "user",
      "description": "User-related messages",
      "externalDocs": {
        "description": "Find more info here",
        "url": "https://example.com"
      }
    }
  ],
  "externalDocs": {
    "description": "Find more info here",
    "url": "https://example.com"
  },
  "ext-number": 1,
  "x-number": 0,
  "x-string": "",
  "x-object": {
    "property": {}
  },
  "x-x": "PBodiachevskii",
  "x-linkedin": "https://www.linkedin.com/company/asyncapi/"
}

const jsonSchema = require('@definitions/3.0.0/info.json');

const config = new JsonSchemaTestSuiteConfig(
  true,
  [
    'must have required property \'version\'',
    'must have required property \'title\''
  ],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [example],
  onlyRequiredProperties,
  withoutRequiredProperties,
  extended,
  wronglyExtended
);

describe('Info', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});

describe('Info Properties', async () => {
  await import('@test/definitions/3.0.0/models/info/info properties/description.mjs');
  await import('@test/definitions/3.0.0/models/info/info properties/termsOfService.mjs');
  await import('@test/definitions/3.0.0/models/info/info properties/contact.mjs');
  await import('@test/definitions/3.0.0/models/info/info properties/license.mjs');
  await import('@test/definitions/3.0.0/models/info/info properties/tags.mjs');
  await import('@test/definitions/3.0.0/models/info/info properties/externalDocs.mjs');
});
