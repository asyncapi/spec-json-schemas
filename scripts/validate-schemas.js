const Ajv = require('ajv');
const fs = require('fs').promises;
const path = require('path');
const { Parser } = require('@asyncapi/parser');






async function parsing(){
  try {
    // Start measuring time
    console.time('Parsing time');



    // Specify the folder where your JSON Schema document is located
    const schemaFolderPath = path.join(__dirname, '../schemas'); // Replace 'schemas' with your folder name

    // Specify the name of your JSON Schema file
    const schemaFileName = '2.6.0.json'; // Replace 'your-schema.json' with your actual file name

    // Construct the full path to the JSON Schema file
    const schemaFilePath = path.join(schemaFolderPath, schemaFileName);

    // Load your JSON Schema document
    const schemaDocument = await fs.readFile (schemaFilePath, 'utf-8');

    // Log the length of the schemaDocument to help diagnose if it's reading the file properly
    console.log('Length of schemaDocument:', schemaDocument.length);

    // const schema = JSON.parse(schemaDocument);




    const parser = new Parser();
    const { document } = await parser.parse(schemaDocument);
    
    if (document) {
      // => Example AsyncAPI specification
      console.log(document.info().title());
    }


    // Create an instance of Ajv
    const ajv = new Ajv();

    // Compile the schema
    const validate = ajv.compile(document); // schema -> document

    // Check if the schema is valid
    const isSchemaValid = validate(document); // schema -> document

    if (isSchemaValid) {
      console.log('JSON Schema is valid!');
    } else {
      console.error('JSON Schema is not valid:', validate.errors);
    }

    // Stop measuring time
    console.timeEnd('Parsing time');

  } catch (error) {
    console.error('Error parsing AsyncAPI document:', error.message);
  }
}

parsing();







