import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../repositories/sessionRepository.js", () => ({
  findByToken: vi.fn(),
}));

import * as sessionRepo from "../../repositories/sessionRepository.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => vi.clearAllMocks());

describe("requireAuth", () => {
  it("returns 401 when session cookie is missing", async () => {
    const req = { signedCookies: {} };
    const res = mockRes();
    const next = vi.fn();

    await requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when session cookie is undefined", async () => {
    const req = { signedCookies: { session: undefined } };
    const res = mockRes();
    const next = vi.fn();

    await requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when signed cookie is false (tampered)", async () => {
    const req = { signedCookies: { session: false } };
    const res = mockRes();
    const next = vi.fn();

    await requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when token is not found in the session store", async () => {
    sessionRepo.findByToken.mockResolvedValue(null);
    const req = { signedCookies: { session: "unknown-token" } };
    const res = mockRes();
    const next = vi.fn();

    await requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("sets req.user from the session record and calls next when token is valid", async () => {
    sessionRepo.findByToken.mockResolvedValue({ token: "tok-abc", uid: "uid-123" });
    const req = { signedCookies: { session: "tok-abc" } };
    const res = mockRes();
    const next = vi.fn();

    await requireAuth(req, res, next);

    expect(req.user).toEqual({ uid: "uid-123" });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
