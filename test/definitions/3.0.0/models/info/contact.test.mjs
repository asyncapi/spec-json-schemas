import {describe} from 'vitest';
import {
    JsonSchemaTestSuite,
    JsonSchemaTestSuiteConfig,
    JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';

const example = {
    "name": "AsyncApi",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com"
}

const onlyRequiredProperties = {}

const withoutRequiredProperties = {}

const extended = {
    "name": "AsyncAPI",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com",
    "x-number": 0,
    "x-string": "",
    "x-object": {
        "property": {}
    }
}

const wronglyExtended = {
    "name": "AsyncAPI",
    "url": "https://www.asyncapi.com",
    "email": "java@asyncapi.com",
    "x-number": 0,
    "x-string": "",
    "x-object": {
        "property" : { }
    },
    "ext-number": 1
}

const jsonSchema = require('@definitions/3.0.0/contact.json');

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
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

describe('Contact', () => {
    new JsonSchemaTestSuite(data, config).testSuite()
});