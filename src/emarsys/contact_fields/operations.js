const path = require("path");
const fs = require("fs");
const axios = require("axios");

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
  const current_directory = path.resolve(__dirname);
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
    return response.replyCode === 0 ? response.data : response;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

exports.delete = async function (id, token) {
  const api = `${BASE_API}/${id}`;
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
    // throw error;
  }
};
