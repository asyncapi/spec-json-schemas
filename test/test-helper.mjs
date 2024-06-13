import schemesV3_0_0 from '@test/ajv-schemes';

const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const assert = require('assert');
const fs = require('fs');

export default class TestHelper {

  static get exampleIsValidTestName() {
    return 'example is valid';
  }

  static get canBeEmptyTestName() {
    return 'can be empty';
  }

  static get cannotBeEmptyTestName() {
    return 'cannot be empty';
  }

  static get isValidWithoutRequiredPropertiesTestName() {
    return 'is valid without required properties';
  }

  static get isNotValidWithoutRequiredPropertiesTestName() {
    return 'is not valid without required properties';
  }

  static get isValidWithOnlyRequiredPropertiesTestName() {
    return 'is valid with only required properties';
  }

  static get isValidWhenIsExtendedTestName() {
    return 'is valid when is extended';
  }

  static get isNotValidWhenIsWronglyExtendedTestName() {
    return 'is not valid when is wrongly extended';
  }

  static get propertyIsValidWhenIsTestName() {
    return 'property is valid when is';
  }

  static get propertyIsNotValidWhenIsTestName() {
    return 'property is not valid when is';
  }

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

  /**
   * Expects that given json is valid against given Json Schema.
   *
   * @param jsonSchemaPath is a path to required Json Schema
   * @param json is a path to Json file or is as raw Json
   */
  static objectIsValid(jsonSchemaPath, json) {
    const validator = this.validator(jsonSchemaPath);
    const model = (typeof json === 'string')
      ? JSON.parse(fs.readFileSync(json, 'utf-8'))
      : json
    ;

    const validationResult = validator(model);
    assert(validationResult === true, `Object MUST be valid`);
  }

  /**
   * Expects that given json is not valid against given Json Schema.
   *
   * @param jsonSchemaPath is a path to required Json Schema
   * @param json is a path to Json file or is as raw Json
   * @param expectedValidationErrorMessages list of expected error messages
   */
  static objectIsNotValid(jsonSchemaPath, json, expectedValidationErrorMessages) {
    const validator = this.validator(jsonSchemaPath);
    const model = (typeof json === 'string')
      ? JSON.parse(fs.readFileSync(json, 'utf-8'))
      : json
    ;

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

  static cantBeExtended(jsonSchemaPath, objectFilePath, unexpectedProperties) {
    const validator = this.validator(jsonSchemaPath);
    const model = JSON.parse(fs.readFileSync(objectFilePath, 'utf-8'));

    const validationResult = validator(model);
    assert(validationResult === false, `Object can't be extended`);
    for (let [index, unexpectedProperty] of unexpectedProperties.entries()) {
      assert(validator.errors[index].params.additionalProperty === unexpectedProperty);
    }
    assert(validator.errors.length === unexpectedProperties.length);
  }
}