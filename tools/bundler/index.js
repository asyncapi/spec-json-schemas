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
    try{
      console.log(`Bundling the following version together: ${version}`);
      const versionDir = path.resolve(definitionsDirectory, version);
      const definitions = await fs.promises.readdir(versionDir);
      const definitionFiles = definitions.filter((value) => {return !value.includes('asyncapi')}).map((file) => fs.readFileSync(path.resolve(versionDir, file)));
      const definitionJson = definitionFiles.map((file) => JSON.parse(file));

      for (const jsonFile of definitionJson) {
        Bundler.add(jsonFile, `file://${versionDir}/${jsonFile.$id}.json`);
      }
      console.log(definitionJson); 
      const fileToBundle = `file://${versionDir}/asyncapi.json`;
      const main = await Bundler.get(fileToBundle);
      const bundledSchema = await Bundler.bundle(main);
      bundledSchema.description = `!!Auto generated!! \n Do not manually edit. ${bundledSchema.description ?? ''}`;
      const outputFile = path.resolve(outputDirectory, `${version}.json`);
      console.log(`Writing the bundled file to: ${outputFile}`);
      await fs.promises.writeFile(outputFile, JSON.stringify(bundledSchema, null, 4));
    }catch(e) {
      console.log(e);
    }
  }
  console.log('done');
})();

