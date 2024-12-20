import mongoose from "mongoose";
import DataRoom from "../../models/dataRoom";
import { updateCabinet } from "../../controllers/cabinetController";
import  Cabinet from "../../models/cabinet";
import { Request, Response } from 'express';
import  { MongoMemoryServer } from "mongodb-memory-server";
import {translate, initI18n} from '../../utils/i18n';

let mongoServer: MongoMemoryServer;

describe("updateCabinet function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(() => {
    req = {
      params: { cabinet_id: new mongoose.Types.ObjectId().toString() },
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

  const dataRoomObj = new DataRoom({
    _id: new mongoose.Types.ObjectId().toString(),
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
  });

  it("should update a cabinet if the cabinet_id and fields are valid", async () => {
    await dataRoomObj.save();
    const updatedCabinet = {
      _id: req.params!.cabinet_id,
      client_id: new mongoose.Types.ObjectId().toString(),
      dataroom: dataRoomObj._id,
      name: "Test cabinets",
      description: "A cabinets for testing",
      user_id: new mongoose.Types.ObjectId().toString(),
      type: "REGULAR",
      permissions: [],
    };

    req.body = updatedCabinet;

    jest.spyOn(Cabinet, "findByIdAndUpdate").mockResolvedValue(updatedCabinet as any);

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("CABINET_UPDATED"),
      cabinet: updatedCabinet,
    });
  });

  it("should return 404 if the Cabinet is not found", async () => {
    (req.body.dataroom = dataRoomObj._id),
      (req.body.name = "Test cabinets"),
      (req.body.description = "A cabinets for testing"),
      (req.body.user_id = new mongoose.Types.ObjectId().toString()),
      (req.body.type = "REGULAR"),
      (req.body.permissions = []);
    jest.spyOn(Cabinet, "findByIdAndUpdate").mockResolvedValue(null);

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("CABINET_NOT_FOUND"),
    });
  });

  it("should return 400 if the cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalidId";

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_CABINET_ID"),
    });
  });

  it("should return 400 if the type is invalid", async () => {
    req.body.type = "invalidId";

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_TYPE"),
    });
  });

  it("should return 400 if the created_by is invalid", async () => {
    req.body.created_by = "invalidId";

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_USER_ID"),
    });
  });

  it("should return 400 if the name is invalid", async () => {
    req.body.name = "";

    await updateCabinet(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_NAME"),
    });
  });

  it("should return 400 if the description is invalid", async () => {
    req.body.description = "";

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_DESCRIPTION"),
    });
  });

  // it("should return 400 if the permissions are invalid", async () => {
  //   (req.body.dataroom = dataRoomObj._id),
  //     (req.body.name = "Test cabinets"),
  //     (req.body.description = "A cabinets for testing"),
  //     (req.body.user_id = new mongoose.Types.ObjectId().toString()),
  //     (req.body.type = "REGULAR"),
  //     (req.body.permissions = "invalidPermissions");

  //   await updateCabinet(req as Request, res as Response);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: translate("INVALID_PERMISSIONS"),
  //   });
  // });

  // it("should return 400 if the permissions.user_id is invalid", async () => {
  //   req.body.permissions = [{ user_id: "invalidUserId", access_level: "read" }];
  //   (req.body.dataroom = dataRoomObj._id),
  //     (req.body.name = "Test cabinets"),
  //     (req.body.description = "A cabinets for testing"),
  //     (req.body.user_id = new mongoose.Types.ObjectId().toString()),
  //     (req.body.type = "REGULAR"),
  //     await updateCabinet(req as Request, res as Response);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: translate("INVALID_PERMISSIONS_USER_ID"),
  //   });
  // });


  it("should return 500 if there is an error updating the cabinet", async () => {
    (req.body.type = "REGULAR"), (req.body.name = "New Name");
    jest
      .spyOn(Cabinet, "findByIdAndUpdate")
      .mockRejectedValueOnce(new Error("Update error"));

    await updateCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message:  translate("ERROR_UPDATING_CABINET"),
      error: "Update error",
    });
  });
});
