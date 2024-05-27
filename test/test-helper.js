const Ajv = require('ajv');
const addFormats = require('ajv-formats');
import schemesV3_0_0 from '@test/ajv-schemes';

export default class TestHelper {

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

}