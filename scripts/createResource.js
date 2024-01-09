const fs = require("fs");
const path = require("path");
const { create } = require("./operations.js");
const { apiToken } = require("./apiToken.js");

const filename = process.argv[2];

if (!filename) {
  console.log("Please provide a filename");
  process.exit(1);
}

const currentDirectory = path.resolve(__dirname);

(async () => {
  if (!create) {
    console.log("Please provide a create function");
    process.exit(1);
  } else {
    const token = apiToken(filename, process.env["EMARSYS_USERNAME"], process.env["EMARSYS_SECRET"]);
    if (!token) {
      console.log("Please provide an Emarsys token");
      process.exit(1);
    }
    const res = await create(filename.split("/").pop(), token);
    console.log(JSON.stringify(res));
  }
})();
