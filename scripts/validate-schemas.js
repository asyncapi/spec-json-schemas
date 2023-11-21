/*
 * We can run this script using ts-node which is installed .nvm/versions/node/v20.9.0/bin/ts-node 
* 
* The tsconfig.json file is required to run this script in TypeScript itself.
* 
* This script can be directly executed using the following command by going into scripts folder and then execute --> ```ts-node validate-schemas.ts```
*/

const fs = require('fs');
const path = require('path');

const Ajv = require("ajv")
const ajv = new Ajv();

var globToRegExp = require('glob-to-regexp');

// *******************  TESTING DATA FROM SERGIO MAYA  *********************************************

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

/*

// Specify the path to the 'schemas' directory
const schemasDirectory = '../schemas';

var json = globToRegExp("*.json");

// Read the files from the 'schemas' directory

fs.readdirSync(schemasDirectory).forEach(file => {
  // Construct the full path to the JSON schema file
  const filePath = path.join(schemasDirectory, file);

  try {
    // Read and parse the JSON schema
    const fileContent = fs.readFileSync(path.resolve(__dirname, '../schemas/', ), 'utf8');
    const obj = JSON.parse(fileContent);
    
    delete obj.definitions['http://json-schema.org/draft-04/schema'];
    delete obj.definitions['http://json-schema.org/draft-07/schema'];


    // Compile the schema
    const validate = ajv.validateSchema(obj);

    // Check if the schema is valid
   //  const isSchemaValid = validate(schemaDocument);

    if (validate) {
      console.log(`${file}: JSON Schema is valid!`);
    } else {
      console.error(`${file}: JSON Schema is not valid:`, ajv.errors);
      process.exit(1);
   }
} catch (error) {
   console.error(`${file}: Error reading or parsing JSON Schema:`, error.message);
   process.exit(1);
  }
});

*/


const test = fs.readFileSync(path.resolve(__dirname, '../schemas/draft-07/2.6.0.json'), 'utf8');

try {
   // Read and parse the JSON schema
   // const schemaDocument = require(filePath);
   const obj = JSON.parse(test);
   

   delete obj.definitions['http://json-schema.org/draft-04/schema'];
   delete obj.definitions['http://json-schema.org/draft-07/schema'];

   const validate = ajv.validateSchema(obj);
   // const validate = ajv.validateSchema(obj);

   // Check if the schema is valid
  //  const isSchemaValid = validate(schemaDocument);

   if (validate) {
     console.log(`JSON Schema is valid!`);
   } else {
     console.error(`JSON Schema is not valid:`, ajv.errors);
     process.exit(1);
  }
} catch (error) {
  console.error(`Error reading or parsing JSON Schema:`, error.message);
  process.exit(1);
}



/*
const obj = JSON.parse(test);
   

//    delete obj.definitions['http://json-schema.org/draft-04/schema'];
   delete obj.definitions['http://json-schema.org/draft-07/schema'];

   const validate = ajv.validateSchema(obj);
   // const validate = ajv.validateSchema(obj);

   // Check if the schema is valid
  //  const isSchemaValid = validate(schemaDocument);

   if (validate) {
     console.log(`JSON Schema is valid!`);
   } else {
     console.error(`JSON Schema is not valid:`, ajv.errors);
     process.exit(1);
  }

*/

/*
const obj = JSON.parse(invalidSchema);


// delete obj.definitions['http://json-schema.org/draft-07/schema'];


const validate = ajv.validateSchema(obj);

if (validate) {
  console.log('JSON Schema is valid!');
} else {
  console.error('JSON Schema is not valid:', ajv.errors);
  process.exit(1);
}
*/