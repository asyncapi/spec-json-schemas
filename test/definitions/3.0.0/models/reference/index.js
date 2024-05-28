import TestHelper from '@test/test-helper';

const fs = require('fs');
const assert = require('assert');
const title = 'Reference';
const validator = TestHelper.validator(require('@definitions/3.0.0/Reference.json'));

describe('Reference', () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} example MUST be valid`);
  });

  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference with empty body is not valid');
    assert(validator.errors[0].message === 'must have required property \'$ref\'');
    assert(validator.errors.length === 1);
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, 'Reference without required properties is not valid');
    assert(validator.errors[0].message === 'must have required property \'$ref\'');
    assert(validator.errors.length === 1);
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

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
