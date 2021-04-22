process.env.NODE_ENV = "test";

const app = require("../app");
const db = require("../database/db-connection");
const request = require("supertest");
const { seedDb } = require("../database/seed");

beforeEach(() => {
  seedDb();
});

afterAll(() => {
  db.close();
});

describe("Name of the group", () => {
  test("should ", () => {
    console.log("testing");
  });
});
