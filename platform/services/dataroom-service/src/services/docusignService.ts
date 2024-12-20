import * as docusign from "docusign-esign";
import * as fs from "fs";
import * as path from "path";
import promptSync from "prompt-sync";
import { Request } from "express";
import * as signingViaEmail from "./signingViaEmail";

interface JwtConfig {
  dsOauthServer: string;
  dsJWTClientId: string;
  impersonatedUserGuid: string;
  privateKeyLocation: string;
}

interface AccountInfo {
  accessToken: string;
  apiAccountId: string;
  basePath: string;
}

interface EnvelopeArgs {
  signerEmail: string;
  signerName: string;
  ccEmail: string;
  ccName: string;
  status: string;
  uploadFiles: string[];
}

/**
 * Class for integrating with DocuSign to send a document for signature.
 *
 * @class DocuSignIntegration
 * @property {string[]} SCOPES - The scopes to request from DocuSign.
 * @property {JwtConfig} jwtConfig - The configuration for JWT authentication.
 * @property {string} uploadFiles - The path to the demo documents directory.
 * @property {string} doc2File - The name of the second document to sign.
 * @property {string} doc3File - The name of the third document to sign.
 * @property {promptSync.Prompt} prompt - The command line prompt library.
 */
export class DocuSignIntegration {
  private SCOPES: string[] = ["signature", "impersonation"];
  private jwtConfig: JwtConfig;
  private uploadFiles: string[];
  private prompt: promptSync.Prompt;

  constructor(jwtConfig: JwtConfig, uploadFiles: string[]) {
    this.jwtConfig = jwtConfig;
    this.uploadFiles = uploadFiles;
    this.prompt = promptSync();
  }

  /**
   * Retrieves the user's consent for the application to access their data.
   * FUTURE SCOPE: This we can use when create the User Interface
   * @return {boolean} Returns true if the user grants consent, false otherwise.
   */
  private getConsent(): boolean {
    const urlScopes = this.SCOPES.join("+");
    const consentUrl =
      `${this.jwtConfig.dsOauthServer}/oauth/auth?response_type=code&` +
      `scope=${urlScopes}&client_id=${this.jwtConfig.dsJWTClientId}&` +
      `redirect_uri=${process.env.REDIRECT_URI}`;

    console.log(consentUrl);
    console.log("Consent granted? \n 1)Yes \n 2)No");
    const consentGranted = this.prompt("");
    if (consentGranted === "1") {
      return true;
    } else {
      console.error("Please grant consent!");
      process.exit();
    }
  }

  /**
   * Authenticates the user with the DocuSign API using JWT authentication.
   *
   * @return {Promise<AccountInfo>} A promise that resolves to an object containing the access token,
   * API account ID, and base path of the default account.
   * @throws {Error} If no default account is found.
   * @throws {Error} If consent is required and not granted.
   * @throws {Error} If there is an API problem with the DocuSign API.
   */
  private async authenticate(): Promise<AccountInfo> {
    const jwtLifeSec = 10 * 60; // requested lifetime for the JWT is 10 min
    const dsApi = new docusign.ApiClient();
    dsApi.setOAuthBasePath(
      this.jwtConfig.dsOauthServer.replace("https://", "")
    );
    const rsaKey = fs.readFileSync(this.jwtConfig.privateKeyLocation);

    try {
      const results = await dsApi.requestJWTUserToken(
        this.jwtConfig.dsJWTClientId,
        this.jwtConfig.impersonatedUserGuid,
        this.SCOPES,
        rsaKey,
        jwtLifeSec
      );
      const accessToken = results.body.access_token;

      // get user info
      const userInfoResults = await dsApi.getUserInfo(accessToken);

      // use the default account
      const userInfo = userInfoResults.accounts.find(
        (account: { isDefault: string }) => account.isDefault === "true"
      );

      if (!userInfo) {
        throw new Error("No default account found");
      }

      return {
        accessToken: results.body.access_token,
        apiAccountId: userInfo.accountId,
        basePath: `${userInfo.baseUri}/restapi`,
      };
    } catch (e: any) {
      const body = e.response && e.response.body;
      // Determine the source of the error
      if (body) {
        // The user needs to grant consent
        if (body.error && body.error === "consent_required") {
          if (this.getConsent()) {
            return this.authenticate();
          }
        } else {
          // Consent has been granted. Show status code for DocuSign API error
          console.error(`\nAPI problem: Status code ${
            e.response.status
          }, message body:
        ${JSON.stringify(body, null, 4)}\n\n`);
        }
      }
      throw e;
    }
  }

  /**
   * Retrieves the arguments required for the DocuSign API call.
   *
   * @param {string} apiAccountId - The API account ID.
   * @param {string} accessToken - The access token for authentication.
   * @param {string} basePath - The base path for the API endpoint.
   * @param {Request} requestBody - The request body containing signer and carbon copy information.
   * @return {{
   *   accessToken: string;
   *   basePath: string;
   *   accountId: string;
   *   envelopeArgs: EnvelopeArgs;
   * }} The arguments required for the API call.
   */
  private getArgs(
    apiAccountId: string,
    accessToken: string,
    basePath: string,
    requestBody: Request
  ): {
    accessToken: string;
    basePath: string;
    accountId: string;
    envelopeArgs: EnvelopeArgs;
  } {
    const envelopeArgs: EnvelopeArgs = {
      signerEmail: requestBody.body.signer_email,
      signerName: requestBody.body.signer_name,
      ccEmail: requestBody.body.cc_email,
      ccName: requestBody.body.cc_name,
      status: "sent",
      uploadFiles: this.uploadFiles,
    };
    return {
      accessToken: accessToken,
      basePath: basePath,
      accountId: apiAccountId,
      envelopeArgs: envelopeArgs,
    };
  }

  /**
   * Runs the function asynchronously.
   *
   * @param {Request} requestBody - The request body containing signer and carbon copy information.
   * @return {Promise<string | undefined>} The envelope ID of the sent envelope, or undefined if an error occurred.
   */
  public async run(requestBody: Request): Promise<string | undefined | object> {
    try {
      const accountInfo = await this.authenticate();
      const args = this.getArgs(
        accountInfo.apiAccountId,
        accountInfo.accessToken,
        accountInfo.basePath,
        requestBody
      );
      const envelopeId = await signingViaEmail.sendEnvelope(args);
      return envelopeId.envelopeId;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return { error: "envelopeId not created" };
      } else {
        return { error: "An unknown error occurred" };
      }
    }
  }
}
