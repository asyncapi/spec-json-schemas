import {describe} from 'vitest';
import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const example = {
  "name": "Apache License 2.0",
  "url": "https://www.apache.org/licenses/"
}

const onlyRequiredProperties = {
  "name": "Apache License 2.0"
}

const withoutRequiredProperties = {
  "url": "https://www.apache.org/licenses/",
  "x-number": 0,
  "x-string": "",
  "x-object": {
    "property": {}
  }
}

const extended = {
  "name": "Apache License 2.0",
  "url": "https://www.apache.org/licenses/",
  "x-number": 0,
  "x-string": "",
  "x-object": {
    "property": {}
  }
}

const wronglyExtended = {
  "name": "Apache License 2.0",
  "url": "https://www.apache.org/licenses/",
  "x-number": 0,
  "x-string": "",
  "x-object": {
    "property": {}
  },
  "ext-number": 1
}

const jsonSchema = require('@definitions/3.0.0/license.json');

const data = new JsonSchemaTestSuiteData(
  jsonSchema,
  [example],
  onlyRequiredProperties,
  withoutRequiredProperties,
  extended,
  wronglyExtended
);

const config = new JsonSchemaTestSuiteConfig(
  true,
  ['must have required property \'name\''],
  false,
  []
);

describe('License', () => {
  new JsonSchemaTestSuite(data, config).testSuite()
});