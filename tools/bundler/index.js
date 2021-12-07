const $RefParser = require("@apidevtools/json-schema-ref-parser");
const path = require('path');
const fs = require('fs');
const definitionsDirectory = path.resolve(__dirname, '../../definitions');
const outputDirectory = path.resolve(__dirname, '../../schemas');
const Bundler = require("@hyperjump/json-schema-bundle");
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
    const versionDir = path.resolve(definitionsDirectory, version);
    const definitions = await fs.promises.readdir(versionDir);
    const definitionFiles = definitions.map((file) => fs.readFileSync(path.resolve(versionDir, file)));
    const definitionJson = definitionFiles.map((file) => JSON.parse(file));

    for (const jsonFile of definitionJson) {
      Bundler.add(jsonFile);
    }
    console.log(definitionJson); 
    const fileToBundle = `file://${definitionsDirectory}/${version}/asyncapi.json`;
    
    const main = await Bundler.get(fileToBundle);
    const bundle = await Bundler.bundle(main);
    bundle.description = `!!Auto generated!! \n Do not manually edit. ${bundle.description ?? ''}`;
    const outputFile = path.resolve(outputDirectory, `${version}.json`);
    console.log(`Writing the bundled file to: ${outputFile}`);
    fs.promises.writeFile(outputFile, JSON.stringify(bundle, null, 4));
  }
  console.log('done');
})();
