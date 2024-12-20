import {
  INVALID_MESSAGE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGES,
  PERMISSION_TYPES,
} from "../../constants";
import {translate, initI18n} from '../../utils/i18n';
import {
  createFilePermissions,
  getFilePermissions,
  getFilePermission,
  updatePermission,
  checkUserPermissions,
  deletePermission,
} from "../../controllers/fileController";
import File from "../../models/file";
import Permission from "../../models/permission";
import mongoose from "mongoose";
import { Request, Response } from "express";

jest.mock("../../models/file");

describe("createFilePermissions", () => {
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalid_id";
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    await createFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_CABINET_ID"),
    });
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";

    await createFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_FILE_ID"),
    });
  });

  it("should return 400 if type is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.type = "INVALID_TYPE";

    await createFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_TYPE"),
    });
  });

  it("should return 404 if file is not found", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.type = "VIEW";

    (File.findOne as jest.Mock).mockResolvedValue(null);

    await createFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("FILE_NOT_FOUND"),
    });
  });

  it("should handle errors during permission creation", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body = {
      type: "VIEW",
      roles: ["admin"],
      users: ["user1"],
      start_time: new Date(),
      end_time: new Date(),
    };

    const mockError = new Error("Creation failed");
    (File.findOne as jest.Mock).mockRejectedValue(mockError);

    await createFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ERROR_CREATING_PERMISSION"),
    });
  });
});

describe("updatePermission", () => {
  let req: Partial<Request>, res: Partial<Response>;

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

  it("should return 400 if the file ID is invalid", async () => {
    req.params!.file_id = "invalid_id";

    await updatePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_FILE_ID"),
    });
  });

  it("should return 400 if the permission type is invalid", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body!.type = "INVALID_TYPE";

    await updatePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_TYPE"),
    });
  });

  it("should return 400 if roles or users are not arrays", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body = {
      type: "VIEW",
      roles: "admin",
      users: "user1",
    };

    await updatePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("ROLES_USERS_MUST_ARRAY"),
    });
  });

  it("should return 400 if start or end time is missing", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.body = {
      type: "VIEW",
      roles: ["admin"],
      users: ["user1"],
    };

    await updatePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("START_END_TIME_REQUIRED"),
    });
  });
});

describe("checkUserPermissions", () => {
  let req: Partial<Request>, res: Partial<Response>;

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
    req.params!.user_id = new mongoose.Types.ObjectId().toString();
    req.body!.permissions = ["VIEW"];

    await checkUserPermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_FILE_ID"),
    });
  });

  it("should return 400 if user_id is invalid", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.user_id = "invalid_id";
    req.body!.permissions = ["VIEW"];

    await checkUserPermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_USER_ID"),
    });
  });

  it("should return 400 if permissions array is invalid", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.user_id = new mongoose.Types.ObjectId().toString();
    req.body!.permissions = "VIEW";

    await checkUserPermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSIONS"),
    });
  });
});

describe("deletePermission", () => {
  let req: Partial<Request>, res: Partial<Response>;

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
    req.params!.file_id = "invalid_id";
    req.params!.permission_id = new mongoose.Types.ObjectId().toString();

    await deletePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_FILE_ID"),
    });
  });

  it("should return 400 if permission_id is invalid", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.permission_id = "invalid_id";

    await deletePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSION_ID"),
    });
  });

  it("should return 404 if file is not found", async () => {
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.permission_id = new mongoose.Types.ObjectId().toString();

    (File.findOne as jest.Mock).mockResolvedValue(null);

    await deletePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("FILE_NOT_FOUND"),
    });
  });
});

describe("getFilePermissions", () => {
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalid_id";
    req.params!.file_id = new mongoose.Types.ObjectId().toString();

    await getFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_CABINET_ID"),
    });
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";

    await getFilePermissions(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_FILE_ID"),
    });
  });
});

describe("getFilePermission", () => {
  let req: Partial<Request>, res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if cabinet_id is invalid", async () => {
    req.params!.cabinet_id = "invalid_id";
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.permission_id = new mongoose.Types.ObjectId().toString();

    await getFilePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_CABINET_ID"),
    });
  });

  it("should return 400 if file_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = "invalid_id";
    req.params!.permission_id = new mongoose.Types.ObjectId().toString();

    await getFilePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_FILE_ID"),
    });
  });

  it("should return 400 if permission_id is invalid", async () => {
    req.params!.cabinet_id = new mongoose.Types.ObjectId().toString();
    req.params!.file_id = new mongoose.Types.ObjectId().toString();
    req.params!.permission_id = "invalid_id";

    await getFilePermission(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: translate("INVALID_PERMISSION_ID"),
    });
  });
});
