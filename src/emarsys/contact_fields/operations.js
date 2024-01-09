const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { exec } = require("child_process");

const current_directory = path.resolve(__dirname);
const BASE_API = "https://api.emarsys.net/api/v2/field";

async function sendRequest(api, options, payloadContent) {
  try {
    const response = await axios({
      url: api,
      method: options.method,
      headers: options.headers,
      data: payloadContent,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

exports.create = async function (filename, token) {
  const file = path.resolve(current_directory, filename);
  const payloadContent = fs.readFileSync(file, "utf8");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WSSE": token,
    },
  };

  try {
    const response = await sendRequest(BASE_API, options, payloadContent);
    if (response.replyCode === 0) {
      return response.data;
    } else {
      console.error(response.data);
      process.exit(1);
    }
  } catch (error) {
    console.error(error.message, error.response.data);
    process.exit(1);
  }
};

exports.remove = async function (filename, token) {
  const simpleGit = require("simple-git");
  const git = simpleGit();
  const commitSHA = exec("git rev-parse origin/main").toString().trim();
  const payloadContent = await git.show([`${commitSHA}:${filename}`]);
  console.log("DELETED FILE CONFIG", payloadContent);
  const api = `${BASE_API}/${JSON.parse(payloadContent).id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-WSSE": token,
    },
  };

  try {
    const response = await sendRequest(api, options, null);
    return response;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
