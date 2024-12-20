import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import DataRoom from "../../models/dataRoom";
import dataRoomController from "../../controllers/dataRoomController";
import { Request, Response } from "express";
import {translate, initI18n} from '../../utils/i18n';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await DataRoom.deleteMany({});
});

describe("DataRoom Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getDataRoom function", () => {
    it("should return a data room if the id is valid", async () => {
      const dataRoom = new DataRoom({
        organization_id: new mongoose.Types.ObjectId(),
        ari: "valid_ari",
        data_residency: {
          country: "US",
          region: "us-east-1",
          data_center: "Data Center 1",
        },
        name: "Test Room",
        description: "Test Description",
        created_by: new mongoose.Types.ObjectId(),
        key_info: {},
        permissions: [],
      });
      await dataRoom.save();

      req = {
        params: {
          dataroom_id: (dataRoom._id as mongoose.Types.ObjectId).toString(),
        },
      };

      await dataRoomController.getDataRoom(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: dataRoom.name,
          description: dataRoom.description,
        })
      );
    });

    it("should return 404 if the data room is not found", async () => {
      const validObjectId = new mongoose.Types.ObjectId();

      req = { params: { dataroom_id: validObjectId.toString() } };

      await dataRoomController.getDataRoom(req as Request, res as Response);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: translate("DATA_ROOM_NOT_FOUND"),
        // message: "..",
      });
    });

    it("should return 400 if the id is invalid", async () => {
      const invalidId = "6697869c79860840b6111af39";

      req = { params: { dataroom_id: invalidId } };

      await dataRoomController.getDataRoom(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: translate("MONGO_SCHEMA_ID_INVALID"),
      });
    });
  });

  describe("getDataRooms function", () => {
    beforeEach(async () => {
      const dataRooms = [
        {
          organization_id: new mongoose.Types.ObjectId(),
          ari: new mongoose.Types.ObjectId().toString(), 
          data_residency: {
            country: "US",
            region: "us-east-1",
            data_center: "Data Center 1",
          },
          name: "Test Room 1",
          description: "Test Description 1",
          created_by: new mongoose.Types.ObjectId(),
          key_info: {},
          permissions: [],
        },
        {
          organization_id: new mongoose.Types.ObjectId(),
          ari: new mongoose.Types.ObjectId().toString(), 
          data_residency: {
            country: "US",
            region: "us-east-1",
            data_center: "Data Center 1",
          },
          name: "Test Room 2",
          description: "Test Description 2",
          created_by: new mongoose.Types.ObjectId(),
          key_info: {},
          permissions: [],
        },
      ];
      await DataRoom.insertMany(dataRooms);
    });

    it("should return a list of all data rooms", async () => {
      req = {};

      await dataRoomController.getDataRooms(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: "Test Room 1" }),
          expect.objectContaining({ name: "Test Room 2" }),
        ])
      );
    });

    it("should return a message if no data rooms are available", async () => {
      await DataRoom.deleteMany({}); // Clear the database

      req = {};

      await dataRoomController.getDataRooms(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
       translate("DATA_ROOM_NOT_AVAILABLE"),
      );
    });
  });
});
