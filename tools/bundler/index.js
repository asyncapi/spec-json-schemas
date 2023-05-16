const path = require("path");
const fs = require("fs");
const traverse = require("json-schema-traverse");
const definitionsDirectory = path.resolve(__dirname, "../../definitions");
const outputDirectory = path.resolve(__dirname, "../../schemas");
const JSON_SCHEMA_PROP_NAME = "json-schema-draft-07-schema";
console.log(
  `Looking for separate definitions in the following directory: ${definitionsDirectory}`
);
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
  console.log(
    `The following versions have separate definitions: ${versions.join(",")}`
  );
  for (const version of versions) {
    const Bundler = require("@hyperjump/json-schema-bundle");
    try {
      console.log(`Bundling the following version together: ${version}`);
      const outputFileWithId = path.resolve(outputDirectory, `${version}.json`);
      const outputFileWithoutId = path.resolve(
        outputDirectory,
        `${version}-without-$id.json`
      );
      const versionDir = path.resolve(definitionsDirectory, version);
      const definitions = await fs.promises.readdir(versionDir);
      const definitionFiles = definitions
        .filter((value) => {
          return !value.includes("asyncapi");
        })
        .map((file) => fs.readFileSync(path.resolve(versionDir, file)));

      const definitionJson = definitionFiles.map((file) => JSON.parse(file));
      for (const jsonFile of definitionJson) {
        if (jsonFile.example) {
          // Replaced the example property with the referenced example property
          loadRefProperties(jsonFile.example, (err, refData) => {
            if (err) {
              throw new Error(err);
            }
            // replace the example property with the returned property
            jsonFile.example = refData;

            Bundler.add(jsonFile);
          });
        } else {
          Bundler.add(jsonFile);
        }
      }
      const filePathToBundle = `file://${versionDir}/asyncapi.json`;
      const fileToBundle = await Bundler.get(filePathToBundle);

      /**
       * bundling schemas into one file with $id
       */
      const bundledSchemaWithId = await Bundler.bundle(fileToBundle);
      bundledSchemaWithId.description = `!!Auto generated!! \n Do not manually edit. ${
        bundledSchemaWithId.description ?? ""
      }`;
      console.log(`Writing the bundled file WITH $ids to: ${outputFileWithId}`);
      await fs.promises.writeFile(
        outputFileWithId,
        JSON.stringify(bundledSchemaWithId, null, 4)
      );

      /**
       * removing ids from schemas and making modifications in definitions name to make sure schemas still work
       * this is needed for tools that do not support $id feature in JSON Schema
       */
      const bundledSchemaWithoutIds =
        modifyRefsAndDefinitions(bundledSchemaWithId);
      console.log(
        `Writing the bundled file WITHOUT $ids to: ${outputFileWithoutId}`
      );
      await fs.promises.writeFile(
        outputFileWithoutId,
        JSON.stringify(bundledSchemaWithoutIds, null, 4)
      );
    } catch (e) {
      throw new Error(e);
    }
  }
  console.log("done");
})();

/**
 * Extract file data from reference file path
 */

function loadRefProperties(filePath, cb) {
  const schemaPath = filePath.$ref;
  // first we need to turn the path to an absolute file path instead of a generic url
  const versionPath = schemaPath.split("examples")[1];
  // we append the extracted file path to the examples dir to read the file
  fs.readFile(`../../examples${versionPath}`, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

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
    delete bundledSchema.definitions[def];
  }

  traverse(bundledSchema, replaceRef);

  return bundledSchema;
}

/**
 * by default schemas definition names are urls like http://asyncapi.com/definitions/2.4.0/parameters.json
 * we need to get rid of URLs and use the last fragment as new definition name like `parameters`
 */
function getDefinitionName(def) {
  if (def.startsWith("http://json-schema.org")) return JSON_SCHEMA_PROP_NAME;

  if (path.extname(def) !== ".json")
    throw new Error(
      `Original $id values should point to JSON files. There is probably an error in one of the source definitions containing definition: ${def}`
    );
  return path.basename(def, ".json");
}

/**
 * this is a callback used when traversing through json schema
 * it is triggered with every new element of json schema
 */
function replaceRef(schema) {
  //new refs will only work if we remove $id that all point to asyncapi.com
  delete schema.$id;

  //traversing shoudl take place only in case of schemas with refs
  if (schema.$ref === undefined) return;

  // '#/definitions' refs are always those related to JSON Schema draft, so we just need to update them to point to json schema draft that is inlined inside schema
  if (schema.$ref.startsWith("#/definitions")) {
    schema.$ref = schema.$ref.replace(
      "#/definitions/",
      `#/definitions/${JSON_SCHEMA_PROP_NAME}/definitions/`
    );
    // '#' refs need to be updated to point to the root of inlined json schema draft
  } else if (schema.$ref === "#") {
    schema.$ref = `#/definitions/${JSON_SCHEMA_PROP_NAME}`;
    // the rest of refs are those related to remote URL refst that need to be update and point to inlined versions
  } else {
    schema.$ref = `#/definitions/${getDefinitionName(schema.$ref)}`;
  }
}
