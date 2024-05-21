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

const infoJsonSchema = require('../../../../definitions/3.0.0/infoExtensions.json');
const validator = ajv
  .addMetaSchema(require('../../../../definitions/3.0.0/schema.json'))
  .addSchema(require('../../../../extensions/linkedin/0.1.0/schema.json'))
  .addSchema(require('../../../../extensions/x/0.1.0/schema.json'))
  .compile(infoJsonSchema);

describe('InfoExtensions', () => {
  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'InfoExtensions with empty body is valid');
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'InfoExtensions is valid without required properties');
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'InfoExtensions is valid with only required properties');
  });

  it.skip('extended. Reason: schema doesn\'t check for extensions', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'InfoExtensions can be extended');
  });

  it.skip('wrongly extended. Reason: schema doesn\'t check for extensions', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'InfoExtensions is not valid when was wrongly extended');
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
