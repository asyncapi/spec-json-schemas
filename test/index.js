const assert = require('assert');

describe('AsyncAPI', () => {
  it('should return an object', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi === 'object', 'Returned value is not an object.');
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
