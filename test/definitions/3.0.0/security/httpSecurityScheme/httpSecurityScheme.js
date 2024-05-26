const Ajv = require('ajv');
const assert = require('assert');
const addFormats = require('ajv-formats');
const fs = require('fs');

const ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
  schemaId: '$id',
  logger: false,
  validateFormats: true,
  strict: false,
});
addFormats(ajv);

const jsonSchema = require('@definitions/3.0.0/HTTPSecurityScheme.json');
const validator = ajv
  .addMetaSchema(require('@definitions/3.0.0/schema.json'))
  .addSchema(require('@definitions/3.0.0/NonBearerHTTPSecurityScheme.json'))
  .addSchema(require('@definitions/3.0.0/BearerHTTPSecurityScheme.json'))
  .addSchema(require('@definitions/3.0.0/APIKeyHTTPSecurityScheme.json'))
  .addSchema(require('@definitions/3.0.0/specificationExtension.json'))
  .compile(jsonSchema);

describe('HTTP Security Scheme', () => {
  it('HTTP API Key', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/apiKey.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid');
  });

  it('HTTP Basic', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/basic.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid');
  });

  it('HTTP Bearer', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/bearer.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid');
  });
});
