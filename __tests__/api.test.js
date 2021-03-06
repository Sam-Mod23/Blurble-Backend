process.env.NODE_ENV = "test";

const mongoose = require("mongoose");

const app = require("../app");
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
  test("status: 404 - given an invalid endpoint", () => {
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
        test("should return all users", () => {
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
                  _id: expect.any(String),
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
                _id: "1",
                username: "username 1",
                name: "user 1",
                isOver18: false,
                email: "email 1",
                clubs: [{ club_id: "1", progress: 0 }],
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
              _id: "6"
            })
            .expect(201)
            .then((res) => {
              expect(res.body).toMatchObject({
                blurbles: 0,
                badges: [],
                _id: "6",
                username: "username 6",
                name: "user 6",
                isOver18: false,
                email: "email 6",
                clubs: [{ club_id: "1", progress: 0 }],
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
              _id: "6"
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
              _id: "5"
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
              _id: " 6"
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
              _id: "6",
              invalid_prop: "This is invalid"
            })
            .expect(201)
            .then((res) => {
              expect(res.body).toEqual({
                blurbles: 0,
                badges: [],
                clubs: [{ club_id: "1", progress: 0, hasNominated: false }],
                username: "username 6",
                name: "user 6",
                isOver18: false,
                email: "email 6",
                _id: "6",
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
                _id: "1",
                username: "username 1",
                name: "user 1",
                isOver18: false,
                email: "email 1",
                clubs: [{ club_id: "1", progress: 0 }],
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
            .send({ club_id: "2" })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: "1", progress: 0, hasNominated: false },
                { club_id: "2", progress: 0, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update user's progress of specific club_id", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ club_id: "1", progress: 100 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: "1", progress: 100, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update the hasNominated Boolean in a users clubs", () => {
          return request(app)
            .patch("/api/users/_id=1")
            .send({ club_id: "1", hasNominated: "yes" })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: "1", progress: 0, hasNominated: true }
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
            .send({ clubToRemove: "1" })
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
                _id: "1",
                username: "username 1",
                name: "user 1",
                isOver18: false,
                email: "email 1",
                clubs: [{ club_id: "1", progress: 0 }],
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
            .send({ club_id: "2" })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: "1", progress: 0, hasNominated: false },
                { club_id: "2", progress: 0, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update user's progress of specific club_id", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ club_id: "1", progress: 100 })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: "1", progress: 100, hasNominated: false }
              ]);
            });
        });
        test("should return 201 when PATCH successful and update the hasNominated Boolean in a users clubs", () => {
          return request(app)
            .patch("/api/users/username=username%201")
            .send({ club_id: "1", hasNominated: "yes" })
            .expect(201)
            .then(({ body }) => {
              expect(body.user.clubs).toEqual([
                { club_id: "1", progress: 0, hasNominated: true }
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
            .send({ clubToRemove: "1" })
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

  describe("Comments", () => {
    describe("api/comments/_id=:_id", () => {
      describe("GET api/comments/_id=:_id", () => {
        test("should return expected comment when called with _id=1", () => {
          return request(app)
            .get("/api/comments/_id=1")
            .expect(200)
            .then((res) => {
              expect(res.body.comments[0]).toMatchObject({
                user_id: "1",

                body: "Test Comment",
                club_id: "1",
                clubName: "Test 1",
                book: "book",
                progress: 1,
                _id: "1"
              });
            });
        });
        test("should return 404 when called with valid but non-existent _id", () => {
          return request(app)
            .get("/api/comments/_id=9999")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toEqual("Not found");
            });
        });
      });
      describe("PATCH api/comments/_id=:_id", () => {
        test("should return 201 and comments object with votes increased", () => {
          return request(app)
            .patch("/api/comments/_id=1")
            .send({ voteInc: 1 })
            .expect(201)
            .then((res) => {
              expect(res.body.comment).toMatchObject({
                user_id: "1",
                body: "Test Comment",
                club_id: "1",
                clubName: "Test 1",
                book: "book",
                progress: 1,
                _id: "1",
                votes: 1
              });
            });
        });
      });
      describe("DELETE api/comments/_id=:id", () => {
        test("should return 204 for successful deletion of comment", () => {
          return request(app)
            .delete("/api/comments/_id=1")
            .expect(204)
            .then(() => {
              return request(app)
                .get("/api/comments/club_id=1")
                .then((res) => expect(res.body.comments.length).toBe(3));
            });
        });
      });
    });

    describe("api/comments/club_id=:club_id", () => {
      describe("GET api/comments/club_id=:club_id", () => {
        test("should return 4 comments belonging to club_id 1, all matching the schema and sorted by progress", () => {
          return request(app)
            .get("/api/comments/club_id=1")
            .expect(200)
            .then((res) => {
              expect(res.body.comments.length).toBe(4);
              expect(res.body.comments).toBeSortedBy("progress", {
                ascending: true
              });
              res.body.comments.forEach((comment) => {
                expect(comment).toMatchObject({
                  user_id: expect.any(String),
                  body: expect.any(String),
                  club_id: expect.any(String),
                  clubName: expect.any(String),
                  book: expect.any(String),
                  progress: expect.any(Number),
                  _id: expect.any(String)
                });
              });
            });
        });
        test("first object should match comment 1 object", () => {
          return request(app)
            .get("/api/comments/club_id=1")
            .expect(200)
            .then((res) => {
              expect(res.body.comments[0]).toMatchObject({
                user_id: expect.any(String),
                body: expect.any(String),
                club_id: expect.any(String),
                clubName: expect.any(String),
                book: expect.any(String),
                progress: expect.any(Number),
                _id: expect.any(String)
              });
            });
        });
        test("should take a query to limit the comments to users current progress", () => {
          return request(app)
            .get("/api/comments/club_id=1?progress=3")
            .expect(200)
            .then((res) => {
              expect(res.body.comments.length).toBe(2);
            });
        });
        test("should take a query to change sort order", () => {
          return request(app)
            .get("/api/comments/club_id=1?orderBy=desc")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeSortedBy("progress", {
                descending: true
              });
            });
        });
        test("should return 404 when given a valid but non-existent club_id", () => {
          return request(app)
            .get("/api/comments/club_id=30")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toEqual("Not found");
            });
        });
      });
      describe("POST api/comments/club_id=:_id", () => {
        test("should be able to POST a comment to club_id endpoint", () => {
          return request(app)
            .post("/api/comments/club_id=1")
            .send({
              username: "Test 1",
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100
            })
            .expect(201)
            .then((res) => {
              expect(res.body.comment).toMatchObject({
                user_id: "1",
                body: "testBody",
                club_id: "1",
                clubName: "Blurble Club",
                book: "testBook",
                progress: 100,
                votes: 0,
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String),
                _id: expect.any(String)
              });
            });
        });
        test("should reject POST to club which doesnt exist and return 404", () => {
          return request(app)
            .post("/api/comments/club_id=9999")
            .send({
              username: "Test 1",
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100
            })
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("Not found");
            });
        });
        test("should only allow valid props when posting comment", () => {
          return request(app)
            .post("/api/comments/club_id=1")
            .send({
              username: "Test 1",
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100,
              notAProp: "not a prop"
            })
            .expect(201)
            .then((res) => {
              expect(res.body.comment).toMatchObject({
                user_id: "1",
                body: "testBody",
                club_id: "1",
                clubName: "Blurble Club",
                book: "testBook",
                progress: 100,
                votes: 0,
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String),
                _id: expect.any(String)
              });
              expect(res.body.notAProp).toEqual(undefined);
            });
        });
        test("should reject POST request which does not contain required keys", () => {
          return request(app)
            .post("/api/comments/club_id=1")
            .send({ body: "test" })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toEqual("Bad request");
            });
        });
        test("should reject POST request when user is not a member of the club", () => {
          return request(app)
            .post("/api/comments/club_id=2")
            .send({
              username: "Test 1",
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100
            })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Bad request");
            });
        });
      });
      describe("DELETE not allowed", () => {
        test("status 405 - DELETE not allowed", () => {
          return request(app)
            .delete("/api/comments/club_id=1")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toEqual("Method not allowed");
            });
        });
      });
    });

    describe("api/comments/clubName=:clubName", () => {
      describe("GET api/comments/clubName=:clubName", () => {
        test("should return 4 comments belonging to Test 1, all matching the schema and sorted by progress", () => {
          return request(app)
            .get("/api/comments/clubName=Test%201")
            .expect(200)
            .then((res) => {
              expect(res.body.comments.length).toBe(4);
              expect(res.body.comments).toBeSortedBy("progress", {
                ascending: true
              });
              res.body.comments.forEach((comment) => {
                expect(comment).toMatchObject({
                  user_id: expect.any(String),

                  body: expect.any(String),
                  club_id: expect.any(String),
                  clubName: expect.any(String),
                  book: expect.any(String),
                  progress: expect.any(Number),
                  _id: expect.any(String)
                });
              });
            });
        });
        test("first object should match comment 1 object", () => {
          return request(app)
            .get("/api/comments/clubName=Test%201")
            .expect(200)
            .then((res) => {
              expect(res.body.comments[0]).toMatchObject({
                user_id: expect.any(String),
                body: expect.any(String),
                club_id: expect.any(String),
                clubName: expect.any(String),
                book: expect.any(String),
                progress: expect.any(Number),
                _id: expect.any(String)
              });
            });
        });
        test("should take a query to limit the comments to users current progress", () => {
          return request(app)
            .get("/api/comments/clubName=Test%201?progress=3")
            .expect(200)
            .then((res) => {
              expect(res.body.comments.length).toBe(2);
            });
        });
        test("should take a query to change sort order", () => {
          return request(app)
            .get("/api/comments/clubName=Test%201?orderBy=desc")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeSortedBy("progress", {
                descending: true
              });
            });
        });
        test("should return 404 when given a valid but non-existent clubName", () => {
          return request(app)
            .get("/api/comments/clubName=not_a_club")
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toEqual("Not found");
            });
        });
      });
      describe("POST api/comments/clubName=:clubName", () => {
        test("should be able to POST a comment to clubName endpoint", () => {
          return request(app)
            .post("/api/comments/clubName=Blurble%20Club")
            .send({
              username: "Test 1",
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100
            })
            .expect(201)
            .then((res) => {
              expect(res.body.comment).toMatchObject({
                user_id: "1",
                body: "testBody",
                club_id: "1",
                clubName: "Blurble Club",
                book: "testBook",
                progress: 100,
                votes: 0,
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String),
                _id: expect.any(String)
              });
            });
        });
        test("should reject POST to club which doesnt exist and return 404", () => {
          return request(app)
            .post("/api/comments/clubName=NotAClub")
            .send({
              username: "testUser",
              body: "testBody",
              book: "testBook",
              progress: 100
            })
            .expect(404)
            .then((res) => {
              expect(res.body.msg).toBe("Not found");
            });
        });
        test("should only allow valid props when posting comment", () => {
          return request(app)
            .post("/api/comments/club_id=1")
            .send({
              username: "Test 1",
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100,
              notAProp: "not a prop"
            })
            .expect(201)
            .then((res) => {
              expect(res.body.comment).toMatchObject({
                user_id: "1",
                body: "testBody",
                club_id: "1",
                clubName: "Blurble Club",
                book: "testBook",
                progress: 100,
                votes: 0,
                __v: 0,
                created_at: expect.any(String),
                updatedAt: expect.any(String),
                _id: expect.any(String)
              });
              expect(res.body.notAProp).toEqual(undefined);
            });
        });
        test("should reject POST request which does not contain required keys", () => {
          return request(app)
            .post("/api/comments/clubName=Blurble%20Club")
            .send({ body: "test" })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toEqual("Bad request");
            });
        });
        test("should reject POST request when user is not a member of the club", () => {
          return request(app)
            .post("/api/comments/clubName=Blurble%20Club%202")
            .send({
              user_id: "1",
              body: "testBody",
              book: "testBook",
              progress: 100
            })
            .expect(400)
            .then((res) => {
              expect(res.body.msg).toBe("Bad request");
            });
        });
      });
      describe("DELETE not allowed", () => {
        test("status 405 - DELETE not allowed", () => {
          return request(app)
            .delete("/api/comments/clubName=Blurble%20Club")
            .expect(405)
            .then((res) => {
              expect(res.body.msg).toEqual("Method not allowed");
            });
        });
      });
    });
  });
  describe("Clubs", () => {
    describe("GET api/clubs", () => {
      test("status: 200 - should return all clubs", () => {
        return request(app)
          .get("/api/clubs")
          .expect(200)
          .then((res) => {
            expect(res.body.clubs.length).toEqual(4);
          });
      });
      test("each object should match expected schema", () => {
        return request(app)
          .get("/api/clubs")
          .expect(200)
          .then(({ body }) => {
            body.clubs.forEach((club) => {
              expect(club).toMatchObject({
                nominatedBooks: expect.any(Array),
                memberIds: expect.any(Array),
                adminIds: expect.any(Array),
                comments: expect.any(Array),
                archivedBooks: expect.any(Array),
                _id: expect.any(String),
                clubName: expect.any(String),
                description: expect.any(String),
                currentBook: expect.any(String),
                __v: expect.any(Number),
                created_at: expect.any(String),
                updatedAt: expect.any(String)
              });
            });
          });
      });
      test("first club should match Club 1 object", () => {
        return request(app)
          .get("/api/clubs")
          .expect(200)
          .then(({ body }) => {
            expect(body.clubs[0]).toMatchObject({
              nominatedBooks: expect.any(Array),
              memberIds: ["1", "2", "3"],
              adminIds: ["1"],
              comments: [],
              archivedBooks: [],
              _id: "1",
              clubName: "Blurble Club",
              description: "test",
              currentBook: "test",
              __v: expect.any(Number),
              created_at: expect.any(String),

              updatedAt: expect.any(String)
            });
          });
      });
      test("status 405 - DELETE not allowed", () => {
        return request(app)
          .delete("/api/clubs")
          .expect(405)
          .then((res) => {
            expect(res.body.msg).toEqual("Method not allowed");
          });
      });
    });
    describe("GET api/clubs/_id=:_id", () => {
      test("status: 200 - returns correct club for declared _id", () => {
        return request(app)
          .get("/api/clubs/_id=1")
          .expect(200)
          .then(({ body }) => {
            expect(body.club).toMatchObject({
              nominatedBooks: expect.any(Array),
              memberIds: ["1", "2", "3"],
              adminIds: ["1"],
              comments: [],
              archivedBooks: [],
              _id: "1",
              clubName: "Blurble Club",
              description: "test",
              currentBook: "test",
              __v: expect.any(Number),
              created_at: expect.any(String),
              updatedAt: expect.any(String)
            });
          });
      });
      test("status: 404 - given valid but non-existent _id", () => {
        return request(app)
          .get("/api/clubs/_id=6")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toEqual("Not found");
          });
      });
    });
    describe("GET api/clubs/clubName=:clubName", () => {
      test("status: 200 - returns correct club for declared clubName", () => {
        return request(app)
          .get("/api/clubs/clubName=Blurble%20Club")
          .expect(200)
          .then(({ body }) => {
            expect(body.club).toMatchObject({
              nominatedBooks: expect.any(Array),
              memberIds: ["1", "2", "3"],
              adminIds: ["1"],
              comments: [],
              archivedBooks: [],
              _id: "1",
              clubName: "Blurble Club",
              description: "test",
              currentBook: "test",
              __v: expect.any(Number),
              created_at: expect.any(String),
              updatedAt: expect.any(String)
            });
          });
      });
      test("status: 404 - given valid but non-existent clubName", () => {
        return request(app)
          .get("/api/clubs/clubName=6")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toEqual("Not found");
          });
      });
    });
    describe("POST api/clubs", () => {
      test("status: 201 - successful post returns new club", () => {
        return request(app)
          .post("/api/clubs")
          .send({
            clubName: "New Club",
            description: "Test",
            currentBook: "www.newClubsBook.com",

            memberIds: ["1"],
            adminIds: ["1"],

            _id: "5"
          })
          .expect(201)
          .then((res) => {
            expect(res.body.club).toMatchObject({
              clubName: "New Club",
              description: "Test",
              currentBook: "www.newClubsBook.com",
              nominatedBooks: expect.any(Array),
              memberIds: ["1"],
              adminIds: ["1"],
              _id: "5",
              comments: [],
              archivedBooks: [],
              created_at: expect.any(String),
              updatedAt: expect.any(String),

              __v: 0
            });
          });
      });
      test("status: 201 - should only include valid props in new club", () => {
        return request(app)
          .post("/api/clubs")
          .send({
            clubName: "New Club",
            description: "Test",
            currentBook: "www.newClubsBook.com",
            memberIds: ["1"],
            adminIds: ["1"],
            _id: "5",
            invalid_prop: "This is invalid"
          })
          .expect(201)
          .then((res) => {
            expect(res.body.club).toMatchObject({
              clubName: "New Club",
              description: "Test",
              currentBook: "www.newClubsBook.com",
              nominatedBooks: expect.any(Array),
              memberIds: ["1"],
              adminIds: ["1"],
              _id: "5",
              comments: [],
              archivedBooks: [],
              created_at: expect.any(String),
              updatedAt: expect.any(String),
              __v: 0
            });
          });
      });
      test("status: 400 - POST request does not contain required keys", () => {
        return request(app)
          .post("/api/clubs")
          .send({ clubName: "New Club" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual("Required information not provided");
          });
      });
    });
    describe("PATCH api/clubs/_id=:_id", () => {
      test("status: 201 - PATCH currentBook changed", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ newBook: "www.newBook.com" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.currentBook).toEqual("www.newBook.com");
          });
      });
      test("status: 201 - PATCH nominatedBook votes incremented", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ selfLink: "1", incVotes: 1, member_id: "1" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.nominatedBooks[0].votes).toEqual(2);
          });
      });
      test('"status: 400 - PATCH unsuccessful if incVotes is not a number"', () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ selfLink: "1", incVotes: "not a number", member_id: "1" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual("Increment must be a number");
          });
      });
      test("status: 201 - PATCH member_id added to votedIds array after vote", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ selfLink: "1", incVotes: 1, member_id: "1" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.nominatedBooks[0].votedIds).toEqual([
              "2",
              "1"
            ]);
          });
      });
      test("status: 201 - PATCH if member_id already in votedIds, votedIds will not update", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ selfLink: "1", incVotes: 1, member_id: "2" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.nominatedBooks[0].votedIds).toEqual(["2"]);
            expect(res.body.club.nominatedBooks[0].votes).toEqual(1);
          });
      });

      test("status: 201 - PATCH nominatedBook added to club", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ selfLink: "www.nominatedBook.com" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.nominatedBooks).toEqual([
              { selfLink: "1", votes: 1, votedIds: ["2"] },
              { selfLink: "2", votes: 2, votedIds: [] },
              { selfLink: "3", votes: 3, votedIds: [] },
              { selfLink: "www.nominatedBook.com", votes: 0, votedIds: [] }
            ]);
          });
      });
      test("status: 201 - PATCH addMember added to clubs memberIds", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ addMember: "user 1" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.memberIds).toEqual(["1", "2", "3", "user 1"]);
          });
      });
      test("status: 201 - PATCH addAdmin added to clubs adminIds", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ addAdmin: "user 1" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.adminIds).toEqual(["1", "user 1"]);
          });
      });
      test("status: 201 - PATCH removeMember removed from club memberIds", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ removeMember: "1" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.memberIds).toEqual(["2", "3"]);
          });
      });
      test("status: 400 - PATCH removeMember unsuccessful if removeMember is not a string", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ removeMember: 1 })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toEqual("Member not found");
          });
      });
      test("status: 201 - PATCH removeAdmin removed from club adminIds", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ removeAdmin: "1" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.adminIds).toEqual([]);
          });
      });
      test("status: 201 - PATCH archivedBooks can be updated", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ bookToArchive: "archivedBook" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.archivedBooks).toEqual(["archivedBook"]);
          });
      });
      test("status: 201 - PATCH archivedBooks updated with current book before current book is replaced", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ archive: true, newBook: "www.newBook2.com" })
          .expect(201)
          .then((res) => {
            expect(res.body.club.archivedBooks).toEqual(["test"]);
          });
      });
      test("status: 201 - PATCH archivedBooks updates members user data to reset progress to 0 and hasNominated to false", () => {
        return request(app)
          .patch("/api/users/_id=1")
          .send({ club_id: "1", progress: 110, hasNominated: "yes" })
          .then(() => {
            return request(app)
              .patch("/api/clubs/_id=1")
              .send({ archive: true, newBook: "www.newBook2.com" })
              .expect(201)
              .then((res) => {
                expect(res.body.club.archivedBooks).toEqual(["test"]);
              });
          })
          .then(() => {
            return request(app)
              .get("/api/users/_id=1")
              .expect(200)
              .then((res) => {
                expect(res.body.user.clubs[0]).toEqual({
                  club_id: "1",
                  progress: 0,
                  hasNominated: false
                });
              });
          });
      });
      test("status: 201 - PATCH will select new book from nominatedBooks when completeVote is indicated", () => {
        return request(app)
          .patch("/api/clubs/_id=1")
          .send({ completeVote: true })
          .expect(201)
          .then((res) => {
            expect(res.body.result.club.currentBook).toEqual("3");
          });
      });
    });
    describe("DELETE api/clubs/_id=:_id", () => {
      test("should return 204 for successful deletion of club for _id", () => {
        return request(app)
          .delete("/api/clubs/_id=1")
          .expect(204)
          .then(() => {
            return request(app)
              .get("/api/clubs")
              .expect(200)
              .then((res) => {
                expect(res.body.clubs.length).toEqual(3);
              });
          });
      });
    });
    describe("DELETE api/clubs/clubName=:clubName", () => {
      test("should return 204 for successful deletion of club for clubName", () => {
        return request(app)
          .delete("/api/clubs/clubName=Blurble%20Club")
          .expect(204)
          .then(() => {
            return request(app)
              .get("/api/clubs")
              .expect(200)
              .then((res) => {
                expect(res.body.clubs.length).toEqual(3);
              });
          });
      });
    });
  });
});
