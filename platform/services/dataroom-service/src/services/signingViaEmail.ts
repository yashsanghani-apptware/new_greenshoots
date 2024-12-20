import * as fs from 'fs-extra';
import * as docusign from 'docusign-esign';
import path from 'path';

interface EnvelopeArgs {
  signerEmail: string;
  signerName: string;
  ccEmail: string;
  ccName: string;
  status: string;
  uploadFiles: string[];
}

interface Args {
  basePath: string;
  accessToken: string;
  accountId: string;
  envelopeArgs: EnvelopeArgs;
}

/**
 * Sends an envelope for signing via email using the DocuSign API.
 *
 * @param {Args} args - The arguments for sending the envelope.
 * @param {string} args.basePath - The base path for the DocuSign API.
 * @param {string} args.accessToken - The access token for authentication.
 * @param {string} args.accountId - The account ID for the DocuSign account.
 * @param {EnvelopeArgs} args.envelopeArgs - The arguments for creating the envelope.
 * @param {string} args.envelopeArgs.signerEmail - The email address of the signer.
 * @param {string} args.envelopeArgs.signerName - The name of the signer.
 * @param {string} args.envelopeArgs.ccEmail - The email address of the CC recipient.
 * @param {string} args.envelopeArgs.ccName - The name of the CC recipient.
 * @param {string} args.envelopeArgs.status - The status of the envelope.
 * @return {Promise<{ envelopeId: string | undefined }>} - A promise that resolves to the envelope ID if successful, otherwise undefined.
 */
export const sendEnvelope = async (args: Args): Promise<{ envelopeId: string | undefined }> => {
  const dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(args.basePath);
  dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + args.accessToken);
  const envelopesApi = new docusign.EnvelopesApi(dsApiClient);

  // Make the envelope request body
  const envelope = makeEnvelope(args.envelopeArgs);

  // Call the Envelopes::create API method
  // Exceptions will be caught by the calling function
  const results = await envelopesApi.createEnvelope(args.accountId, {
    envelopeDefinition: envelope,
  });
  const envelopeId = results.envelopeId;

  return { envelopeId: envelopeId };
};


/**
 * Creates a DocuSign envelope definition with the given arguments.
 *
 * @param {EnvelopeArgs} args - The arguments for creating the envelope.
 * @return {docusign.EnvelopeDefinition} The created envelope definition.
 */
function makeEnvelope(args: EnvelopeArgs): docusign.EnvelopeDefinition {
  // create the envelope definition
  const env = new (docusign as any).EnvelopeDefinition();
  env.emailSubject = 'Please sign this document set';

  let documentsList: any[] = []
  args.uploadFiles.map((file, index) => {
    const fileBytes = fs.readFileSync(file);
    const doc = new (docusign as any).Document();
    const docb64 = Buffer.from(fileBytes).toString('base64');
    doc.documentBase64 = docb64;
    const fileName = path.basename(file);
    const fileExtension = path.extname(file).replace('.', '');
    doc.name = fileName;
    doc.fileExtension = fileExtension;
    doc.documentId = `${index+1}`;
    documentsList.push(doc);
  });

  // The order in the docs array determines the order in the envelope
  env.documents = documentsList;

  // create a signer recipient to sign the document, identified by name and email
  // We"re setting the parameters via the object creation
  // @ts-ignore
  const signer1 = docusign.Signer.constructFromObject({
    email: args.signerEmail,
    name: args.signerName,
    recipientId: '1',
    routingOrder: '1',
  });
  const cc1 = new (docusign as any).CarbonCopy();
  cc1.email = args.ccEmail;
  cc1.name = args.ccName;
  cc1.routingOrder = '2';
  cc1.recipientId = '2';

  // Create signHere fields (also known as tabs) on the documents,
  // We're using anchor (autoPlace) positioning
  //
  // The DocuSign platform searches throughout your envelope"s
  // documents for matching anchor strings. So the
  // signHere2 tab will be used in both document 2 and 3 since they
  // use the same anchor string for their "signer 1" tabs.
  // @ts-ignore
  const signHere1 = docusign.SignHere.constructFromObject({
    anchorString: '**signature_1**',
    anchorUnits: 'pixels',
    anchorYOffset: '10',
    anchorXOffset: '20',
  });
// @ts-ignore
  const signHere2 = docusign.SignHere.constructFromObject({
    anchorString: '/sn1/',
    anchorUnits: 'pixels',
    anchorYOffset: '10',
    anchorXOffset: '20',
  });

  // Tabs are set per recipient / signer
  // @ts-ignore
  const signer1Tabs = docusign.Tabs.constructFromObject({
    signHereTabs: [signHere1, signHere2],
  });
  signer1.tabs = signer1Tabs;

  // Add the recipients to the envelope object
  // @ts-ignore
  const recipients = docusign.Recipients.constructFromObject({
    signers: [signer1],
    carbonCopies: [cc1],
  });
  env.recipients = recipients;
  // Request that the envelope be sent by setting |status| to "sent".
  // To request that the envelope be created as a draft, set to "created"
  env.status = args.status;

  return env;
}

/**
 * Generates an HTML document with dynamic content based on the provided EnvelopeArgs.
 *
 * @param {EnvelopeArgs} args - The arguments used to populate the dynamic content of the document.
 * @return {string} The generated HTML document as a string.
 * MIGHT BE USEFULL IN THE FUTURE
 */
const document1 = (args: EnvelopeArgs): string => {
  return `
  <!DOCTYPE html>
  <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family:sans-serif;margin-left:2em;">
      <h1 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
          color: darkblue;margin-bottom: 0;">World Wide Corp</h1>
      <h2 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
        margin-top: 0px;margin-bottom: 3.5em;font-size: 1em;
        color: darkblue;">Order Processing Division</h2>
      <h4>Ordered by ${args.signerName}</h4>
      <p style="margin-top:0em; margin-bottom:0em;">Email: ${args.signerEmail}</p>
      <p style="margin-top:0em; margin-bottom:0em;">Copy to: ${args.ccName}, ${args.ccEmail}</p>
      <p style="margin-top:3em;">
        Candy bonbon pastry jujubes lollipop wafer biscuit biscuit. Topping brownie sesame snaps
        sweet roll pie marzipan dragée macaroon. Chocolate bar lollipop candy canes. Biscuit
        croissant apple pie pudding caramels wafer tart tootsie roll macaroon dessert.
      </p>
      <h3 style="margin-top:3em;">Agreed: <span style="color:white;">**signature_1**/</span></h3>
      </body>
  </html>
  `;
};
