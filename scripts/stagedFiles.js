//get commited files from the sha commit and return them as a list
// using commit  sha

function getStagedFiles(sha) {
  const stagedFiles = execSync(`git diff-tree --no-commit-id --name-only -r ${sha}`).toString();
  return stagedFiles.split("\n").filter((file) => file);
}
