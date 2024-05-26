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

const infoJsonSchema = require('../../../../../definitions/3.0.0/Reference.json');
const validator = ajv
  .addMetaSchema(require('../../../../../definitions/3.0.0/schema.json'))
  .addMetaSchema(require('../../../../../definitions/3.0.0/ReferenceObject.json'))
  .compile(infoJsonSchema);

describe('ReferenceObject', () => {
  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'Reference with empty $ref is valid');
  });

  it('number', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/number.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference as number is not valid');
    assert(validator.errors[0].message === 'must be string');
    assert(validator.errors.length === 1);
  });

  it('object', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/object.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference as object is not valid');
    assert(validator.errors[0].message === 'must be string');
    assert(validator.errors.length === 1);
  });

  it('string', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/string.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference as non URI is not valid');
    assert(validator.errors[0].message === 'must match format "uri-reference"');
    assert(validator.errors.length === 1);
  });

  it('boolean', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/boolean.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference as boolean is not valid');
    assert(validator.errors[0].message === 'must be string');
    assert(validator.errors.length === 1);
  });

  it('null', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/null.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference as null is not valid');
    assert(validator.errors[0].message === 'must be string');
    assert(validator.errors.length === 1);
  });

  it('array', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/array.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference as array is not valid');
    assert(validator.errors[0].message === 'must be string');
    assert(validator.errors.length === 1);
  });

  it('URI', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/uri.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, 'Reference in URI format is valid');
  });
});
