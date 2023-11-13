const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

// Load your JSON Schema document
const schemaDocument = fs.readFileSync('./schemas/2.0.0.json', 'utf-8');
const schema = JSON.parse(schemaDocument);

// Create an instance of Ajv
const ajv = new Ajv();

// Compile the schema
const validate = ajv.compile(schema);

// Check if the schema is valid
const isSchemaValid = validate(schema);

if (isSchemaValid) {
  console.log('JSON Schema is valid!');
} else {
  console.error('JSON Schema is not valid:', validate.errors);
}