const crypto = require("crypto");
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { exit } = require("process");

const emarsys_token = (username, secret) => {
  const timestamp = new Date().toISOString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .createHash("sha1")
    .update(nonce + timestamp + secret)
    .digest("hex");

  var passwordDigest = Buffer.from(hash).toString("base64");
  return `UsernameToken Username="${username}", PasswordDigest="${passwordDigest}", Created="${timestamp}", Nonce="${nonce}"`;
};

exports.apiToken = function (filename) {
  if (filename.includes("emarsys")) {
    const emarsysSecret = getFromSecretsManager(process.env["EMARSYS_CREDENTIAL_ARN"]);
    const stagingToken = emarsys_token(emarsysSecret.username, emarsysSecret.secret);
    return stagingToken;
  } else {
    console.log("Please provide a valid path for the resource file");
    exit(1);
  }
};

const getFromSecretsManager = async (secretArn) => {
  try {
    const client = new SecretsManagerClient({
      region: process.env["AWS_REGION"] || "eu-west-1",
    });
    const command = new GetSecretValueCommand({ SecretId: secretArn });
    const response = await client.send(command);

    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString);
      console.log("Secret:", secret);
      return secret;
    } else {
      console.error("Secret data not found.");
    }
  } catch (error) {
    console.error("Error retrieving secret:", error);
  } finally {
    client.destroy();
  }
};
