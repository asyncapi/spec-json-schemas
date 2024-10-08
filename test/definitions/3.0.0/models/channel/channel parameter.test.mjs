import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const jsonSchema = require('@definitions/3.0.0/parameter.json');

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [
    {
      "description": "Id of the user.",
      "default": "0e822ca6-5311-4d4c-b409-993a1820e689",
      "enum": [
        "0e822ca6-5311-4d4c-b409-993a1820e689",
        "381f5ddc-75c6-4c21-9ec1-3919ed345be9",
        "70559d88-31a5-4ef2-8c34-7fbd04057ed5",
        "c6dc0047-a90d-4efa-95e3-a272282934e0"
      ],
      "examples": [
        "0e822ca6-5311-4d4c-b409-993a1820e689",
        "381f5ddc-75c6-4c21-9ec1-3919ed345be9",
        "70559d88-31a5-4ef2-8c34-7fbd04057ed5",
        "c6dc0047-a90d-4efa-95e3-a272282934e0"
      ],
      "location": "$message.payload#/user/id"
    }
  ],
  {},
  {},
  {
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    }
  },
  {
    "x-number": 0,
    "x-string": "",
    "x-object": {
      "property": {}
    },
    "ext-number": 1
  }
);

describe('Channel Parameter', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
