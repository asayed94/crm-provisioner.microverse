const { availableCRMs, availablePaths, getChangedFiles } = require("./helpers");

const sha = process.argv[2];

if (!sha) {
  console.error("Usage: yarn validate_changes <commit_sha>");
  process.exit(1);
}

const addedFiles = getChangedFiles(sha, "A");
const deletedFiles = getChangedFiles(sha, "D");
const modifiedFiles = getChangedFiles(sha, "M");

if (modifiedFiles.length > 0) {
  console.error("You cannot modify files in this repository. Please create a new file instead.");
  process.exit(1);
}
for (const file of addedFiles) {
  if (!availablePaths.some((path) => file.includes(path))) {
    console.error(
      "You cannot add files in this repository. Please create a new file instead using command\n 'yarn add-resource <resource_type> <resource_name>'."
    );
    process.exit(1);
  }
}
for (const file of deletedFiles) {
  if (!availablePaths.some((path) => file.includes(path))) {
    console.error("You cannot delete files in this repository. Please create a new file instead.");
    process.exit(1);
  }
}
console.log("All Changes files are valid!");
