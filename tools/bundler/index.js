const $RefParser = require("@apidevtools/json-schema-ref-parser");
const path = require('path');
const fs = require('fs');
const definitionsDirectory = path.resolve(__dirname, '../../definitions');
const outputDirectory = path.resolve(__dirname, '../../schemas');
console.log(`Looking for separate definitions in the following directory: ${definitionsDirectory}`);
console.log(`Using the following output directory: ${outputDirectory}`);

/**
 * When run, go through all versions that have split definitions and bundles them together.
 */
(async () => {
  const versions = await fs.promises.readdir(definitionsDirectory);
  console.log(`The following versions have separate definitions: ${versions.join(',')}`);
  for (const version of versions) {
    console.log(`Bundling the following version together: ${version}`);
    let schema = await $RefParser.bundle(`file://${definitionsDirectory}/${version}/asyncapi.json`, {path: definitionsDirectory});
    schema.description = `!!Auto generated!! \n Do not manually edit. ${schema.description ?? ''}`;
    const outputFile = path.resolve(outputDirectory, `${version}.json`);
    console.log(`Writing the bundled file to: ${outputFile}`);
    fs.promises.writeFile(outputFile, JSON.stringify(schema, null, 4));
  }
  console.log('done');
})();