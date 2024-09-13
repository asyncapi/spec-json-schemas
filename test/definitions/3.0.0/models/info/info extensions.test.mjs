import {describe} from 'vitest';
import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const example = {
  "x-x": "PBodiachevskii",
  "x-linkedin": "https://www.linkedin.com/company/asyncapi/"
}

const onlyRequiredProperties = {}

const withoutRequiredProperties = {}

const extended = {
  "x-number" : 0,
  "x-string" : "",
  "x-object" : {
    "property" : { }
  },
  "x-x": "PBodiachevskii",
  "x-linkedin": "https://www.linkedin.com/company/asyncapi/"
}

const wronglyExtended = {
  "ext-number": 1,
  "x-number": 0,
  "x-string": "",
  "x-object": {
    "property": {}
  },
  "x-x": "PBodiachevskii",
  "x-linkedin": "https://www.linkedin.com/company/asyncapi/"
}

const jsonSchema = require('@definitions/3.0.0/infoExtensions.json');

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  false,
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

describe('Info Extensions', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});
