const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Ajv = require("ajv")
const versionsToTest = [
  {
    version: '3.0.0'
  }
]
describe("Should be able to validate", function () {
  this.timeout(30000); 
  it('all valid documents', () => {
    for (const versionToTest of versionsToTest) {
      const version = versionToTest.version;
      const asyncapi = require('..');
      const schema = asyncapi[version];
      delete schema.definitions['http://json-schema.org/draft-07/schema'];
      const ajv = new Ajv({
        jsonPointers: true,
        allErrors: true,
        schemaId: '$id',
        logger: false,
        validateFormats: false,
        strict: false
      });
      const documentPaths = fs.readdirSync(path.resolve(__dirname, `./docs/${version}`)).map((pathToDoc) => {return path.resolve(__dirname, `./docs/${version}/${pathToDoc}`)});
      for (const documentPath of documentPaths) {
        const document = require(documentPath);
        const validate = ajv.compile(schema)
        const valid = validate(document)
        assert(valid === true, 'Document ' + documentPath + ' must be validated correctly: ' + JSON.stringify(validate.errors, null, 4));
      }
    }
  });
});
