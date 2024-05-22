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

const jsonSchema = require('../../../../../definitions/3.0.0/SaslSecurityScheme.json');
const validator = ajv
  .addMetaSchema(require('../../../../../definitions/3.0.0/schema.json'))
  .addSchema(require('../../../../../definitions/3.0.0/SaslScramSecurityScheme.json'))
  .addSchema(require('../../../../../definitions/3.0.0/SaslPlainSecurityScheme.json'))
  .addSchema(require('../../../../../definitions/3.0.0/SaslGssapiSecurityScheme.json'))
  .addSchema(require('../../../../../definitions/3.0.0/specificationExtension.json'))
  .compile(jsonSchema);

describe('SASL Security Scheme', () => {
  it('Plain', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/plain.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'Plain is valid');
  });

  it('SCRAM-SHA-256', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/scramSha256.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid');
  });

  it('SCRAM-SHA-512', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/scramSha512.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid');
  });

  it('GSS-API', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/gssapi.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'HTTP API Key is valid');
  });
});
