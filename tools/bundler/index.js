const path = require('path');
const fs = require('fs');
const traverse = require('json-schema-traverse');
const definitionsDirectory = path.resolve(__dirname, '../../definitions');
const outputDirectory = path.resolve(__dirname, '../../schemas');
const JSON_SCHEMA_PROP_NAME = 'json-schema-draft-07-schema';
console.log(`Looking for separate definitions in the following directory: ${definitionsDirectory}`);
console.log(`Using the following output directory: ${outputDirectory}`);

/**
 * When run, go through all versions that have split definitions and bundles them together.
 */
(async () => {
  const versions = await fs.promises.readdir(definitionsDirectory);
  console.log(`Ensuring output directory is present ${outputDirectory}`);
  if (!fs.existsSync(outputDirectory)) {
    await fs.promises.mkdir(outputDirectory);
  }
  console.log(`The following versions have separate definitions: ${versions.join(',')}`);
  for (const version of versions) {
    const Bundler = require("@hyperjump/json-schema-bundle");
    try{
      console.log(`Bundling the following version together: ${version}`);
      const versionDir = path.resolve(definitionsDirectory, version);
      const definitions = await fs.promises.readdir(versionDir);
      const definitionFiles = definitions.filter((value) => {return !value.includes('asyncapi')}).map((file) => fs.readFileSync(path.resolve(versionDir, file)));
      const definitionJson = definitionFiles.map((file) => JSON.parse(file));
      for (const jsonFile of definitionJson) {
        Bundler.add(jsonFile);
      }
      const filePathToBundle = `file://${versionDir}/asyncapi.json`;
      const fileToBundle = await Bundler.get(filePathToBundle);
      const bundledSchema = await Bundler.bundle(fileToBundle);
      modifyRefsAndDefinitions(bundledSchema);
      bundledSchema.description = `!!Auto generated!! \n Do not manually edit. ${bundledSchema.description ?? ''}`;
      const outputFile = path.resolve(outputDirectory, `${version}.json`);
      console.log(`Writing the bundled file to: ${outputFile}`);
      await fs.promises.writeFile(outputFile, JSON.stringify(bundledSchema, null, 4));
    }catch(e) {
      throw new Error(e);
    }
  }
  console.log('done');
})();


/**
 * we first update definitions from URL to normal names
 * than update refs to point to new definitions, always inline never remote
 */
function modifyRefsAndDefinitions(bundledSchema) {

  //first we need to improve names of the definitions from URL to their names
  for (const def of Object.keys(bundledSchema.definitions)) {
    const newDefName = getDefinitionName(def);
    
    //creating copy of definition under new name so later definition stored under URL name can be removed
    bundledSchema.definitions[newDefName] = bundledSchema.definitions[def];
    delete bundledSchema.definitions[def]
  }

  traverse(bundledSchema, replaceRef);
}

/**
 * by default schemas definition names are urls like http://asyncapi.com/definitions/2.4.0/parameters.json
 * we need to get rid of URLs and use the last fragment as new definition name like `parameters`
 */
function getDefinitionName(def) {
  if (def.startsWith('http://json-schema.org')) return JSON_SCHEMA_PROP_NAME;

  if (path.extname(def) !== '.json') throw new Error(`Original $id values should point to JSON files. There is probably an error in one of the source definitions containing definition: ${def}`);
  return path.basename(def, '.json')
}

/**
 * this is a callback used when traversing through json schema
 * it is triggered with every new element of json schema
 */
function replaceRef(schema) {

  //traversing shoudl take place only in case of schemas with refs
  if (schema.$ref === undefined ) return;

  // '#/definitions' refs are always those related to JSON Schema draft, so we just need to update them to point to json schema draft that is inlined inside schema
  if (schema.$ref.startsWith('#/definitions')) {
    schema.$ref = schema.$ref.replace('#/definitions/', `#/definitions/${JSON_SCHEMA_PROP_NAME}/definitions/`);
  // '#' refs need to be updated to point to the root of inlined json schema draft
  } else if (schema.$ref === '#') {
    schema.$ref = `#/definitions/${JSON_SCHEMA_PROP_NAME}`;
  // the rest of refs are those related to remote URL refst that need to be update and point to inlined versions
  } else {
    schema.$ref = `#/definitions/${getDefinitionName(schema.$ref)}`;
  }
}
