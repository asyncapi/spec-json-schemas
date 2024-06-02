import {describe, it, suite, test} from 'vitest';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

suite('AsyncAPI: 3.0.0', () => {
  suite('Models', () => {
    test('Info Test Suite', () => require('./definitions/3.0.0/models/info'));
    test('Channel Test Suite', () => require('./definitions/3.0.0/models/channel'));
    test('Operation Test Suite', () => require('./definitions/3.0.0/models/operation'));
    test('Server Test Suite', () => require('./definitions/3.0.0/models/server'));
    test('Tag Test Suite', () => require('./definitions/3.0.0/models/tag'));
    test('Reference Test Suite', () => require('./definitions/3.0.0/models/reference'));
    test('Reference Object Test Suite', () => require('./definitions/3.0.0/models/reference object'));
  });
  suite('Bundler', () => {
    test('Validator Test Suite', () => require('@test/schemas.mjs'));
  })
});

describe('AsyncAPI: Bundler', () => {
  it('should return an object', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi === 'object', 'Returned value is not an object.');
  });

  it('should check if json schema is exported and if it matches the original file', () => {
    const skipFiles = ['README', 'all.schema-store', '1.0.0', '1.1.0', '1.2.0', '2.0.0-rc1', '2.0.0-rc2', '1.0.0-without-$id', '1.1.0-without-$id', '1.2.0-without-$id', '2.0.0-rc1-without-$id', '2.0.0-rc2-without-$id'];
    const files = fs.readdirSync('schemas');
    files.forEach(file => {
      const fileName = path.parse(file).name;

      if (skipFiles.includes(fileName)) return;
      const asyncapi = require('..');

      if (fileName.includes('-without-$id')) {
        const schemaName = fileName.replace('-without-$id', '');
        assert(typeof asyncapi.schemasWithoutId[schemaName] === 'object', `Returned object does not contain ${schemaName}.`);
        const asyncapiVersion = require('..').schemasWithoutId[schemaName];
        const asyncapiSchema = require(`../schemas/${fileName}.json`);
        assert.deepStrictEqual(asyncapiVersion, asyncapiSchema, `Returned object is not schema version ${schemaName}.`);
      } else {
        assert(typeof asyncapi.schemas[fileName] === 'object', `Returned object does not contain ${fileName}.`);
        const asyncapiVersion = require('..').schemas[fileName];
        const asyncapiSchema = require(`../schemas/${fileName}.json`);
        assert.deepStrictEqual(asyncapiVersion, asyncapiSchema, `Returned object is not schema version ${fileName}.`);
      }
    });
  });
});
