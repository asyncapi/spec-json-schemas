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

const jsonSchemaName = 'Operation Reply';
const jsonSchema = require('@definitions/3.0.0/operationReplyAddress.json');
import schemesV3_0_0 from '@test/ajv-schemes';
const validator = schemesV3_0_0(ajv).compile(jsonSchema);

describe.skip(`${jsonSchemaName}. uri-reference not compatible with #/components/...`, () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    console.log(validator.errors);
    assert(validationResult === true, `${jsonSchemaName} example MUST be valid`);
  });

  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${jsonSchemaName} with empty body is valid`);
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${jsonSchemaName} without required properties is valid`);
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${jsonSchemaName} is valid with only required properties`);
  });

  it('extended. Reason: schema doesn\'t check for extensions', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${jsonSchemaName} can be extended`);
  });

  it('wrongly extended. Reason: schema doesn\'t check for extensions', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, `${jsonSchemaName} is not valid when was wrongly extended`);
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
