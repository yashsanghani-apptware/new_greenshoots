import { Request, Response } from "express";
import mongoose from "mongoose";
import { getFileVersion } from "../../controllers/fileController";
import File from "../../models/file";
import { ERROR_MESSAGES, INVALID_MESSAGE } from "../../constants";
import {translate, initI18n} from '../../utils/i18n';

jest.mock("../../models/file");

interface MockRequest extends Partial<Request> {
  params: {
    cabinet_id?: string;
    file_id?: string;
    version_id?: string;
  };
}

interface MockResponse extends Partial<Response> {
  status: jest.Mock;
  json: jest.Mock;
}

describe("getFileVersion", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";
    req.params!.version_id = new mongoose.Types.ObjectId().toString();

    await getFileVersion(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 404 if the file is not found", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.version_id = new mongoose.Types.ObjectId().toString();

    (File.findOne as jest.Mock).mockResolvedValue(null);

    await getFileVersion(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_NOT_FOUND") });
  });

  it("should return 404 if the version is not found", async () => {
    const mockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      versions: [],
    };
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = mockFile._id;
    req.params!.version_id = new mongoose.Types.ObjectId().toString();

    (File.findOne as jest.Mock).mockResolvedValue(mockFile);

    await getFileVersion(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: translate("VERSION_NOT_FOUND") });
  });

  it("should return the version if valid ids are provided", async () => {
    const mockVersion = {
      version_id: new mongoose.Types.ObjectId().toString(),
      name: "v1",
    };
    const mockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      versions: [mockVersion],
    };
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = mockFile._id;
    req.params!.version_id = mockVersion.version_id;

    (File.findOne as jest.Mock).mockResolvedValue(mockFile);

    await getFileVersion(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockVersion);
  });

  it("should handle errors and return 500", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.version_id = new mongoose.Types.ObjectId().toString();

    const mockError = new Error("Test error");
    (File.findOne as jest.Mock).mockRejectedValue(mockError);

    await getFileVersion(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
