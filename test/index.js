const assert = require('assert');

describe('AsyncAPI', () => {
  it('should return an object', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi === 'object', 'Returned value is not an object.');
  });

  // Version 2.0.0-rc2

  it('should return an object with 2.0.0-rc2 key', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi['2.0.0-rc2'] === 'object', 'Returned object does not contain 2.0.0-rc2.');
  });
  it('should return schema version 2.0.0-rc2', () => {
    const asyncapi = require('..')['2.0.0-rc2'];
    const asyncapi200rc1 = require('../schemas/2.0.0-rc2.json');
    assert.deepStrictEqual(asyncapi, asyncapi200rc1, 'Returned object is not schema version 2.0.0-rc2.');
  });

  // Version 2.0.0-rc1

  it('should return an object with 2.0.0-rc1 key', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi['2.0.0-rc1'] === 'object', 'Returned object does not contain 2.0.0-rc1.');
  });
  it('should return schema version 2.0.0-rc1', () => {
    const asyncapi = require('..')['2.0.0-rc1'];
    const asyncapi200rc1 = require('../schemas/2.0.0-rc1.json');
    assert.deepStrictEqual(asyncapi, asyncapi200rc1, 'Returned object is not schema version 2.0.0-rc1.');
  });

  // Version 1.2.0

  it('should return an object with 1.2.0 key', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi['1.2.0'] === 'object', 'Returned object does not contain 1.2.0.');
  });
  it('should return schema version 1.2.0', () => {
    const asyncapi = require('..')['1.2.0'];
    const asyncapi120 = require('../schemas/1.2.0.json');
    assert.deepStrictEqual(asyncapi, asyncapi120, 'Returned object is not schema version 1.2.0.');
  });

  // Version 1.1.0

  it('should return an object with 1.1.0 key', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi['1.1.0'] === 'object', 'Returned object does not contain 1.1.0.');
  });
  it('should return schema version 1.1.0', () => {
    const asyncapi = require('..')['1.1.0'];
    const asyncapi110 = require('../schemas/1.1.0.json');
    assert.deepStrictEqual(asyncapi, asyncapi110, 'Returned object is not schema version 1.1.0.');
  });

  // Version 1.0.0

  it('should return an object with 1.0.0 key', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi['1.0.0'] === 'object', 'Returned object does not contain 1.0.0.');
  });
  it('should return schema version 1.0.0', () => {
    const asyncapi = require('..')['1.0.0'];
    const asyncapi100 = require('../schemas/1.0.0.json');
    assert.deepStrictEqual(asyncapi, asyncapi100, 'Returned object is not schema version 1.0.0.');
  });
});
