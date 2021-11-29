const fs = require('fs');
const path = require('path');
const input = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../schemas/2.2.0.json')));

const alreadyChecked = [];
async function recurs(toCheck, defs){
  if(alreadyChecked.includes(toCheck)) return;
  console.log(toCheck);
  alreadyChecked.push(toCheck)
  for (const [key, value] of Object.entries(toCheck)) {
    if(key === 'schema') break;
    if (typeof value === 'object'){
      //Recursive
      await recurs(value, defs);
    }
    if(key === '$ref' && typeof value === 'string'){
      const valueSplit = ("" + value).split('/');
      if(valueSplit.length === 3) {
        const separateDefName = valueSplit[valueSplit.length-1];
        const definition = defs[separateDefName];
        definition['$schema'] = 'http://json-schema.org/draft-07/schema#';
        const newRef = `${separateDefName}.json`;
        definition['$id'] = newRef;
        console.log(valueSplit); 
        await recurs(definition, defs);
        toCheck['$ref'] = newRef;
        fs.writeFileSync(path.resolve(__dirname, './output', `${newRef}`), JSON.stringify(definition, null, 2));
      } 
    }
  }
}
fs.rmdirSync(path.resolve(__dirname, './output'), {recursive: true, force: true});
fs.mkdirSync(path.resolve(__dirname, './output'));
recurs(input, input['definitions']).catch(e => {console.error(e);}).then(() => {console.log("DONE")});