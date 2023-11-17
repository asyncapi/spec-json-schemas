/*
 * We can run this script using ts-node which is installed .nvm/versions/node/v20.9.0/bin/ts-node 
* 
* The tsconfig.json file is required to run this script in TypeScript itself.
* 
* This script can be directly executed using the following command by going into scripts folder and then execute --> ```ts-node validate-schemas.ts```
*/

const Ajv = require("ajv")
const ajv = new Ajv();

// import * as fs from 'fs';
// import * as path from 'path';



// **************************** TESTING DATA  *****************************************************

const invalidSchema = `{
  "$id":"http://foo.bar",
  "$schema":"http://json-schema.org/draft-07/schema",
  "definitions":{
     "http://json-schema.org/draft-07/schema":{},
     "person":{
        "type":"object",
        "properties":{
           "name":{
              "type":"invalid"
           }
        }
     }
  }
}`;

const validSchema = `{
  "$id":"http://foo.bar",
  "$schema":"http://json-schema.org/draft-07/schema",
  "definitions":{
     "http://json-schema.org/draft-07/schema":{},
     "person":{
        "type":"object",
        "properties":{
           "name":{
              "type":"string"
           }
        }
     }
  }
}`;

// ****************************************************************************




const obj = JSON.parse();


// delete obj.definitions['http://json-schema.org/draft-07/schema'];

// delete obj.definitions['http://json-schema.org/draft-04/schema'];

// Create an instance of Ajv

// Compile the schema
const validate = ajv.validateSchema(obj);

if (validate) {
  console.log('JSON Schema is valid!');
} else {
  console.error('JSON Schema is not valid:', ajv.errors);
  process.exit(1);
}
