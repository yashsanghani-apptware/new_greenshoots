import { Request, Response } from "express";
// import { DocuSignIntegration } from "../../services/docusignService";
// import { clearUploadFolder } from "../../utils/clearUploadFolder";
import { sendDocumentFromS3ToDocuSign } from "../../controllers/documentSignatureController";
import File from "../../models/file";
import axios from "axios";
import fs from "fs";
import path from "path";
import { translate } from "../../utils/i18n";

jest.mock("../../services/docusignService", () => {
  return {
    DocuSignIntegration: jest.fn().mockImplementation(() => {
      return {
        run: jest.fn().mockResolvedValue("mockEnvelopeId"),
      };
    }),
  };
});

jest.mock("../../utils/clearUploadFolder", () => ({
  clearUploadFolder: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../../models/file");
jest.mock("axios");
jest.mock("fs");

describe("sendDocumentFromS3ToDocuSign function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        signer_email: "john.doe@example.com",
        signer_name: "John Doe",
        cc_email: "jane.doe@example.com",
        cc_name: "Jane Doe",
        file_id: "someFileId",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (File.findOne as jest.Mock).mockResolvedValue({
      _id: "someFileId",
      name: "test-document.txt",
      url: "http://s3.amazonaws.com/test-document.txt",
      isDeleted: false,
    });

    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        pipe: jest.fn(),
      },
      headers: {
        "content-type": "application/pdf",
      },
    });

    (fs.createWriteStream as jest.Mock).mockReturnValue({
      on: jest.fn((event, callback) => {
        if (event === "finish") callback();
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = {
      signer_email: "",
      signer_name: "",
      cc_email: "",
      cc_name: "",
      file_id: "",
    };

    await sendDocumentFromS3ToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: translate("MISSING_REQUIRED_FILEDS_DOCUSIGN"),
    });
  });

  it("should return 400 for invalid email formats", async () => {
    req.body = {
      signer_email: "invalid-email",
      signer_name: "John Doe",
      cc_email: "invalid-email",
      cc_name: "Jane Doe",
      file_id: "someFileId",
    };

    await sendDocumentFromS3ToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: translate("INVALID_EMAIL_FORMAT"),
    });
  });

  it("should return 404 if the file is not found", async () => {
    (File.findOne as jest.Mock).mockResolvedValue(null);

    await sendDocumentFromS3ToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: translate("FILE_NOT_FOUND"),
    });
  });

  // TODO Need to fix this test case <@amol>
//   it("should return 200 and envelopeId on successful file download and upload", async () => {
//     await sendDocumentFromS3ToDocuSign(req as Request, res as Response);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       envelopeId: "mockEnvelopeId",
//       message:
//         "Email sent to the signer email john.doe@example.com for the document signature.",
//     });

//     // Verify that the DocuSignIntegration run method was called
//     const DocuSignInstance = (DocuSignIntegration as jest.Mock).mock.instances[0];
//     expect(DocuSignInstance.run).toHaveBeenCalled();

//     // Verify that the clearUploadFolder function was called
//     expect(clearUploadFolder).toHaveBeenCalled();
//   });
});
