//get commited files from the sha commit and return them as a list
// using commit  sha
const { execSync } = require("child_process");

// execSync is not defined
function getStagedFiles(sha, diffType) {
  const stagedFiles = execSync(`git diff-tree --no-commit-id --name-only --diff-filter=${diffType} -r ${sha}`)
    .toString()
    .split("\n")
    .filter((file) => file.startsWith("src/emarsys"));
  console.log(stagedFiles);
}

if (process.argv.length < 3) {
  console.error("Usage: yarn staged <diff_type> <commit_sha>");
  process.exit(1);
} else {
  // read sha as arguemnt
  const diffType = process.argv[2];
  const sha = process.argv[3];
  getStagedFiles(sha, diffType);
  process.exit(0);
}
