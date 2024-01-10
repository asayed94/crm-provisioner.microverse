const fs = require("fs");
const path = require("path");
const currentDirectory = path.resolve(__dirname);

// add help command
if (process.argv[2] === "help") {
  console.log("Usage: yarn add-resource <crm_provide>/<resource_type> <resource_name>");
  console.log("Example: yarn add-resource emarsys/contact_field new_property");
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
  case "emarsys/contact_field":
    const fileContent = `{
    "name": "last_completed_at",
    "application_type": "longtext"
}`;
    const exampleContent = fs.readFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/contact_fields/example.json"),
      "utf8"
    );

    const exampleJson = JSON.parse(exampleContent);
    exampleJson.name = resourceName;
    fs.writeFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/contact_fields", filename),
      JSON.stringify(exampleJson, null, 2),
      writeCb
    );
    break;
  case "emarsys/external_event":
    const exampleEventContent = fs.readFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/external_events/example.json"),
      "utf8"
    );
    const exampleEventJson = JSON.parse(exampleEventContent);
    exampleEventJson.name = resourceName;
    fs.writeFileSync(
      path.resolve(currentDirectory, "..", "src/emarsys/external_events", filename),
      JSON.stringify(exampleEventJson, null, 2),
      writeCb
    );
    break;
  case "emarsys/webhook_preset":
    throw new Error("Not implemented yet.");
    break;
  default:
    console.log("No resource type specified.");
}
