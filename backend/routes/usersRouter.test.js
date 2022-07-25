const request = require("supertest");
const server = require("../server");

describe("POST /users", () => {
  describe("login to user account", () => {
    jest.setTimeout(30000);

    //login to user account with correct email and password
    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/users/login").send({
        email: "admin@mail.com",
        password: "pass",
      });
      expect(response.statusCode).toBe(200);
    });

    //login to user account with an invalid email
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/users/login").send({
        email: "admin",
        password: "pass",
      });
      expect(response.statusCode).toBe(400);
    });

    //login to user account with an incorrect password
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/users/login").send({
        email: "admin@mail.com",
        password: "admin",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("POST /users", () => {
  describe("add user details", () => {
    jest.setTimeout(30000);

    //sending a reuqets without access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/users").send({
        email: "admin@mail.com",
        password: "pass",
        accountType: "admin",
      });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets with access token
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .post("/users")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send({
          email: "admin@mail.com",
          password: "pass",
          accountType: "admin",
        });
      expect(response.statusCode).toBe(200);
    });

    //sending a reuqets without email
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/users")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send({
          password: "pass",
          accountType: "admin",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without password
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/users")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send({
          email: "admin@mail.com",
          accountType: "admin",
        });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets without account type
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .post("/users")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send({
          email: "admin@mail.com",
          password: "pass",
        });
      expect(response.statusCode).toBe(400);
    });
  });
});

describe("PUT /users", () => {
  describe("update user details", () => {
    jest.setTimeout(30000);

    //sending a reuqets without access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server).put("/users").send({
        id: 999,
        firstName: "Anjula",
        lastName: "Jayasinghe",
        email: "admin@mail.com",
        dateOfBirth: "22-02-1999",
        password: "pass",
        mobile: 772665133,
      });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets with access token
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .put("/users")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send({
          id: 999,
          firstName: "Anjula",
          lastName: "Jayasinghe",
          email: "admin@mail.com",
          dateOfBirth: "22-02-1999",
          password: "pass",
          mobile: 772665133,
        });
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /users", () => {
  describe("get all users", () => {
    jest.setTimeout(30000);

    //fetch users
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/users?keyword=&limit=5&page=0")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send();
      expect(response.statusCode).toBe(200);
    });

    //fetch users without token
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/users?keyword=&limit=5&page=0")
        .send();
      expect(response.statusCode).toBe(400);
    });

    //fetch users with missing parameters
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/users?&limit=5&page=0")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send();
      expect(response.statusCode).toBe(400);
    });
  });
});
