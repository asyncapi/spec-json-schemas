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

const jsonSchemaName = 'Info';
const jsonSchema = require('../../../../../../definitions/3.0.0/info.json');
const validator = ajv
  .addMetaSchema(require('../../../../../../definitions/3.0.0/schema.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/infoExtensions.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/contact.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/license.json'))
  .addSchema(require('../../../../../../examples/3.0.0/ReferenceObject.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/ReferenceObject.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/Reference.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/tag.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/externalDocs.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/specificationExtension.json'))
  .addSchema(require('../../../../../../extensions/linkedin/0.1.0/schema.json'))
  .addSchema(require('../../../../../../extensions/x/0.1.0/schema.json'))
  .compile(jsonSchema);

describe('Info', () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${jsonSchemaName} example MUST be valid`);
  });

  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Info with empty body is not valid');
    assert(validator.errors[0].message === 'must have required property \'version\'');
    assert(validator.errors[1].message === 'must have required property \'title\'');
    assert(validator.errors.length === 2);
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Info is not valid without required properties');
    assert(validator.errors[0].message === 'must have required property \'version\'');
    assert(validator.errors[1].message === 'must have required property \'title\'');
    assert(validator.errors.length === 2);
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'Info is valid with only required properties');
  });

  it('extended', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'Info can be extended');
  });

  it('wrongly extended', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Info is not valid when was wrongly extended');
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
