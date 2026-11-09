const request = require("supertest");
const app = require("../app");

describe("GET /health", () => {
  test("returns 200 and status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ status: "ok" });
  });
});