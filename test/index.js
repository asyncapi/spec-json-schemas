const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('AsyncAPI', () => {
  it('should return an object', () => {
    const asyncapi = require('..');
    assert(typeof asyncapi === 'object', 'Returned value is not an object.');
  });

  it('should check if json schema is exported and if it matches the original file', () => {
    const files = fs.readdirSync('schemas');
    files.filter((file) => {
      return !fs.lstatSync(path.resolve(__dirname, `../schemas/${file}`)).isDirectory();
    }).forEach(file => {
      const fileName = path.parse(file).name;
      
      const asyncapi = require('..');
      assert(typeof asyncapi[fileName] === 'object', `Returned object does not contain ${fileName}.`);

      const asyncapiVersion = require('..')[fileName];
      const asyncapiSchema = require(`../schemas/${fileName}.json`);
      assert.deepStrictEqual(asyncapiVersion, asyncapiSchema, `Returned object is not schema version ${fileName}.`);
    });
  });
});
