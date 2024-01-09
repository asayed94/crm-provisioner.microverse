filename = process.argv[2];

if (!filename) {
  console.log("Please provide a filename");
  process.exit(1);
}

const fs = require("fs");
const path = require("path");
currentDirectory = path.resolve(__dirname);
parentDir = path.resolve(currentDirectory, "..", filename.split("/").slice(0, -1).join("/"));

const { create } = require(path.resolve(parentDir, "operations.js"));
const { apiToken } = require("./apiToken.js");

(async () => {
  if (!create) {
    console.log("Please provide a create function");
    process.exit(1);
  } else {
    const token = apiToken(filename, "babbel_staging096", "I2vdlldtdapLCf3FpqyW");
    if (!token) {
      console.log("Please provide an Emarsys token");
      process.exit(1);
    }
    const id = await create(filename.split("/").pop(), token);
    console.log(id);
  }
})();
