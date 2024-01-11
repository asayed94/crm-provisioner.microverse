const fs = require("fs");
const path = require("path");

filename = process.argv[2];

if (process.argv[2] === "help") {
  console.log("Usage: yarn delete_resource <resource_file_path>");
  console.log("Example: yarn delete_resource emarsys/contact_field/test_10_1704934016735.json");
  return;
}
if (!filename) {
  console.log("Please provide a filename");
  process.exit(1);
}

const currentDirectory = path.resolve(__dirname);
const parentDir = path.resolve(currentDirectory, "..", filename.split("/").slice(0, -1).join("/"));

const { remove } = require(path.resolve(parentDir, "operations.js"));
const { apiToken } = require("./apiToken.js");

(async () => {
  if (!remove) {
    console.log("Please provide a remove function");
    process.exit(1);
  } else {
    const token = apiToken(filename);
    if (!token) {
      console.log("Please provide an Emarsys token");
      process.exit(1);
    }
    const res = await remove(filename, token);
    console.log(JSON.stringify(res));
  }
})();
