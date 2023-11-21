const fs = require('fs');
const path = require('path');


function draft04(){
   const Ajv = require("ajv-draft-04");
   const ajv = new Ajv();


   // Specify the path to the 'schemas' directory
   const directoryPath = '../schemas';

   // Read the files from the 'schemas' directory

   fs.readdirSync(directoryPath).forEach(file => {
   // Construct the full path to the JSON schema file
   const filePath = path.join(directoryPath, file);

   try {
      // Read and parse the JSON schema
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const obj = JSON.parse(fileContent);
      
      delete obj.definitions['http://json-schema.org/draft-04/schema'];
      delete obj.definitions['http://json-schema.org/draft-07/schema'];


      // Compile the schema
      const validate = ajv.validateSchema(obj);

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
}



function draft07(){
   const Ajv = require("ajv");
   const ajv = new Ajv();

   // Specify the path to the 'schemas' directory
   const directoryPath = '../schemas';

   // Read the files from the 'schemas' directory

   fs.readdirSync(directoryPath).forEach(file => {
   // Construct the full path to the JSON schema file
   const filePath = path.join(directoryPath, file);

   try {
      // Read and parse the JSON schema
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const obj = JSON.parse(fileContent);
      
      delete obj.definitions['http://json-schema.org/draft-04/schema'];
      delete obj.definitions['http://json-schema.org/draft-07/schema'];


      // Compile the schema
      const validate = ajv.validateSchema(obj);

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

}


draft04();
draft07();