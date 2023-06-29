const path = require('path');
/**
 * This script adds a new version of the spec, by copying the latest one as baseline.
 */
const exec = require('child_process').exec;
const fs = require('fs');
const inputNewVersion = process.env.newVersion;
//Regex taken from https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const versionRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/g; //NOSONAR

/**
 * Promise based function to execute commands 
 * 
 * @param {string} command to execute 
 * @returns 
 */
function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout, stderr) { //NOSONAR
      if (!error) resolve(stdout);
      console.error(stderr);
      reject(error);
    });
  });
}

/**
 * Add the new AsyncAPI schema object as values to schemaFormat
 * 
 * If a major version change, replaces all old AsyncAPI schemaFormat values with fresh ones
 * if minor or fix, it add new ones
 */
function addNewSchemaVersion(newVersion, newVersionDir, latestVersion) {
  const objFile = path.resolve(newVersionDir, 'messageObject.json');
  const obj = require(objFile);
  let enums = [] = obj?.properties?.schemaFormat?.anyOf[1]?.enum;
  const isMajorVersionChange = newVersion.charAt(0) !== latestVersion.charAt(0);

  //Add new version to schemaFormat
  if(enums) {
    if(isMajorVersionChange) {
      //Remove all old AsyncAPI schema formats
      enums = enums.filter((format) => !format.includes('application/vnd.aai.asyncapi'));
    }
    //Add new schema formats
    enums.push(`application/vnd.aai.asyncapi;version=${newVersion}`);
    enums.push(`application/vnd.aai.asyncapi+json;version=${newVersion}`);
    enums.push(`application/vnd.aai.asyncapi+yaml;version=${newVersion}`);
    obj.properties.schemaFormat.anyOf[1].enum = enums;
  } else {
    throw new Error("Could not find object to add schemaFormat values to");
  }

  fs.writeFileSync(objFile, JSON.stringify(obj, null, 2));
}

/**
 * Adapt the root title and .asyncapi property
 */
function adaptRootObject(newVersion, newVersionDir) {
  const objFile = path.resolve(newVersionDir, 'asyncapi.json');
  const obj = require(objFile);
  obj.title = `AsyncAPI ${newVersion} schema.`;
  obj.properties.asyncapi.const = newVersion;
  fs.writeFileSync(objFile, JSON.stringify(obj, null, 2));
}

async function addNewVersion(newVersion) {
  const newVersionDir = `./definitions/${newVersion}`;

  try {
    fs.accessSync(newVersionDir);
    console.error(`Directory ${newVersionDir} already exist and cannot be overwritten. Please create a different version.`)
    return process.exit(1);
  } catch (err) { }

  //Use the newest version as baseline for the new one
  const latestVersion = (await execute('ls -d ./definitions/* | sort -V -r | head -1 | xargs -n 1 basename')).trim();
  await execute(`cp -R ./definitions/${latestVersion} ${newVersionDir}`);

  // Replace $ref and $id paths such as `/3.0.0/` with new version (http://asyncapi.com/definitions/3.0.0/specificationExtension.json)
  await execute(`find ${newVersionDir} -name '*.json' -exec sed -i '' \"s+\/${latestVersion}\/+\/${newVersion}\/+g\" {} +`);
  // Replace .asyncapi version from old to new version
  // Replace old version in title with new version
  adaptRootObject(newVersion, newVersionDir);
  // Add new schemaFormat version entries
  addNewSchemaVersion(newVersion, newVersionDir, latestVersion);

  console.log(`New version added to ${newVersionDir}`)
}

const versionMatch = inputNewVersion.match(versionRegex);
if (!versionMatch) {
  console.error(`The new version ${inputNewVersion} must use semver versioning. `)
  process.exit(1);
} else {
  addNewVersion(inputNewVersion);
}
