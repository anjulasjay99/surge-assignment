const request = require("supertest");
const server = require("../server");

describe("POST /notes", () => {
  describe("add notes", () => {
    jest.setTimeout(30000);

    //sending a reuqets without access token
    test("should respond with a 400 status code", async () => {
      const response = await request(server).post("/notes").send({
        userId: 999,
        title: "my note",
        description: "Hello World",
      });
      expect(response.statusCode).toBe(400);
    });

    //sending a reuqets with access token
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .post("/notes")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send({
          userId: 999,
          title: "my note",
          description: "Hello World",
        });
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /notes", () => {
  describe("get all notes", () => {
    jest.setTimeout(30000);

    //fetch notes
    test("should respond with a 200 status code", async () => {
      const response = await request(server)
        .get("/notes/999?title=&limit=5&page=0")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send();
      expect(response.statusCode).toBe(200);
    });

    //fetch notes without token
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/notes/999?title=&limit=5&page=0")
        .send();
      expect(response.statusCode).toBe(400);
    });

    //fetch notes with missing parameters
    test("should respond with a 400 status code", async () => {
      const response = await request(server)
        .get("/notes/999?&limit=5&page=0")
        .set({
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5LCJlbWFpbCI6ImFuanVsYXNqYXkiLCJpYXQiOjE2NTg1NjQzMjB9.ug4cZF3GRbT1Z8Ali-TCvf71sTfpv__G7CEd305cLwI",
        })
        .send();
      expect(response.statusCode).toBe(400);
    });
  });
});
