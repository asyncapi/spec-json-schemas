
/**
 * This script adds a new version of the spec, by copying the newest one as a base.
 */
const exec = require('child_process').exec;
const fs = require('fs');

function execute(command){
  return new Promise((resolve, reject) => {
    exec(command, function(error, stdout, stderr){ 
      if(!error) resolve(stdout); 
      console.error(stderr);
      reject(error);
    });
  });
};

async function add(newVersion){
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

const newVersion = process.env.newVersion;
add(newVersion);