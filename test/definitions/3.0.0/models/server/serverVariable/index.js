import TestHelper from '@test/test-helper';

const fs = require('fs');
const assert = require('assert');
const title = 'Server Variable';
const validator = TestHelper.validator(require('@definitions/3.0.0/serverVariable.json'));

describe(`${title}`, () => {
  it('example', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/example.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} example MUST be valid`);
  });

  it('empty', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/empty.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} with empty body is valid`);
  });

  it('without required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/without required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} without required properties is valid`);
  });

  it('only required properties', () => {
    const info = JSON.parse(fs.readFileSync(`${__dirname}/only required properties.json`, 'utf-8'));
    const validationResult = validator(info);

    assert(validationResult === true, `${title} is valid with only required properties`);
  });

  it.skip('extended. Reason: schema doesn\'t check for extensions', () => {
    const filePath = path.resolve(__dirname, '../../../../extended.json');
    const model = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === true, `${title} can be extended`);
  });

  it.skip('wrongly extended. Reason: schema doesn\'t check for extensions', () => {
    const filePath = path.resolve(__dirname, '../../../../wrongly extended.json');
    const model = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validationResult = validator(model);

    assert(validationResult === false, `${title} is not valid when was wrongly extended`);
    assert(validator.errors[0].message === 'must NOT have additional properties');
    assert(validator.errors[0].params.additionalProperty === 'ext-number');
    assert(validator.errors.length === 1);
  });
});
