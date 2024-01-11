const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const currentDirectory = path.resolve(__dirname);
const Ajv = require("ajv");

function getChangedFiles(sha, diffType) {
  const stagedFilesString = execSync(
    `git diff --no-commit-id --name-only --diff-filter=${diffType} $(git rev-parse origin/main)...${sha}`
  )
    .toString()
    .trimEnd();

  // console.log(stagedFilesString);

  if (stagedFilesString === "") {
    return [];
  } else {
    return stagedFilesString.split("\n");
  }
}

function getSchema(filename) {
  //get the parent directory of the filename sent as argument
  const parentDirectory = filename.split("/").slice(0, -1).join("/");

  const schema = JSON.parse(
    fs.readFileSync(path.resolve(currentDirectory, "..", `${parentDirectory}/schema.json`), "utf8")
  );
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return validate;
}

const availablePaths = ["src/emarsys/contact_fields", "src/emarsys/external_events", "src/emarsys/webhook_presets"];

exports.getChangedFiles = getChangedFiles;
exports.getSchema = getSchema;
exports.availablePaths = availablePaths;
