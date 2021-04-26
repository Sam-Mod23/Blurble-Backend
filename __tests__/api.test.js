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

describe("/", () => {
  it("status: 404 - given an invalid endpoint", () => {
    return request(app).get("/bananas").expect(404);
  });
});

describe("/api", () => {
  describe("GET all endpoints", () => {
    test("status: 200 - GET all endpoints on API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
          expect(Object.keys(res.body.endpoints).length > 0).toBe(true);
        });
    });
    test("status: 405 - Method not allowed for invalid methods", () => {
      return request(app)
        .delete("/api")
        .expect(405)
        .then((res) => {
          expect(res.body.msg).toEqual("Method not allowed");
        });
    });
  });
  describe("Users", () => {
    describe("/api/users", () => {
      describe("GET /api/users", () => {
        test("should return all 5 users", () => {
          return request(app)
            .get("/api/users")
            .expect(200)
            .then((res) => {
              expect(res.body.users.length).toEqual(5);
            });
        });
        test("each object should match expected schema", () => {
          return request(app)
            .get("/api/users")
            .expect(200)
            .then(({ body }) => {
              body.users.forEach((user) => {
                expect(user).toMatchObject({
                  blurbles: expect.any(Number),
                  badges: expect.any(Array),
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
              expect(body.users[0]).toMatchObject({
                blurbles: 0,
                badges: [],
                _id: 1,
                username: "username 1",
                name: "user 1",
                isOver18: false,
                email: "email 1",
                clubs: [{ club_id: 1, progress: 0 }],
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String)
              });
            });
        });
        test("status 405 - DELETE not allowed", () => {
          return request(app)
            .delete("/api/users")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toEqual("Method not allowed");
            });
        });
      });
      describe("POST api/users", () => {
        test("should add a new user", () => {
          return request(app)
            .post("/api/users")
            .send({
              username: "username 6",
              name: "user 6",
              isOver18: false,
              email: "email 6",
              _id: 6
            })
            .expect(201)
            .then((res) => {
              expect(res.body).toMatchObject({
                blurbles: 0,
                badges: [],
                _id: 6,
                username: "username 6",
                name: "user 6",
                isOver18: false,
                email: "email 6",
                clubs: [{ club_id: 1, progress: 0 }],
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String)
              });
            });
        });
        test("should reject a new user with a duplicate username", () => {
          return request(app)
            .post("/api/users")
            .send({
              username: "username 5",
              name: "user 5",
              isOver18: false,
              email: "email new",
              _id: 6
            })
            .expect(409)
            .then((res) => {
              expect(res.body.msg).toEqual("User already exists");
            });
        });
        test("should reject a new user with a duplicate _id", () => {
          return request(app)
            .post("/api/users")
            .send({
              username: "username new",
              name: "user 5",
              isOver18: false,
              email: "email new",
              _id: 5
            })
            .expect(409)
            .then((res) => {
              expect(res.body.msg).toEqual("User already exists");
            });
        });
        test("should reject a new user with a duplicate email", () => {
          return request(app)
            .post("/api/users")
            .send({
              username: "username new",
              name: "user 5",
              isOver18: false,
              email: "email 5",
              _id: 6
            })
            .expect(409)
            .then((res) => {
              expect(res.body.msg).toEqual("User already exists");
            });
        });
        test("should only include valid props in new user", () => {
          return request(app)
            .post("/api/users")
            .send({
              username: "username 6",
              name: "user 6",
              isOver18: false,
              email: "email 6",
              _id: 6,
              invalid_prop: "This is invalid"
            })
            .expect(201)
            .then((res) => {
              expect(res.body).toEqual({
                blurbles: 0,
                badges: [],
                clubs: [{ club_id: 1, progress: 0, hasNominated: false }],
                username: "username 6",
                name: "user 6",
                isOver18: false,
                email: "email 6",
                _id: 6,
                created_at: expect.any(String),
                updatedAt: expect.any(String),
                __v: 0
              });
            });
        });
        test("status: 400 - POST request does not contain required keys", () => {
          return request(app)
            .post("/api/users")
            .send({ username: "username 6" })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toEqual("Required information not provided");
            });
        });
      });
      describe("Invalid methods", () => {
        test("status 405 - Method not allowed for invalid methods", () => {
          return request(app)
            .delete("/api/users")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toEqual("Method not allowed");
            });
        });
      });
    });
    describe("api/users/_id=:_id", () => {
      describe("GET api/users/_id=:_id", () => {
        test("should return user 1 when given parameter of 1", () => {
          return request(app)
            .get("/api/users/_id=1")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).toMatchObject({
                blurbles: 0,
                badges: [],
                _id: 1,
                username: "username 1",
                name: "user 1",
                isOver18: false,
                email: "email 1",
                clubs: [{ club_id: 1, progress: 0 }],
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
              expect(res.body.msg).toEqual("Not found");
            });
        });
      });
      describe("PATCH api/users/_id=:_id", () => {
        test("should return 201 when PATCH successful and increment blurbles", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ blurblesInc: 10 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.blurbles).toBe(10);
            });
        });
        test("should return 201 when PATCH successful and add new club to user's club array", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ club_id: 2 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: 1, progress: 0, hasNominated: false },
                { club_id: 2, progress: 0, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update user's progress of specific club_id", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ club_id: 1, progress: 100 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: 1, progress: 100, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update the hasNominated Boolean in a users clubs", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ club_id: 1, hasNominated: true })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: 1, progress: 0, hasNominated: true }
              ]);
            });
        });
        test("should return 201 when PATCH successful and add additional badges to users badge array", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ newBadge: "badge name example" })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.badges).toEqual(["badge name example"]);
            });
        });
        test("should return 201 when PATCH successful and club removed from users club array", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ clubToRemove: 1 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([]);
            });
        });
      });
      describe("DELETE api/users/_id=:_id", () => {
        test("should return 204 for successful deletion of user for _id", () => {
          return request(app)
            .delete("/api/users/_id=1")
            .expect(204)
            .then(() => {
              return request(app)
                .get("/api/users")
                .expect(200)
                .then((res) => {
                  expect(res.body.users.length).toEqual(4);
                });
            });
        });
      });
      describe("Invalid methods", () => {
        test("status 405 - Method not allowed for invalid methods", () => {
          return request(app)
            .put("/api/users/_id=6")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toEqual("Method not allowed");
            });
        });
      });
    });
    describe("api/users/username=:username", () => {
      describe("GET api/users/username=:username", () => {
        test("should return user 1 when given parameter of user 1", () => {
          return request(app)
            .get("/api/users/username=username%201")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).toMatchObject({
                blurbles: 0,
                badges: [],
                _id: 1,
                username: "username 1",
                name: "user 1",
                isOver18: false,
                email: "email 1",
                clubs: [{ club_id: 1, progress: 0 }],
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String)
              });
            });
        });
        test("should return 404 when given valid but non-existent username", () => {
          return request(app)
            .get("/api/users/username=6")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toEqual("Not found");
            });
        });
      });
      describe("PATCH api/users/username=:username", () => {
        test("should return 201 when PATCH successful and increment blurbles", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ blurblesInc: 10 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.blurbles).toBe(10);
            });
        });
        test("should return 201 when PATCH successful and add new club to user's club array", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ club_id: 2 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: 1, progress: 0, hasNominated: false },
                { club_id: 2, progress: 0, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update user's progress of specific club_id", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ club_id: 1, progress: 100 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: 1, progress: 100, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update the hasNominated Boolean in a users clubs", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ club_id: 1, hasNominated: true })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: 1, progress: 0, hasNominated: true }
              ]);
            });
        });
        test("should return 201 when PATCH successful and add additional badges to users badge array", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ newBadge: "badge name example" })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.badges).toEqual(["badge name example"]);
            });
        });
        test("should return 201 when PATCH successful and club removed from users club array", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ clubToRemove: 1 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([]);
            });
        });
      });
      describe("DELETE api/users/username=:username", () => {
        test("should return 204 for successful deletion of user for username", () => {
          return request(app)
            .delete("/api/users/username=username%201")
            .expect(204)
            .then(() => {
              return request(app)
                .get("/api/users")
                .expect(200)
                .then((res) => {
                  expect(res.body.users.length).toEqual(4);
                });
            });
        });
      });
      describe("Invalid methods", () => {
        test("status 405 - Method not allowed for invalid methods", () => {
          return request(app)
            .put("/api/users/_id=6")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toEqual("Method not allowed");
            });
        });
      });
    });
  });
});
