import { vi, describe, it, expect } from "vitest";
import { requireSetup } from "../../middleware/requireSetup.js";

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("requireSetup", () => {
  it("returns 403 when setupComplete is missing (user not in DB)", async () => {
    const req = { user: { uid: "uid-1" } };
    const res = mockRes();
    const next = vi.fn();

    await requireSetup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Setup not complete" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when setupComplete is false", async () => {
    const req = { user: { uid: "uid-1", setupComplete: false } };
    const res = mockRes();
    const next = vi.fn();

    await requireSetup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when setupComplete is true", async () => {
    const req = { user: { uid: "uid-1", setupComplete: true } };
    const res = mockRes();
    const next = vi.fn();

    await requireSetup(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
