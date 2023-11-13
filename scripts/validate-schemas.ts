// const Ajv = require('ajv');
// const fs = require('fs');
// const path = require('path');

// // Load your JSON Schema document
// const schemaDocument = fs.readFileSync('./schemas/2.0.0.json', 'utf-8');
// const schema = JSON.parse(schemaDocument);

// // Create an instance of Ajv
// const ajv = new Ajv();

// // Compile the schema
// const validate = ajv.compile(schema);

// // Check if the schema is valid
// const isSchemaValid = validate(schema);

// if (isSchemaValid) {
//   console.log('JSON Schema is valid!');
// } else {
//   console.error('JSON Schema is not valid:', validate.errors);
// }

/***************************************************************************************************/

import Ajv, { ErrorObject } from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

// Load your JSON Schema document
const schemaDocument: string = fs.readFileSync('./schemas/2.0.0.json', 'utf-8');
const schema: any = JSON.parse(schemaDocument); // Assuming the schema is of type `any` for simplicity

// Create an instance of Ajv
const ajv: Ajv = new Ajv();

// Compile the schema
const validate: Ajv.ValidateFunction = ajv.compile(schema);

// Check if the schema is valid
const isSchemaValid: boolean | PromiseLike<boolean> | undefined = validate(schema);

if (isSchemaValid) {
  console.log('JSON Schema is valid!');
} else {
  const validationErrors: ErrorObject[] | null | undefined = validate.errors;
  console.error('JSON Schema is not valid:', validationErrors);
}

