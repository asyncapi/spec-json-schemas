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

const infoJsonSchema = require('../../../../../../definitions/3.0.0/license.json');
const validator = ajv
  .addMetaSchema(require('../../../../../../definitions/3.0.0/schema.json'))
  .addSchema(require('../../../../../../definitions/3.0.0/specificationExtension.json'))
  .compile(infoJsonSchema);

describe('License', () => {
  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'License with empty body is not valid');
    assert(validator.errors[0].message === 'must have required property \'name\'');
    assert(validator.errors.length === 1);
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'License without required properties is not valid');
    assert(validator.errors[0].message === 'must have required property \'name\'');
    assert(validator.errors.length === 1);
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'License is valid with only required properties');
  });

  it('extended', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'License can be extended');
  });

  it('wrongly extended', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'License is not valid when was wrongly extended');
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
