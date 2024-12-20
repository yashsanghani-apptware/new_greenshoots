import mongoose from "mongoose";
import { Request, Response } from "express";
import DataRoom from "../../models/dataRoom";
import dataRoomController from "../../controllers/dataRoomController";
import {translate, initI18n} from '../../utils/i18n';


describe("createDataRoom function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
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

  it("should create a new data room", async () => {
    const newDataRoom = {
      organization_id: new mongoose.Types.ObjectId().toString(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "Test Room",
      description: "A room for testing",
      created_by: new mongoose.Types.ObjectId().toString(),
      key_info: {},
      permissions: [],
    };

    req.body = newDataRoom;

    const savedDataRoom = {
      ...newDataRoom,
      _id: new mongoose.Types.ObjectId(),
      created_at : new Date(),
    };

    jest.spyOn(DataRoom.prototype, "save").mockResolvedValue(savedDataRoom);

    await dataRoomController.createDataRoom(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: translate("DATA_ROOM_CREATED"),
      })
    );
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = {
      name: "Test Room",
      description: "A room for testing",
      key_info: {},
      permissions: [],
    };

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_ORGANIZATION_ID"),
    });
  });

  it("should return 400 if organization_id or created_by is invalid", async () => {
    req.body = {
      organization_id: "invalid_id",
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "Test Room",
      description: "A room for testing",
      created_by: "invalid_id",
      key_info: {},
      permissions: [],
    };

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_ORGANIZATION_ID"),
    });
  });

  it("should return 400 if the name is invalid", async () => {
    req.body = {
      organization_id: new mongoose.Types.ObjectId().toString(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "",
      description: "A room for testing",
      created_by: new mongoose.Types.ObjectId().toString(),
      key_info: {},
      permissions: [],
    };

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_NAME"),
    });
  });

  it("should return 400 if the description is invalid", async () => {
    req.body = {
      organization_id: new mongoose.Types.ObjectId().toString(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "Test Room",
      description: "",
      created_by: new mongoose.Types.ObjectId().toString(),
      key_info: {},
      permissions: [],
    };

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_DESCRIPTION"),
    });
  });

  it("should return 400 if the permissions array is invalid", async () => {
    req.body = {
      organization_id: new mongoose.Types.ObjectId().toString(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "Test Room",
      description: "A room for testing",
      created_by: new mongoose.Types.ObjectId().toString(),
      key_info: {},
      permissions: "invalid_permissions" as unknown as Array<any>,
    };

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSIONS"),
    });
  });

  it("should return 400 if the permissions.created_by is invalid", async () => {
    req.body = {
      organization_id: new mongoose.Types.ObjectId().toString(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "Test Room",
      description: "A room for testing",
      created_by: new mongoose.Types.ObjectId().toString(),
      key_info: {},
      permissions: [{ user_id: "invalid_id", access_level: "read" }],
    };

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSIONS_USER_ID"),
    });
  });

  it("should return 500 if there is a server error", async () => {
    req.body = {
      organization_id: new mongoose.Types.ObjectId().toString(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: "Test Room",
      description: "A room for testing",
      created_by: new mongoose.Types.ObjectId().toString(),
      key_info: {},
      permissions: [],
    };

    jest.spyOn(DataRoom.prototype, "save").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    await dataRoomController.createDataRoom(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ERROR_CREATING_DATA_ROOM"),
      error: expect.any(Error),
    });
  });
});
