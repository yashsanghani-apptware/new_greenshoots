import mongoose from "mongoose";
import { Request, Response } from "express";
import Cabinet from "../../models/cabinet";
import File from "../../models/file"; // Assuming you have a File model
import { deleteCabinet } from "../../controllers/cabinetController";
import { translate } from "../../utils/i18n";

describe("deleteCabinet function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: { cabinet_id: new mongoose.Types.ObjectId().toString() },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a cabinet if the id is valid", async () => {
    const file = {
      _id: new mongoose.Types.ObjectId().toString(),
    };
    const cabinet = {
      _id: req.params!.cabinet_id,
      files: [file],
      populate: jest.fn().mockResolvedValue({ files: [file] }), // Mocking populate
    };

    jest.spyOn(Cabinet, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValue(cabinet),
    } as any);

    jest.spyOn(Cabinet, "findByIdAndUpdate").mockResolvedValue(cabinet as any);
    jest.spyOn(File, "findByIdAndUpdate").mockResolvedValue({} as any);

    await deleteCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("CABINET_DELETED"),
    });
  });

  it("should return 404 if the cabinet is not found", async () => {
    req = {
      params: { cabinet_id: "669e0ba5722864f59aeaf44p" },
    };
    await deleteCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("CABINET_NOT_FOUND"),
    });
  });

  it("should return 400 if the cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalidId";

    await deleteCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_CABINET_ID"),
    });
  });

  it("should return 500 if there is an error deleting the cabinet", async () => {
    jest.spyOn(Cabinet, "findById").mockReturnValue({
      populate: jest.fn().mockRejectedValueOnce(new Error("Delete error")),
    } as any);

    await deleteCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ERROR_DELETING_CABINET"),
      error: "Delete error",
    });
  });
});
