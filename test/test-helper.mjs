import schemesV3_0_0 from '@test/ajv-schemes';

const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const assert = require('assert');
const fs = require('fs');

export default class TestHelper {

  static validator(jsonSchema) {
    const ajv = new Ajv({
      jsonPointers: true,
      allErrors: true,
      schemaId: '$id',
      logger: false,
      validateFormats: true,
      strict: false,
    });
    addFormats(ajv);

    return schemesV3_0_0(ajv).compile(jsonSchema);
  }

  static objectIsValid(jsonSchemaPath, objectFilePath) {
    const validator = this.validator(jsonSchemaPath);
    const model = JSON.parse(fs.readFileSync(objectFilePath, 'utf-8'));

    const validationResult = validator(model);
    assert(validationResult === true, `Object MUST be valid`);
  }

  static objectIsNotValid(jsonSchemaPath, objectFilePath, expectedValidationErrorMessages) {
    const validator = this.validator(jsonSchemaPath);
    const model = JSON.parse(fs.readFileSync(objectFilePath, 'utf-8'));

    const validationResult = validator(model);
    assert(validationResult === false, `Object MUST NOT be valid`);
    for (let [index, expectedValidationErrorMessage] of expectedValidationErrorMessages.entries()) {
      assert(validator.errors[index].message === expectedValidationErrorMessage);
    }
    assert(validator.errors.length === expectedValidationErrorMessages.length);
  }

  static wronglyExtended(jsonSchemaPath, objectFilePath) {
    const validator = this.validator(jsonSchemaPath);
    const model = JSON.parse(fs.readFileSync(objectFilePath, 'utf-8'));

    const validationResult = validator(model);
    assert(validationResult === false, 'Object is not valid when was wrongly extended');
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  }

}