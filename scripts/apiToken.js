const crypto = require("crypto");

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

exports.apiToken = function (filename, username, secret) {
  if (filename.includes("emarsys")) {
    const token = emarsys_token(username, secret);
    console.log(token);
    return token;
  }
};
