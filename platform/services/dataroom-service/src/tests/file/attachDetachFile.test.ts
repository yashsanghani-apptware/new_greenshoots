import { Request, Response } from "express";
import mongoose from "mongoose";
import { mount, unmount } from "../../controllers/fileController";
import File from "../../models/file";
import Cabinet from "../../models/cabinet";
// import DataRoom from "../../models/dataroom";
import { translate } from "../../utils/i18n";

jest.mock("../../models/file");
jest.mock("../../models/cabinet");
jest.mock("../../models/dataroom");

interface MockRequest extends Partial<Request> {
  params: {
    file_id?: string;
  };
  body: {
    cabinet_id?: string;
    dataroom_id?: string;
  };
}

interface MockResponse extends Partial<Response> {
  status: jest.Mock;
  json: jest.Mock;
}

describe("mount", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.file_id = "invalid_id";
    req.body!.cabinet_id = new mongoose.Types.ObjectId().toString();

    await mount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 400 if neither cabinet_id nor dataroom_id is provided", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    await mount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("CABINET_OR_DATAROOM_REQUIRED") });
  });

  it("should return 404 if the file is not found", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.cabinet_id = new mongoose.Types.ObjectId().toString();

    (File.findOne as jest.Mock).mockResolvedValue(null);

    await mount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_NOT_FOUND") });
  });

  it("should attach the file to the cabinet", async () => {
    const mockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      isDeleted: false,
      cabinet_id: null,
    };
    const mockCabinet = {
      _id: new mongoose.Types.ObjectId().toString(),
      isDeleted: false,
      files: [],
    };

    req.params!.file_id = mockFile._id;
    req.body!.cabinet_id = mockCabinet._id;

    (File.findOne as jest.Mock).mockResolvedValue(mockFile);
    (Cabinet.findById as jest.Mock).mockResolvedValue(mockCabinet);
    (File.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockFile);
    (Cabinet.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockCabinet);

    await mount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_ATTACHED_SUCCESSFULLY_TO_CABINET") });
  });
});

describe("unmount", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.file_id = "invalid_id";
    req.body!.cabinet_id = new mongoose.Types.ObjectId().toString();

    await unmount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 404 if the file is not found", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.cabinet_id = new mongoose.Types.ObjectId().toString();

    (File.findOne as jest.Mock).mockResolvedValue(null);

    await unmount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_NOT_FOUND") });
  });

  it("should dettach the file from the cabinet", async () => {
    const mockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      isDeleted: false,
      cabinet_id: new mongoose.Types.ObjectId().toString(),
    };
    const mockCabinet = {
      _id: mockFile.cabinet_id,
      isDeleted: false,
      files: [mockFile._id],
    };

    req.params!.file_id = mockFile._id;
    req.body!.cabinet_id = mockCabinet._id;

    (File.findOne as jest.Mock).mockResolvedValue(mockFile);
    (Cabinet.findById as jest.Mock).mockResolvedValue(mockCabinet);
    (File.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockFile);
    (Cabinet.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockCabinet);

    await unmount(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_DETTACHED_SUCCESSFULLY_FROM_CABINET") });
  });

});
