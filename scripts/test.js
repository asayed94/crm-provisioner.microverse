const jsonObject = {
  key: "value",
  nested: {
    innerKey: "innerValue",
  },
};
const jsonString = JSON.stringify(jsonObject);

console.log(jsonString);
