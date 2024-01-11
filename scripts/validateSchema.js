const fs = require("fs");
const path = require("path");
const currentDirectory = path.resolve(__dirname);
const { getSchema } = require("./helpers");

// read list of paths sent as arguments
const paths = process.argv.slice(2);

for (const file of paths) {
  console.log(file);
  const validate = getSchema(file);
  const jsonData = fs.readFileSync(path.resolve(currentDirectory, "..", file), "utf8");
  const isValid = validate(JSON.parse(jsonData));
  if (isValid) {
    console.log("Data is valid!");
  } else {
    console.error("Data is not valid!\n", JSON.stringify(validate.errors));
    process.exit(1);
  }
}
