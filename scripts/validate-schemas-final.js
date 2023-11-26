const fs = require('fs');
const path = require('path');

const AjvDraft04 = require('ajv-draft-04');
const ajvDraft04 = new AjvDraft04();

const Ajv = require('ajv');
const ajv = new Ajv();

function validation (excludedFiles){

  // Specify the path to the 'schemas' directory
  const directoryPath = './schemas';


  const files = fs.readdirSync(directoryPath);

  // Filter files
  const filteredFiles = files.filter(file => !excludedFiles.includes(file) && path.extname(file).toLowerCase() === '.json');


  // Iterate through the filtered files
  filteredFiles.forEach(file => {
    // Construct the full path to the JSON schema file
    const filePath = path.join(directoryPath, file);

    try {
      // Read and parse the JSON schema
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const obj = JSON.parse(fileContent);

        if(obj.$schema === 'http://json-schema.org/draft-04/schema'){

            // Validate the schema
            const validate = ajvDraft04.validateSchema(obj);

            // Check if the schema is valid
            if (validate) {
                console.log(`${file}: JSON Schema is valid!`);
            } else {
                console.error(`${file}: JSON Schema is not valid:`, ajv.errors);
                process.exit(1);
            }
        } else{
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

const excludedFiles=['2.0.0-rc1-without-$id.json', '2.0.0-rc1.json'];

validation(excludedFiles);