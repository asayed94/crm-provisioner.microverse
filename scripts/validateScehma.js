const Ajv = require("ajv");
const fs = require("fs");
const path = require("path");
const currentDirectory = path.resolve(__dirname);

// read list of paths sent as arguments
const paths = process.argv.slice(2);

function getScehma() {
  console.log(currentDirectory);

  const schema = JSON.parse(
    fs.readFileSync(path.resolve(currentDirectory, "..", "src/emarsys/contact_fields/scehma.json"), "utf8")
  );
  console.log(schema);
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return validate;
}

for (const file of paths) {
  console.log(file);
  const validate = getScehma();
  const jsonData = fs.readFileSync(path.resolve(currentDirectory, "..", file), "utf8");
  const isValid = validate(JSON.parse(jsonData));
  if (isValid) {
    console.log("Data is valid!");
  } else {
    console.log("Data is not valid!");
    console.error(JSON.stringify(validate.errors));
  }
}
