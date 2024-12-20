import mongoose from "mongoose";
import { Request, Response } from "express";
import DataRoom from "../../models/dataRoom";
import { updateDataRoom } from "../../controllers/dataRoomController";
import {translate, initI18n} from '../../utils/i18n';

describe("updateDataRoom function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: { dataroom_id: new mongoose.Types.ObjectId().toString() },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a data room if the id and fields are valid", async () => {
    const updatedDataRoom = {
      _id: req.params!.dataroom_id,
      name: "Updated Data Room Name",
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      description: "Updated Description",
      key_info: { encryptionKey: "updatedKey" },
      permissions: [],
    };

    req.body = updatedDataRoom;

    jest
      .spyOn(DataRoom, "findByIdAndUpdate")
      .mockResolvedValue(updatedDataRoom as any);

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("DATA_ROOM_UPDATED"),
      dataRoom: updatedDataRoom,
    });
  });

  it("should return 404 if the data room is not found", async () => {
    jest.spyOn(DataRoom, "findByIdAndUpdate").mockResolvedValue(null);

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("DATA_ROOM_NOT_FOUND"),
    });
  });

  it("should return 400 if the dataroom_id is invalid", async () => {
    req.params!.dataroom_id = "invalidId";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_DATAROOM_ID"),
    });
  });

  it("should return 400 if the organization_id is invalid", async () => {
    req.body.organization_id = "invalidId";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_ORGANIZATION_ID"),
    });
  });

  it("should return 400 if the created_by is invalid", async () => {
    req.body.created_by = "invalidId";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_CREATED_BY"),
    });
  });

  it("should return 400 if the name is invalid", async () => {
    req.body.name = "";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_NAME"),
    });
  });

  it("should return 400 if the description is invalid", async () => {
    req.body.description = "";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_DESCRIPTION"),
    });
  });

  it("should return 400 if the key_info is invalid", async () => {
    req.body.key_info = "invalidKeyInfo";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: undefined });
  });

  it("should return 400 if the permissions are invalid", async () => {
    req.body.permissions = "invalidPermissions";

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSIONS"),
    });
  });

  it("should return 400 if the permissions.user_id is invalid", async () => {
    req.body.permissions = [{ user_id: "invalidUserId", access_level: "read" }];

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: undefined,
    });
  });

  it("should return 500 if there is an error updating the data room", async () => {
    req.body.name = "New Name";
    jest
      .spyOn(DataRoom, "findByIdAndUpdate")
      .mockRejectedValueOnce(new Error("Update error"));

    await updateDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ERROR_UPDATING_DATA_ROOM"),
      error: "Update error",
    });
  });
});
