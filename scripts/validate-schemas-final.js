const fs = require('fs');
const path = require('path');

const AjvDraft04 = require('ajv-draft-04');
const ajvDraft04 = new AjvDraft04();

const Ajv = require('ajv');
const ajv = new Ajv();

function validation (){

  // Specify the path to the 'schemas' directory
  const directoryPath = './schemas';

  try{

    const files = fs.readdirSync(directoryPath);

    // Filter files
    const filteredFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');


    // Collect errors in an array
    const validationErrors = [];
    
    // Iterate through the filtered files
    filteredFiles.forEach(file => {
        // Construct the full path to the JSON schema file
        const filePath = path.join(directoryPath, file);
        

        try {
            // Read and parse the JSON schema
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const obj = JSON.parse(fileContent);
    
            let validate;
            if (obj.$schema === 'http://json-schema.org/draft-04/schema') {
                // Validate the schema
                validate = ajvDraft04.validateSchema(obj);
                if(validate){
                    console.log(`${file}: JSON Schema is valid!`);
                }
            } else {
                // Validate the schema
                validate = ajv.validateSchema(obj);
                if(validate){
                    console.log(`${file}: JSON Schema is valid!`);
                }
            }
    
            // Check if the schema is not valid and collect errors
            if (!validate) {
                validationErrors.push({
                    file,
                    errors: obj.$schema === 'http://json-schema.org/draft-04/schema'
                    ? ajvDraft04.errors
                    : ajv.errors
                });
                // console.error(`${file}: JSON Schema is not valid:`, ajv.errors);
            }
        } catch (error) {
            validationErrors.push({
            file,
            errors: [{ message: `Error reading or parsing JSON Schema: ${error.message}` }]
            });
        }
        });

            // Print errors after processing all files
        validationErrors.forEach(({ file, errors }) => {
            console.error(`${file}: JSON Schema is not valid:`, errors);
        });

        // Exit with an error code if there are validation errors
        if (validationErrors.length > 0) {
            process.exit(1);
        }
        
    } catch (error) {
        console.error('Error during validation:', error.message);
    }
}


validation();
console.log('Validation completed successfully.');