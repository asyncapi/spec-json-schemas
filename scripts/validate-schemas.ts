/*
 * We can run this script using ts-node which is installed .nvm/versions/node/v20.9.0/bin/ts-node 
 * 
 * The tsconfig.json file is required to run this script in TypeScript itself.
 * 
 * This script can be directly executed using the following command by going into scripts folder and then execute --> ```ts-node validate-schemas.ts```
*/


import Ajv, { ErrorObject } from 'ajv';
import * as fs from 'fs';
import specs from '@asyncapi/specs';



// Load your JSON Schema document
const schemaDocument: string = fs.readFileSync('../schemas/2.0.0.json', 'utf-8');
const schema: any = JSON.parse(schemaDocument); // Assuming the schema is of type `any` for simplicity

// Create an instance of Ajv
const ajv: Ajv = new Ajv();

// Compile the schema
const validate = ajv.compile(schema);

// Check if the schema is valid
const isSchemaValid: boolean | PromiseLike<boolean> | undefined = validate(schema);

if (isSchemaValid) {
  console.log('JSON Schema is valid!');
} else {
  const validationErrors: ErrorObject[] | null | undefined = validate.errors;
  console.error('JSON Schema is not valid:', validationErrors);
}
