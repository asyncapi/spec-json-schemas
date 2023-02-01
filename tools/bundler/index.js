const path = require('path');
const fs = require('fs');
const definitionsDirectory = path.resolve(__dirname, '../../definitions');
const bindingsDirectory = path.resolve(__dirname, '../../bindings');
const outputDirectory = path.resolve(__dirname, '../../schemas');
console.log(`Looking for separate definitions in the following directory: ${definitionsDirectory}`);
console.log(`Looking for binding version schemas in the following directory: ${bindingsDirectory}`);
console.log(`Using the following output directory: ${outputDirectory}`);

/**
 * Function to load all the core AsyncAPI spec definition (except the root asyncapi schema, as that will be loaded later) into the bundler.
 */
async function loadDefinitions(bundler, versionDir) {
  const definitions = await fs.promises.readdir(versionDir);
  const definitionFiles = definitions.filter((value) => {return !value.includes('asyncapi')}).map((file) => fs.readFileSync(path.resolve(versionDir, file)));
  const definitionJson = definitionFiles.map((file) => JSON.parse(file));
  for (const jsonFile of definitionJson) {
    bundler.add(jsonFile);
  }
}
/**
 * Function to load all the binding version schemas into the bundler
 */
async function loadBindings(bundler) {
  const bindingDirectories = await fs.promises.readdir(bindingsDirectory);
  for (const bindingDirectory of bindingDirectories) {
    const bindingVersionDirectories = await fs.promises.readdir(path.resolve(bindingsDirectory, bindingDirectory));
    const bindingVersionDirectoriesFiltered = bindingVersionDirectories.filter((file) => fs.lstatSync(path.resolve(bindingsDirectory, bindingDirectory, file)).isDirectory());
    for (const bindingVersionDirectory of bindingVersionDirectoriesFiltered) {
      const bindingFiles = await fs.promises.readdir(path.resolve(bindingsDirectory, bindingDirectory, bindingVersionDirectory));
      const bindingFilesFiltered = bindingFiles.filter((bindingFile) => path.extname(bindingFile) === '.json').map((bindingFile) => path.resolve(bindingsDirectory, bindingDirectory, bindingVersionDirectory, bindingFile));
      for (const bindingFile of bindingFilesFiltered) {
        const bindingFileContent = require(bindingFile);
        bundler.add(bindingFileContent);
      }
    }
  }
}
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
      await loadDefinitions(Bundler, versionDir);
      await loadBindings(Bundler);
      const filePathToBundle = `file://${versionDir}/asyncapi.json`;
      const fileToBundle = await Bundler.get(filePathToBundle);
      const bundledSchema = await Bundler.bundle(fileToBundle);
      bundledSchema.description = `!!Auto generated!! \n Do not manually edit. ${bundledSchema.description ?? ''}`;
      const outputFile = path.resolve(outputDirectory, `${version}.json`);
      console.log(`Writing the bundled file to: ${outputFile}`);
      await fs.promises.writeFile(outputFile, JSON.stringify(bundledSchema, null, 4));
    }catch(e) {
      console.log(e);
    }
  }
  console.log('done');
})();

