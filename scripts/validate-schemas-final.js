const fs = require('fs');
const path = require('path');


function validation (excludedFiles){

  // Specify the path to the 'schemas' directory
  const directoryPath = './schemas';


  const files = fs.readdirSync(directoryPath);

  // Filter files
  const filteredFiles = files.filter(file => !excludedFiles.includes(file));


  // Iterate through the filtered files
  filteredFiles.forEach(file => {
    // Construct the full path to the JSON schema file
    const filePath = path.join(directoryPath, file);

    try {
      // Read and parse the JSON schema
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const obj = JSON.parse(fileContent);

        if(obj.$schema === 'http://json-schema.org/draft-04/schema'){

            // console.log('draft-04'); // for debugging purpose
            const Ajv = require('ajv-draft-04');
            const ajv = new Ajv();
            // Validate the schema
            const validate = ajv.validateSchema(obj);

            // Check if the schema is valid
            if (validate) {
                console.log(`${file}: JSON Schema is valid!`);
            } else {
                console.error(`${file}: JSON Schema is not valid:`, ajv.errors);
                process.exit(1);
            }
        } else{
            // console.log('draft-07'); // for debugging purpose

            const Ajv = require('ajv');
            const ajv = new Ajv();

            // Remove unnecessary definitions
            delete obj.definitions['http://json-schema.org/draft-04/schema'];
            delete obj.definitions['http://json-schema.org/draft-07/schema'];
            // Validate the schema
            const validate = ajv.validateSchema(obj);

            // Check if the schema is valid
            if (validate) {
                console.log(`${file}: JSON Schema is valid!`);
            } else {
                console.error(`${file}: JSON Schema is not valid:`, ajv.errors);
                process.exit(1);
            }
        }
    } catch (error) {
      console.error(`${file}: Error reading or parsing JSON Schema:`, error.message);
      process.exit(1);
    }
  });
}

const excludedFiles=['README.md', '2.0.0-rc1-without-$id.json'];

validation(excludedFiles);