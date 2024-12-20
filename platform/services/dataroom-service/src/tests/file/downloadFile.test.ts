import { Request, Response } from "express";
import mongoose from "mongoose";
import axios from "axios";
import { downloadFile } from "../../controllers/fileController";
import File from "../../models/file";
import {translate, initI18n} from '../../utils/i18n';

jest.mock("../../models/file");
jest.mock("axios");

interface MockRequest extends Partial<Request> {
  params: {
    cabinet_id?: string;
    file_id?: string;
  };
  query: {
    version_id?: string;
  };
}

interface MockResponse extends Partial<Response> {
  status: jest.Mock;
  json: jest.Mock;
  setHeader: jest.Mock;
}

describe("downloadFile", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
    };
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";

    await downloadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 404 if the file is not found", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    (File.findOne as jest.Mock).mockResolvedValue(null);

    await downloadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_NOT_FOUND`") });
  });

  it("should return 404 if the version is not found", async () => {
    const mockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "test file",
      content_url: "http://example.com/file.txt",
      versions: [],
    };
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = mockFile._id;
    req.query!.version_id = "invalid_version_id";

    (File.findOne as jest.Mock).mockResolvedValue(mockFile);

    await downloadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: translate("VERSION_NOT_FOUND") });
  });

  it("should download the file if valid file and version are provided", async () => {
    const mockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "test file",
      content_url: "http://example.com/file.txt",
      versions: [{ version_id: "valid_version_id", url: "http://example.com/version.txt" }],
    };
    const mockAxiosResponse = {
      headers: { "content-type": "application/octet-stream" },
      data: { pipe: jest.fn() },
    };
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = mockFile._id;
    req.query!.version_id = "valid_version_id";

    (File.findOne as jest.Mock).mockResolvedValue(mockFile);
    (axios.get as jest.Mock).mockResolvedValue(mockAxiosResponse);

    await downloadFile(req as Request, res as Response);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Disposition", `attachment; filename="${mockFile.name}"`);
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", mockAxiosResponse.headers["content-type"]);
    expect(mockAxiosResponse.data.pipe).toHaveBeenCalledWith(res);
  });

  it("should handle errors and return 500", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    const mockError = new Error("Test error");
    (File.findOne as jest.Mock).mockRejectedValue(mockError);

    await downloadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
