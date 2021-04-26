const ENV = process.env.NODE_ENV || "development";

const devData = require("./dev-data/index");
const testData = require("./test-data/index");

const data = {
  test: testData,
  development: devData,
  production: devData,
};

module.exports = data.test;
