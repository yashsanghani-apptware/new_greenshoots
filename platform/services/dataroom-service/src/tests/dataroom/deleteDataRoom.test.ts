import mongoose from "mongoose";
import { Request, Response } from "express";
import DataRoom from "../../models/dataRoom";
import Cabinet from "../../models/cabinet";
import File from "../../models/file";
import { deleteDataRoom } from "../../controllers/dataRoomController";

import { translate } from "../../utils/i18n";

describe("deleteDataRoom function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: { dataroom_id: new mongoose.Types.ObjectId().toString() },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a data room if the id is valid", async () => {
    const dataRoom = {
      _id: req.params!.dataroom_id,
      cabinets: [{ _id: new mongoose.Types.ObjectId() }],
    };

    const cabinet = {
      _id: dataRoom.cabinets[0]._id,
      files: [{ _id: new mongoose.Types.ObjectId() }],
    };

    // Mocking the database queries and updates
    jest.spyOn(DataRoom, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValueOnce(dataRoom),
    } as any);

    jest.spyOn(Cabinet, "findById").mockReturnValue({
      populate: jest.fn().mockResolvedValueOnce(cabinet),
    } as any);

    jest.spyOn(File, "findByIdAndUpdate").mockResolvedValue({} as any);
    jest.spyOn(Cabinet, "findByIdAndUpdate").mockResolvedValue({} as any);
    jest
      .spyOn(DataRoom, "findByIdAndUpdate")
      .mockResolvedValue(dataRoom as any);

    await deleteDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("DATA_ROOM_DELETED"),
    });
  });

  it("should return 404 if the data room is not found", async () => {
    req = {
      params: { dataroom_id: "669e0ba5722864f59aeaf44p" },
    };

    await deleteDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("DATA_ROOM_NOT_FOUND"),
    });
  });

  it("should return 400 if the dataroom_id is invalid", async () => {
    req.params!.dataroom_id = "invalidId";

    await deleteDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_DATAROOM_ID"),
    });
  });

  it("should return 500 if there is an error deleting the data room", async () => {
    req.params!.dataroom_id = new mongoose.Types.ObjectId().toString();

    // Mock DataRoom.findByIdAndUpdate to throw an error
    jest
      .spyOn(DataRoom, "findByIdAndUpdate")
      .mockRejectedValue(new Error("Delete error"));

    await deleteDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ERROR_DELETING_DATA_ROOM"),
      error: "Delete error",
    });
  });
});
