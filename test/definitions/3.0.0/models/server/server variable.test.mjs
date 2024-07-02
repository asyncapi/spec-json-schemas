import {describe} from 'vitest';
import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const jsonSchema = require('@definitions/3.0.0/serverVariable.json');

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
      "enum": [
        "8883",
        "8884"
      ],
      "default": "8883",
      "description": "To which port connect",
      "examples": [
        "8883",
        "8884"
      ]
    }
  ],
  {},
  {
    "enum": [
      "8883",
      "8884"
    ],
    "default": "8883",
    "description": "To which port connect",
    "examples": [
      "8883",
      "8884"
    ]
  },
  {
    "enum": [
      "8883",
      "8884"
    ],
    "default": "8883",
    "description": "To which port connect",
    "examples": [
      "8883",
      "8884"
    ],
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

describe('Server Variable', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});