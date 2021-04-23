// process.env.NODE_ENV = "test";
const mongoose = require("mongoose");

const app = require("../app");
const db = require("../database/db-connection");
const request = require("supertest");
const { seedFunction } = require("../database/seed");
const { beforeEach, expect } = require("@jest/globals");

beforeEach((done) => {
  seedFunction().then(() => {
    done();
  });
});

afterAll(() => {
  mongoose.disconnect();
});

describe("users", () => {
  describe("GET /api/users", () => {
    test("should return all 5 users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body.length).toEqual(5);
        });
    });
    test("each object should match expected schema", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          body.forEach((user) => {
            expect(user).toMatchObject({
              blurbles: expect.any(Number),
              badge: expect.any(Array),
              _id: expect.any(Number),
              username: expect.any(String),
              name: expect.any(String),
              isOver18: expect.any(Boolean),
              email: expect.any(String),
              clubs: expect.any(Array),
              __v: expect.any(Number),
              created_at: expect.any(String),
              updatedAt: expect.any(String)
            });
          });
        });
    });
    test("first user should match User 1 object", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toMatchObject({
            blurbles: 0,
            badge: [],
            _id: 1,
            username: "username 1",
            name: "user 1",
            isOver18: false,
            email: "email 1",
            clubs: [],
            __v: 0,
            created_at: expect.any(String),
            updatedAt: expect.any(String)
          });
        });
    });
  });
  describe("GET api/users/_id=:_id", () => {
    test("should return user 1 when given parameter of 1", () => {
      return request(app)
        .get("/api/users/_id=1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            blurbles: 0,
            badge: [],
            _id: 1,
            username: "username 1",
            name: "user 1",
            isOver18: false,
            email: "email 1",
            clubs: [],
            __v: 0,
            created_at: expect.any(String),
            updatedAt: expect.any(String)
          });
        });
    });
    test("should return 404 when given valid but non-existent _id", () => {
      return request(app)
        .get("/api/users/_id=6")
        .expect(404)
        .then((res) => {
          console.log(res.body);
        });
    });
  });
  describe("PATCH api/users/_id=:_id", () => {
    test("should return 201 when PATCH successful", () => {
      return request(app)
        .patch("/api/users/_id=1")
        .send({ blurblesInc: 10 })
        .expect(201)
        .then(({ body }) => {
          expect(body.blurbles).toBe(10);
        });
    });
  });
  describe("GET api/users/username=:username", () => {
    test("should return user 1 when given parameter of user 1", () => {
      return request(app)
        .get("/api/users/username=username%201")
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            blurbles: 0,
            badge: [],
            _id: 1,
            username: "username 1",
            name: "user 1",
            isOver18: false,
            email: "email 1",
            clubs: [],
            __v: 0,
            created_at: expect.any(String),
            updatedAt: expect.any(String)
          });
        });
    });
  });
});
