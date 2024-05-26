const Ajv = require('ajv');
const assert = require('assert');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({
  jsonPointers: true,
  allErrors: true,
  schemaId: '$id',
  logger: false,
  validateFormats: true,
  strict: false,
});
addFormats(ajv);

const jsonSchemaName = 'Tag';
const jsonSchema = require('../../../../../definitions/3.0.0/tag.json');
const validator = ajv
  .addMetaSchema(require('../../../../../definitions/3.0.0/schema.json'))
  .addSchema(require('../../../../../definitions/3.0.0/Reference.json'))
  .addSchema(require('../../../../../definitions/3.0.0/ReferenceObject.json'))
  .addSchema(require('../../../../../definitions/3.0.0/externalDocs.json'))
  .addSchema(require('../../../../../definitions/3.0.0/specificationExtension.json'))
  .compile(jsonSchema);

describe(`${jsonSchemaName}`, () => {
  it('example', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, `${jsonSchemaName} example MUST be valid`);
  });

  it('empty', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'Reference with empty body is not valid');
    assert(validator.errors[0].message === 'must have required property \'name\'');
    assert(validator.errors.length === 1);
  });

  it('without required properties', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, 'Reference without required properties is not valid');
    assert(validator.errors[0].message === 'must have required property \'name\'');
    assert(validator.errors.length === 1);
  });

  it('only required properties', () => {
    const model = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, 'Reference is valid with only required properties');
  });

  it.skip('extended. Reason: schema doesn\'t check for extensions', () => {
    const filePath = path.resolve(__dirname, '../../../extended.json');
    const model = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validationResult = validator(model);

    // TODO: Is it ok?
    assert(validationResult === true, 'Reference extensions will not be checked');
  });

  it.skip('wrongly extended. Reason: schema doesn\'t check for extensions', () => {
    const filePath = path.resolve(__dirname, '../../../wrongly extended.json');
    const model = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validationResult = validator(model);

    // TODO: Is it ok?
    assert(validationResult === true, 'Reference extensions will not be checked');
  });
});
