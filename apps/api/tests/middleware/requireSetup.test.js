import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../../repositories/userRepository.js", () => ({
  findById: vi.fn(),
}));

import * as userRepo from "../../repositories/userRepository.js";
import { requireSetup } from "../../middleware/requireSetup.js";

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => vi.clearAllMocks());

describe("requireSetup", () => {
  it("returns 403 when user not found", async () => {
    userRepo.findById.mockResolvedValue(null);
    const req = { user: { uid: "uid-1" } };
    const res = mockRes();
    const next = vi.fn();

    await requireSetup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Setup not complete" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when setupComplete is false", async () => {
    userRepo.findById.mockResolvedValue({ setupComplete: false });
    const req = { user: { uid: "uid-1" } };
    const res = mockRes();
    const next = vi.fn();

    await requireSetup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next when setupComplete is true", async () => {
    userRepo.findById.mockResolvedValue({ setupComplete: true });
    const req = { user: { uid: "uid-1" } };
    const res = mockRes();
    const next = vi.fn();

    await requireSetup(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
