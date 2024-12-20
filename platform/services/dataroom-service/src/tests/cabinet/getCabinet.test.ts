import { getCabinet,getCabinets,} from "../../controllers/cabinetController";
import  Cabinet from "../../models/cabinet";
import { Request, Response } from 'express';
import mongoose from "mongoose";
import dataRoom from "../../models/dataRoom";
import {translate, initI18n} from '../../utils/i18n';
import  { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

describe("Cabinet Controller", () => {
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
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(async () => {
    await Cabinet.deleteMany({});
    jest.clearAllMocks();
  });
  afterEach(async () => {
    await dataRoom.deleteMany({});
    jest.clearAllMocks();
  });

  describe("getCabinet function", () => {
    const dataRoomObj = new dataRoom({
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
    it("should return a cabinet if the id is valid", async () => {
      await dataRoomObj.save();

      const cabinet = new Cabinet({
        dataroom: (dataRoomObj._id as mongoose.Types.ObjectId).toString(), // The ID of the DataRoom this Cabinet belongs to
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
      });

      await cabinet.save();

      req = { params: { cabinet_id: (cabinet._id as mongoose.Types.ObjectId).toString() } };
      req = {
        params: {
          cabinet_id: (cabinet._id as mongoose.Types.ObjectId).toString(),
        },
      }

      await getCabinet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: cabinet.name,
          description: cabinet.description,
        })
      );
    });

    it("should return 404 if the cabinet is not found", async () => {
      const validObjectId = new mongoose.Types.ObjectId();

      req = { params: { cabinet_id: validObjectId.toString() } };
      await getCabinet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: translate("CABINET_NOT_FOUND"),
      });
    });

    it("should return 400 if the cabinet_id is invalid", async () => {
      const invalidId = "6697869c79860840b6111af39";

      req = { params: { cabinet_id: invalidId } };

      await getCabinet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: translate("MONGO_SCHEMA_ID_INVALID"),
      });
    });
  });

  describe("getCabinets function", () => {
    const dataRoomObj = new dataRoom({
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
    beforeEach(async () => {
      await dataRoomObj.save();
      const cabinet = [
        {
          dataroom: (dataRoomObj._id as mongoose.Types.ObjectId).toString(), // The ID of the DataRoom this Cabinet belongs to
          ari: "test ari-1",    // The unique Agsiri Resource Identifier for the Cabinet
          name: "Test cabinets 1",        // Human-readable name for the Cabinet
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
        },
        {
          dataroom: (dataRoomObj._id as mongoose.Types.ObjectId).toString(), // The ID of the DataRoom this Cabinet belongs to
          ari: "test ari-2",    // The unique Agsiri Resource Identifier for the Cabinet
          name: "Test cabinets 2",        // Human-readable name for the Cabinet
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
        },
      ];
      await Cabinet.insertMany(cabinet);
    });

    it("should return a list of all data rooms", async () => {
      req = {};

      await getCabinets(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: "Test cabinets 1" }),
          expect.objectContaining({ name: "Test cabinets 2" }),
        ])
      );
    });
  });
});
