const fs = require("fs");
const path = require("path");
const currentDirectory = path.resolve(__dirname);

// add help command
if (process.argv[2] === "help") {
  console.log("Usage: yarn add-resource <resource_type> <resource_name>");
  console.log("Example: yarn add-resource contact_field new_property");
  return;
}

// read arguments from command line first one is resource name second one is resource type
const resourceType = process.argv[2];
const resourceName = process.argv[3];

// validate resourceName to be a srting with _ and - characters
const resourceNameRegex = /^[\w-]+$/;
if (!resourceNameRegex.test(resourceName)) {
  throw new Error("Invalid resource name.");
}
//timestamp
const timestamp = new Date().getTime();
const filename = `${resourceName}_${timestamp}.json`;
const writeCb = (err) => {
  if (err) {
    console.error("Error creating file:", err);
  } else {
    console.log("File created successfully:", filePath);
  }
};
switch (resourceType) {
  case "contact_field":
    const fileContent = `{
    "name": "last_completed_at",
    "application_type": "longtext"
}`;
    fs.writeFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/contact_fields", filename),
      fileContent,
      writeCb
    );
    break;
  case "external_event":
    const fileContent_1 = `{
        "name": "${resourceName}",
        "application_type: "longtext"
          }`;
    fs.writeFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/external_events", filename),
      fileContent_1,
      writeCb
    );
    break;
  case "webhook":
    const fileContent_2 = `{
        "name": "${resourceName}",
        "application_type: "longtext"
          }`;
    fs.writeFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/webhook_presets", filename),
      fileContent_2,
      writeCb
    );
    break;
  default:
    console.log("No resource type specified.");
}
