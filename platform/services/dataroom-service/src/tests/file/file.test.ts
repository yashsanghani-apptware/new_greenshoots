import { Request, Response } from "express";
import mongoose from "mongoose";
import {translate, initI18n} from '../../utils/i18n';
import { INVALID_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGES, PERMISSION_TYPES, FILE_TYPE } from "../../constants";
import {
  uploadFile,
  getFile,
  getFiles,
  updateFile,
  deleteFile,
} from "../../controllers/fileController";
import s3Service from "../../services/s3Service";
import File from "../../models/file";

// Mock services and models
jest.mock("../../services/s3Service");
jest.mock("../../models/file");

// Define interfaces for request and file metadata
interface MockFile {
  [key: string]: any; // To handle any additional properties
}

interface MockRequest extends Partial<Request> {
  params: {
    cabinet_id?: string;
    file_id?: string;
  };
  body: {
    cabinet_id?: string;
    organization_id?: string;
    created_by?: string;
    name?: string;
    description?: string;
    type?: string;
    status?: string;
  };
  files?: {
    file?: {
      buffer: Buffer;
    };
    [key: string]: any; // For other potential file fields
  };
}

interface MockResponse extends Partial<Response> {
  status: jest.Mock;
  json: jest.Mock;
}

describe("uploadFile", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      body: {},
      files: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });


  it("should return 400 if no files are attached", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.created_by = new mongoose.Types.ObjectId().toString();
    req.body!.name = "valid name";
    req.body!.description = "valid description";
    req.body!.type = FILE_TYPE[1];
    req.body!.status = "valid status";
    req.files;

    await uploadFile(req as Request, res as Response);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("ONLY_ALLOWED_NAME_ACCEPTED") });
  });

  it("should return 400 if file name is not allowed", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.created_by = new mongoose.Types.ObjectId().toString();
    req.body!.name = "valid name";
    req.body!.description = "valid description";
    req.body!.type = FILE_TYPE[1];
    req.body!.status = "valid status";
    req.files = { anotherFile: {} };

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ONLY_ALLOWED_NAME_ACCEPTED"),
    });
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalid_id";

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_CABINET_ID") });
  });

  it("should return 400 if created_by is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.created_by = "invalid_id";

    await uploadFile(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_CREATED_BY") });
  });

  it("should return 400 if name is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.created_by = new mongoose.Types.ObjectId().toString();
    req.body!.name = "";

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_NAME") });
  });

  it("should return 400 if description is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.created_by = new mongoose.Types.ObjectId().toString();
    req.body!.name = "valid name";
    req.body!.status = "valid status";
    req.body!.description = "";

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_DESCRIPTION") });
  });

  it("should return 400 if type is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.created_by = new mongoose.Types.ObjectId().toString();
    req.body!.name = "valid name";
    req.body!.status = "valid status";
    req.body!.description = "valid description";
    req.body!.type = "INVALID_TYPE";

    await uploadFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_TYPE") });
  });
 
});

describe("getFile", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      body: {},
      files: {},
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

    await getFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 200 and the file if valid ids are provided", async () => {
    const mockFile: MockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "test file",
    };
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = mockFile._id;
  
    (File.findOne as jest.Mock).mockResolvedValue(mockFile);
  
    await getFile(req as Request, res as Response);
  
    expect(File.findOne).toHaveBeenCalledWith({
      _id: req.params!.file_id,
      isDeleted: false,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFile);
  });  


  it("should return 400 for any other errors", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    const mockError = new Error("Test error");
    (File.findOne as jest.Mock).mockRejectedValue(mockError);

    await getFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

describe("getFiles", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      body: {},
      files: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.body!.cabinet_id = "invalid_id";

    await getFiles(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_CABINET_ID") });
  });

  it("should return all files in the cabinet", async () => {
    const mockFiles = [
      { _id: new mongoose.Types.ObjectId().toString(), name: "file1" },
      { _id: new mongoose.Types.ObjectId().toString(), name: "file2" },
    ];

    req.body!.cabinet_id = new mongoose.Types.ObjectId().toString();

    (File.find as jest.Mock).mockResolvedValue(mockFiles);

    await getFiles(req as Request, res as Response);

    expect(File.find).toHaveBeenCalledWith({ isDeleted: false, cabinet_id: req.body!.cabinet_id });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFiles);
  });

  it("should return 400 for any errors", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();

    const mockError = new Error("Test error");
    (File.find as jest.Mock).mockRejectedValue(mockError);

    await getFiles(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

describe("updateFile", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      body: {},
      files: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalid_id";

    await updateFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_CABINET_ID") });
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";

    await updateFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 400 if name is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.name = "";

    await updateFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_NAME") });
  });

  it("should return 400 if description is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.name = "valid name";
    req.body!.description = "";

    await updateFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_DESCRIPTION") });
  });

  // TODO  needs to fix this
  it("should update a file if valid data is provided", async () => {
    const mockFile: MockFile = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: "updated name",
    };
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.body!.organization_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = mockFile._id;
    req.body!.name = "updated name";
    req.body!.description = "updated description";
    req.body!.type = FILE_TYPE[2];
    req.body!.status = "updated status";

    (File.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockFile);

    await updateFile(req as Request, res as Response);

    // expect(File.findByIdAndUpdate).toHaveBeenCalledWith(req.params!.file_id, req.body, {
    //   new: true,
    // });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFile);
  });

  it("should return 404 if file to update is not found", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.organization_id = new mongoose.Types.ObjectId().toString();

    (File.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await updateFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: translate("FILE_NOT_FOUND") });
  });

  it("should return 400 for any errors", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.name = "valid name";

    const mockError = new Error("Test error");
    (File.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

    await updateFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: undefined });
  });
});

describe("deleteFile", () => {
  let req: MockRequest;
  let res: MockResponse;

  beforeEach(() => {
    req = {
      body: {},
      files: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalid_id";

    await deleteFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_CABINET_ID") });
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";

    await deleteFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("INVALID_FILE_ID") });
  });

  it("should return 400 for any errors", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    const mockError = new Error("Test error");
    (File.findByIdAndDelete as jest.Mock).mockRejectedValue(mockError);

    await deleteFile(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
