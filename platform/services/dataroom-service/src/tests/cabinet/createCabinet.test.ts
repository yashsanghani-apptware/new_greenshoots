import mongoose from 'mongoose';
import { Request, Response } from 'express';
import dataRoom from '../../models/dataRoom';
import cabinet from '../../models/cabinet';
import  {createCabinet }from "../../controllers/cabinetController";
import  {MongoMemoryServer} from "mongodb-memory-server";
import {translate, initI18n} from '../../utils/i18n';

let mongoServer: MongoMemoryServer;

describe("createCabinets function", () => {
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
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });



  const dataRoomObj = new dataRoom({
    _id: new mongoose.Types.ObjectId(),
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

  it("should create a new cabinet", async () => {
    await dataRoomObj.save();
    const newCabinet = {
      dataroom: dataRoomObj._id, // The ID of the DataRoom this Cabinet belongs to
      ari: "unique-cabinet-identifier",    // The unique Agsiri Resource Identifier for the Cabinet
      name: "Example Cabinet Name",        // Human-readable name for the Cabinet
      description: "This is an example description.", // A brief description of the Cabinet (optional)
      created_by: "64e1234567890abcde123457", // User ID of the Cabinet creator
      modified_by: "64e1234567890abcde123458", // User ID of the last person who modified the Cabinet (optional)
      type: "REGULAR",                     // Indicates the security level of the Cabinet
      parent_cabinet_id: "64e1234567890abcde123459", // ID of the parent Cabinet if nested (optional)
      regulatory_hold: {                  // Information about any regulatory holds
        hold_id: "64e1234567890abcde123460", // Unique identifier for the regulatory hold
        reason: "Regulatory reason for hold", // Reason for the hold
        applied_by: "64e1234567890abcde123461", // ID of the user who applied the hold
        applied_at: "2024-08-27T00:00:00.000Z", // Date when the hold was applied
        status: "ACTIVE",                  // Status of the hold (ACTIVE or RELEASED)
        released_at: "2024-09-01T00:00:00.000Z" // Date when the hold was lifted (optional)
      },
      files: [                            // List of files associated with the Cabinet (empty array or filled as needed)
        "64e1234567890abcde123463"
      ]
    };

    req.body = newCabinet;

    const savedCabinet = {
      ...newCabinet,
      _id: new mongoose.Types.ObjectId(),
      creation_date: new Date(),
    };

    jest.spyOn(cabinet.prototype, "save").mockResolvedValue(savedCabinet);

    await createCabinet(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: translate("CABINET_CREATED"),
      })
    );
  });

  it("should return validation errors for missing fields", async () => {
    await dataRoomObj.save();
    req.body = {
      dataroom: dataRoomObj._id,
      description: "A cabinets for testing",
      user_id: new mongoose.Types.ObjectId().toString(),
      type: "REGULAR",
      permissions: [],
    }; // No data provided

    await createCabinet(req as Request, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_NAME"),
    });
  });

  it("should return validation errors for incorrect fields", async () => {
    await dataRoomObj.save();
    req.body = {
      dataroom: dataRoomObj._id,
      name: "Test Cabinet",
      description: "A cabinet for testing validation",
      user_id: "new mongoose.Types.ObjectId().toString()",
      type: "invalid_id",
      permissions: [],
    };

    await createCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: translate("INVALID_USER_ID"), // Adjust as per your actual validation error message
      })
    );
  });

  it("should return 400 if the permissionsis invalid", async () => {
    await dataRoomObj.save();
    req.body = {
      dataroom: dataRoomObj._id,
      name: "Test cabinets",
      description: "A cabinets for testing",
      user_id: new mongoose.Types.ObjectId().toString(),
      type: "REGULAR",
      permissions: "invalid_id",
    };

    await createCabinet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSIONS"),
    });
  });
});

