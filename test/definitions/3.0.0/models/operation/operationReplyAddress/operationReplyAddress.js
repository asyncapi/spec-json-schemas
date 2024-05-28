import TestHelper from '@test/test-helper';

const fs = require('fs');
const assert = require('assert');
const title = 'Operation Reply Address';
const validator = TestHelper.validator(require('@definitions/3.0.0/operationReplyAddress.json'));

describe(`${title}`, () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} example MUST be valid`);
  });

  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, `${title} with empty body is not valid`);
    assert(validator.errors[0].message === 'must have required property \'location\'');
    assert(validator.errors.length === 1);
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, `${title} without required properties is valid`);
    assert(validator.errors[0].message === 'must have required property \'location\'');
    assert(validator.errors.length === 1);
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} is valid with only required properties`);
  });

  it('extended. Reason: schema doesn\'t check for extensions', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} can be extended`);
  });

  it('wrongly extended. Reason: schema doesn\'t check for extensions', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/wrongly extended.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === false, `${title} is not valid when was wrongly extended`);
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
