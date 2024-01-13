const fs = require('fs');
const path = require('path');
const AjvDraft04 = require('ajv-draft-04');
const ajvDraft04 = new AjvDraft04();
const Ajv = require('ajv');
const ajv = new Ajv();

function validateSchema(filePath, fileContent, schemaValidator) {
  try {
    const obj = JSON.parse(fileContent);
    const validate = schemaValidator(obj);

    if (validate) {
      console.log(`\n${filePath}: JSON Schema is valid!`);
    } else {
      console.error(`\n${filePath}: JSON Schema is not valid:`, schemaValidator.errors);
    }

    return validate;
  } catch (error) {
    console.error(`\n${filePath}: Error reading or parsing JSON Schema: ${error.message}`);
    return false;
  }
}

function validation(excludedFiles) {
  const directoryPath = './schemas';

  try {
    const files = fs.readdirSync(directoryPath);
    const filteredFiles = files.filter(file => !excludedFiles.includes(file) && path.extname(file).toLowerCase() === '.json');
    
    const validationErrors = [];

    filteredFiles.forEach(file => {
      const filePath = path.join(directoryPath, file);

      const schemaValidator = (obj) => {
        return (obj.$schema === 'http://json-schema.org/draft-04/schema') ? ajvDraft04.validateSchema(obj) : ajv.validateSchema(obj);
      };

      if (!validateSchema(filePath, fs.readFileSync(filePath, 'utf8'), schemaValidator)) {
        validationErrors.push({ file });
      }
    });

    if (validationErrors.length > 0) {
      console.error('\nValidation errors:');
      validationErrors.forEach(({ file }) => console.error(file));
      process.exit(1);
    }
  } catch (error) {
    console.error('\nError during validation:', error.message);
    process.exit(1);
  }
}

const excludedFiles = ['2.0.0-rc1.json', '2.0.0-rc1-without-$id.json'];
validation(excludedFiles);
console.log('\nValidation completed successfully.');
