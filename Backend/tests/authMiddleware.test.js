const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware/authMiddleware");

process.env.JWT_SECRET = "test-secret";

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("authMiddleware", () => {
  test("returns 401 when there is no token", () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 for a garbage token", () => {
    const req = { headers: { authorization: "not-a-real-token" } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 for a token signed with the wrong secret", () => {
    const token = jwt.sign({ id: "u1" }, "some-other-secret");
    const req = { headers: { authorization: token } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 for an expired token", () => {
    const token = jwt.sign({ id: "u1" }, "test-secret", { expiresIn: -10 });
    const req = { headers: { authorization: token } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next and sets req.userId for a valid token", () => {
    const token = jwt.sign({ id: "user123" }, "test-secret", { expiresIn: "1h" });
    const req = { headers: { authorization: token } };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.userId).toBe("user123");
  });
});