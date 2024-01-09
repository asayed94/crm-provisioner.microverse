const fs = require("fs");

const filename = process.argv[2];
const extraConfig = process.argv[3];

if (!filename) {
  console.log("Please provide a filename");
  process.exit(1);
}
if (!extraConfig) {
  console.log("Please provide extra config");
  process.exit(1);
}

const correctPath = path.resolve(__dirname, "..", filename);
const config = JSON.parse(fs.readFileSync(correctPath));
config.update(JSON.parse(extraConfig));
fs.writeFileSync(path.resolve(correctPath), JSON.stringify(config, null, 2), {
  encoding: "utf8",
});
