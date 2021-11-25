const path = require('path');
const fs = require('fs');
const $RefParser = require("@apidevtools/json-schema-ref-parser");
const definitionsDirectory = path.resolve(__dirname, '../../definitions');
const outputDirectory = path.resolve(__dirname, '../../schemas');

(async () => {
  const versions = await fs.promises.readdir(definitionsDirectory);
  for (const version of versions) {
    let schema = await $RefParser.bundle(`file://${definitionsDirectory}/${version}/asyncapi.json`, {path: definitionsDirectory});
    schema.description = `!!Auto generated!! \n Do not manually edit. ${schema.description ?? ''}`
    fs.writeFileSync(path.resolve(outputDirectory, `${version}.json`), JSON.stringify(schema, null, 4));
    console.log(schema);
  }
})();