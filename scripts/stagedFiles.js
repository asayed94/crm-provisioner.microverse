//get commited files from the sha commit and return them as a list
// using commit  sha
const { execSync } = require("child_process");
const { getChangedFiles, availablePaths } = require("./helpers");

if (process.argv.length < 3) {
  console.error("Usage: yarn changes <diff_type> <commit_sha>");
  process.exit(1);
} else {
  // read sha as arguemnt
  const diffType = process.argv[2];
  const sha = process.argv[3];
  const argv = require("minimist")(process.argv.slice(3));
  const outputType = argv["out"];
  const files = getChangedFiles(sha, diffType).filter(
    (file) => file.endsWith(".json") && availablePaths.some((p) => file.includes(p))
  );
  if (outputType === "json") {
    console.log(JSON.stringify({ files }));
  } else {
    console.log(files.join(" "));
  }
  process.exit(0);
}
