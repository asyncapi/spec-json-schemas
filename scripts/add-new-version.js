// NOSONAR
/**
 * This script adds a new version of the spec, by copying the newest one as a base.
 */
const exec = require('child_process').exec;
const fs = require('fs');

const newVersion = process.env.newVersion;

//https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const versionRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/g

function execute(command){
  return new Promise((resolve, reject) => {
    exec(command, function(error, stdout, stderr){ 
      if(!error) resolve(stdout); 
      console.error(stderr);
      reject(error);
    });
  });
}

async function add(){
  const newVersionDir = `./definitions/${newVersion}`;

  try {
    fs.accessSync(newVersionDir);
    console.error(`Directory ${newVersionDir} already exist and cannot be overwritten. Please create a different version.`)
    return process.exit(1); 
  } catch (err) { }

  const latestVersion = (await execute('ls -d ./definitions/* | sort -V -r | head -1 | xargs -n 1 basename')).trim();
  //Copy latest version to new version
  await execute(`cp -R ./definitions/${latestVersion} ${newVersionDir}`);
  await execute(`find ${newVersionDir} -name '*.json' -exec sed -i '' \"s+${latestVersion}+${newVersion}+g\" {} +`);

  console.log(`New version added ${newVersionDir}`)
}

const versionMatch = newVersion.match(versionRegex);
if(!versionMatch) {
  console.error(`The new version ${newVersion} did not match semver regex for new version. Must match semver.`)
  process.exit(1); 
} else {
  add();
}
