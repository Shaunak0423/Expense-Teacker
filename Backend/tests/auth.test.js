const request = require("supertest");
const app = require("../app");

describe("POST /api/auth/signup validation", () => {
  test("rejects a request with no body fields", async () => {
    const res = await request(app).post("/api/auth/signup").send({});

    expect(res.statusCode).toBe(400);
  });

  test("rejects a request with no password", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ name: "Asha", email: "asha@test.com" });

    expect(res.statusCode).toBe(400);
  });
});

describe("protected routes", () => {
  test("GET /api/expense without a token returns 401", async () => {
    const res = await request(app).get("/api/expense");

    expect(res.statusCode).toBe(401);
  });
});