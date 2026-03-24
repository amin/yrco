import { vi, describe, it, expect, beforeEach } from "vitest";
import { notFound, errorHandler } from "../middleware/errorHandler.js";

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => vi.clearAllMocks());

describe("notFound", () => {
  it("returns 404 with error message", () => {
    const res = mockRes();
    notFound({}, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Not found" });
  });
});

describe("errorHandler", () => {
  it("returns known error status and message when err has status", () => {
    const res = mockRes();
    const err = { status: 400, message: "Bad request" };
    errorHandler(err, {}, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Bad request" });
  });

  it("returns 404 for not-found errors", () => {
    const res = mockRes();
    const err = { status: 404, message: "User not found" };
    errorHandler(err, {}, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("returns generic 500 for unexpected errors and does not leak message", () => {
    const res = mockRes();
    const err = new Error("database connection string: secret@host");
    vi.spyOn(console, "error").mockImplementation(() => {});

    errorHandler(err, {}, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(console.error).toHaveBeenCalledWith(err);

    console.error.mockRestore();
  });

  it("logs unexpected errors to console", () => {
    const res = mockRes();
    const err = new Error("something broke");
    vi.spyOn(console, "error").mockImplementation(() => {});

    errorHandler(err, {}, res, vi.fn());

    expect(console.error).toHaveBeenCalledWith(err);
    console.error.mockRestore();
  });

  it("does not log known errors", () => {
    const res = mockRes();
    vi.spyOn(console, "error").mockImplementation(() => {});

    errorHandler({ status: 400, message: "Bad" }, {}, res, vi.fn());

    expect(console.error).not.toHaveBeenCalled();
    console.error.mockRestore();
  });
});
