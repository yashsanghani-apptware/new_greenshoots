import { Request, Response } from "express";
import { DocuSignIntegration } from "../../services/docusignService";
import { clearUploadFolder } from "../../utils/clearUploadFolder";
import { sendDocumentToDocuSign } from "../../controllers/documentSignatureController";
import {translate, initI18n} from '../../utils/i18n';

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

describe("sendDocumentToDocuSign function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {},
      files: {
        files: [
          {
              name: "test-document.txt",
              mv: jest.fn().mockResolvedValue(undefined),
              encoding: "",
              mimetype: "",
              data: Buffer.from(""),
              tempFilePath: "",
              truncated: false,
              size: 0,
              md5: ""
          },
        ],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
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
    };

    await sendDocumentToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        translate("MISSING_REQUIRED_FIELDS")
    });
  });

  it("should return 400 for invalid email formats", async () => {
    req.body = {
      signer_email: "invalid-email",
      signer_name: "John Doe",
      cc_email: "invalid-email",
      cc_name: "Jane Doe",
    };

    await sendDocumentToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: translate("INVALID_EMAIL_FORMAT_SIGNER_CC"),
    });
  });

  it("should return 400 if the signer name or cc name is empty", async () => {
    req.body = {
      signer_email: "john.doe@example.com",
      signer_name: "",
      cc_email: "jane.doe@example.com",
      cc_name: "",
    };

    await sendDocumentToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: translate("MISSING_REQUIRED_FIELDS"),
    });
  });

  it("should return 400 if no files are uploaded", async () => {
    req.files = undefined;

    req.body = {
      signer_email: "john.doe@example.com",
      signer_name: "John Doe",
      cc_email: "jane.doe@example.com",
      cc_name: "Jane Doe",
    };

    await sendDocumentToDocuSign(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: translate("NO_FILES_UPLOADED") });
  });

  // TODO: need to fix this bug
//   it("should return 200 and envelopeId on successful upload", async () => {
//     req.body = {
//       signer_email: "john.doe@example.com",
//       signer_name: "John Doe",
//       cc_email: "jane.doe@example.com",
//       cc_name: "Jane Doe",
//     };

//     await sendDocumentToDocuSign(req as Request, res as Response);

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

//   it("should return 500 if there is a server error", async () => {
//     req.body = {
//       signer_email: "john.doe@example.com",
//       signer_name: "John Doe",
//       cc_email: "jane.doe@example.com",
//       cc_name: "Jane Doe",
//     };

//     // Simulate a server error
//     const DocuSignInstance = (DocuSignIntegration as jest.Mock).mock.instances[0];
//     DocuSignInstance.run.mockRejectedValueOnce(new Error("Unexpected error"));

//     await sendDocumentToDocuSign(req as Request, res as Response);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: "Unexpected error",
//     });
//   });
});
