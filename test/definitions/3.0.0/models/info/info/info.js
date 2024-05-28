import TestHelper from '@test/test-helper';

const fs = require('fs');
const assert = require('assert');
const title = 'Info'
const validator = TestHelper.validator(require('@definitions/3.0.0/info.json'));

describe('Info', () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} example MUST be valid`);
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
