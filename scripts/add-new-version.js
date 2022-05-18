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

  // Replace old version numbers with new
  await execute(`find ${newVersionDir} -name '*.json' -exec sed -i '' \"s+${latestVersion}+${newVersion}+g\" {} +`);

  console.log(`New version added to ${newVersionDir}`)
}

const versionMatch = inputNewVersion.match(versionRegex);
if (!versionMatch) {
  console.error(`The new version ${inputNewVersion} must use semver versioning. `)
  process.exit(1);
} else {
  addNewVersion(inputNewVersion);
}
