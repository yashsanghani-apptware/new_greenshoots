# Detailed Design Specifications for Data Room Service
## Overview
The Data Room Service is designed to provide a secure and organized way to store, manage, and access documents and files. It supports fine-grained access control, audit tracking, and integration with external storage systems and document signing services. The service comprises multiple components, including data rooms, cabinets, and files, each with specific attributes and permissions.

## Architecture
Frontend: The frontend will be built using a modern JavaScript framework like React or Angular. It will provide a user-friendly interface for managing data rooms, cabinets, and files.
Backend: The backend will be built using Python Django and Django Rest Framework (DRF) to provide RESTful APIs. Celery will be used for asynchronous tasks, RabbitMQ as the message broker, and Postgres as the database.
Storage: Amazon S3 will be used for file storage, with URLs embedded in the data room metadata.
Security: AWS Key Management Service (KMS) will be used for managing encryption keys.
Audit Logging: All access to files and documents will be logged for auditing purposes.
E-Signing: Integration with Docusign for electronic document signing.
## Data Models
### Data Room Model
```
class DataRoom(models.Model):
    dataroom_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    farm_id = models.UUIDField()
    name = models.CharField(max_length=255)
    description = models.TextField()
    user_id = models.UUIDField()  # Owner of the data room
    creation_date = models.DateTimeField(auto_now_add=True)
    key_info = models.JSONField()  # Encryption key information
    permissions = models.ManyToManyField('Permission', related_name='dataroom_permissions')
```
### Cabinet Model
```
class Cabinet(models.Model):
    cabinet_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dataroom = models.ForeignKey(DataRoom, on_delete=models.CASCADE, related_name='cabinets')
    name = models.CharField(max_length=255)
    description = models.TextField()
    user_id = models.UUIDField()  # Owner of the cabinet
    creation_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, choices=[('REGULAR', 'Regular'), ('SECURE', 'Secure')])
    permissions = models.ManyToManyField('Permission', related_name='cabinet_permissions')
```
### File Model
```
class File(models.Model):
    file_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cabinet = models.ForeignKey(Cabinet, on_delete=models.CASCADE, related_name='files')
    name = models.CharField(max_length=255)
    description = models.TextField()
    user_id = models.UUIDField()  # Owner of the file
    creation_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, choices=[('SHARED', 'Shared'), ('TEMPLATES', 'Templates'), ('SECURE', 'Secure')])
    status = models.CharField(max_length=20)
    permissions = models.ManyToManyField('Permission', related_name='file_permissions')
```
### Permission Model
```
class Permission(models.Model):
    permission_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=10, choices=[('VIEW', 'View'), ('READ', 'Read'), ('WRITE', 'Write'), ('CREATE', 'Create')])
    roles = models.JSONField()  # List of roles that have this permission
    users = models.JSONField()  # List of users that have this permission
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
```
## API Endpoints
### Data Room Endpoints

`GET /datarooms/{dataroom_id}`

- Fetch a specific data room by its ID.
- Response: Data room details including cabinets and permissions.

`GET /datarooms`

- Fetch a list of all data rooms.
- Response: List of data rooms.

`POST /datarooms`

- Create a new data room.
- Request Body: Data room attributes (name, description, user_id, etc.)
- Response: Created data room details.

`PUT /datarooms/{dataroom_id}`

- Update an existing data room.
- Request Body: Attributes to update.
- Response: Updated data room details.

`DELETE /datarooms/{dataroom_id}`

- Delete a data room.
- Response: Deleted data room details.

`GET /datarooms/{dataroom_id}/permissions/{permission_id}`

- Fetch a specific permission for a data room.
- Response: Permission details.

`GET /datarooms/{dataroom_id}/permissions`

- Fetch a list of all permissions for a data room.
- Response: List of permissions.

`POST /datarooms/{dataroom_id}/permissions`

- Create a new permission for a data room.
- Request Body: Permission attributes (type, roles, users, start_time, end_time).
- Response: Created permission details.

`PUT /datarooms/{dataroom_id}/permissions/{permission_id}`

- Update an existing permission for a data room.
- Request Body: Attributes to update.
- Response: Updated permission details.

`DELETE /datarooms/{dataroom_id}/permissions/{permission_id}`

- Delete a permission for a data room.
- Response: Deleted permission details.

`POST /datarooms/{dataroom_id}/user/{user_id}/checkpermission`

- Check if a user has the required permissions for the data room.
- Request Body: Required permissions.
- Response: Permission check result.

### Cabinet Endpoints

`GET /cabinets/{cabinet_id}`

- Fetch a specific cabinet by its ID.
- Response: Cabinet details including files and permissions.

`GET /cabinets`

- Fetch a list of all cabinets.
- Response: List of cabinets.

`POST /cabinets`

- Create a new cabinet.
- Request Body: Cabinet attributes (name, description, user_id, etc.)
- Response: Created cabinet details.

`PUT /cabinets/{cabinet_id}`

- Update an existing cabinet.
- Request Body: Attributes to update.
- Response: Updated cabinet details.

`DELETE /cabinets/{cabinet_id}`

- Delete a cabinet.
- Response: Deleted cabinet details.

`GET /cabinets/{cabinet_id}/permissions/{permission_id}`

- Fetch a specific permission for a cabinet.
- Response: Permission details.

`GET /cabinets/{cabinet_id}/permissions`

- Fetch a list of all permissions for a cabinet.
- Response: List of permissions.

`POST /cabinets/{cabinet_id}/permissions`

- Create a new permission for a cabinet.
- Request Body: Permission attributes (type, roles, users, start_time, end_time).
- Response: Created permission details.

`PUT /cabinets/{cabinet_id}/permissions/{permission_id}`

- Update an existing permission for a cabinet.
- Request Body: Attributes to update.
- Response: Updated permission details.

`DELETE /cabinets/{cabinet_id}/permissions/{permission_id}`

- Delete a permission for a cabinet.
- Response: Deleted permission details.

`POST /cabinets/{cabinet_id}/user/{user_id}/checkpermission`

- Check if a user has the required permissions for the cabinet.
- Request Body: Required permissions.
- Response: Permission check result.

### File Endpoints

`GET /cabinets/{cabinet_id}/files/{file_id}`

- Fetch a specific file in a cabinet by its ID.
- Response: File details including permissions.

`GET /cabinets/{cabinet_id}/files`

- Fetch a list of all files in a cabinet.
- Response: List of files.

`POST /cabinets/{cabinet_id}/file`s

- Create a new file in a cabinet.
- Request Body: File attributes (name, description, user_id, type, status, etc.)
- Response: Created file details.

`PUT /cabinets/{cabinet_id}/files/{file_id}`

- Update an existing file in a cabinet.
- Request Body: Attributes to update.
- Response: Updated file details.

`DELETE /cabinets/{cabinet_id}/files/{file_id}`

- Delete a file in a cabinet.
- Response: Deleted file details.

`GET /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}`

- Fetch the particular permission of a file in a cabinet.
- Response: Permission details.

`GET /cabinets/{cabinet_id}/files/{file_id}/permissions`

- Fetch a list of all permissions for a file in a cabinet.
- Response: List of permissions.

`POST /cabinets/{cabinet_id}/files/{file_id}/permissions`

- Create a new permission for a file in a cabinet.
- Request Body: Permission attributes (type, roles, users, start_time, end_time).
- Response: Created permission details.

`PUT /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}`

- Update an existing file permission in a cabinet.
- Request Body: Attributes to update.
- Response: Updated permission details.

`DELETE /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}`

- Delete a file permission.
- Response: Deleted permission details.

`POST /cabinets/{cabinet_id}/files/{file_id}/user/{user_id}/checkpermission`

- Check if a user has the required permissions to access the file in a cabinet.
- Request Body: Required permissions.
- Response: Permission check result.

## Document E-Signing Integration
### Docusign API Integration:

  - Envelopes: Used to group documents for signing.
  - Documents: The files to be signed.
  - Recipients: Users who will sign the documents.
  - Tabs: Signature fields and other data fields.

- Remote Signing: Envelopes sent to recipients for signing remotely.

- Embedded Signing: Signing done within the application's UI.

@Amol: 
### I have some questions related to this part of Document E-signing
1. What are the primary use cases for document signing in your application?
2. Do we require support for both remote and embedded signing?
3. We need to think on how to handle failed signing attempts or errors?
4. What kind of notifications or alerts we need for document signing status?

### I explored the Node js packages for this Document E-Signing Integration here what I found 
- package: docusign-esign
- Authentication:
Use OAuth 2.0 to authenticate with the DocuSign API. You will need client ID, client secret, and redirect URI from your DocuSign developer account.

```
const docusign = require('docusign-esign');
const oAuth = new docusign.ApiClient();

oAuth.setOAuthBasePath('account-d.docusign.com'); // Sandbox, use account.docusign.com for production

const getAccessToken = async () => {
  const results = await oAuth.requestJWTUserToken(clientId, userId, scopes, privateKey, expiresIn);
  const accessToken = results.body.access_token;
  return accessToken;
};
```
- Create and Send an Envelope:
```
  const sendEnvelope = async (accessToken) => {
  const envelopesApi = new docusign.EnvelopesApi();
  const envelopeDefinition = new docusign.EnvelopeDefinition();
  
  envelopeDefinition.emailSubject = 'Please sign this document';
  
  // Add a document
  const document = new docusign.Document();
  document.documentBase64 = Buffer.from('Your document content').toString('base64');
  document.name = 'Sample Document';
  document.fileExtension = 'pdf';
  document.documentId = '1';
  
  envelopeDefinition.documents = [document];
  
  // Add a recipient
  const signer = new docusign.Signer();
  signer.email = 'recipient@example.com';
  signer.name = 'Recipient Name';
  signer.recipientId = '1';
  signer.routingOrder = '1';
  
  // Add a sign here tab
  const signHere = new docusign.SignHere();
  signHere.documentId = '1';
  signHere.pageNumber = '1';
  signHere.recipientId = '1';
  signHere.tabLabel = 'SignHere';
  signHere.xPosition = '100';
  signHere.yPosition = '150';
  
  signer.tabs = { signHereTabs: [signHere] };
  
  envelopeDefinition.recipients = { signers: [signer] };
  envelopeDefinition.status = 'sent'; // To send the envelope
  
  const accountId = 'your_account_id';
  
  const result = await envelopesApi.createEnvelope(accountId, { envelopeDefinition });
  console.log(`Envelope created! Envelope ID: ${result.envelopeId}`);
  };

  const main = async () => {
  const accessToken = await getAccessToken();
  await sendEnvelope(accessToken);
  };

  main();
```

- Embedded Signing:
  
```
  const getRecipientView = async (envelopeId, recipient) => {
  const envelopesApi = new docusign.EnvelopesApi();
  const viewRequest = new docusign.RecipientViewRequest();
  
  viewRequest.returnUrl = 'http://localhost:3000/signed'; // Redirect URL after signing
  viewRequest.authenticationMethod = 'email';
  viewRequest.email = recipient.email;
  viewRequest.userName = recipient.name;
  viewRequest.recipientId = recipient.recipientId;
  viewRequest.clientUserId = recipient.clientUserId;
  
  const accountId = 'your_account_id';
  
  const viewResult = await envelopesApi.createRecipientView(accountId, envelopeId, { recipientViewRequest: viewRequest });
  console.log(`Recipient view URL: ${viewResult.url}`);
  };

  const recipient = {
    email: 'recipient@example.com',
    name: 'Recipient Name',
    recipientId: '1',
    clientUserId: '1001'
  };

  const main = async () => {
    const accessToken = await getAccessToken();
    const envelopeId = await sendEnvelope(accessToken);
    await getRecipientView(envelopeId, recipient);
  };

  main();
```


## Storage System
- Amazon S3: Primary storage for files.
- URL Embedding: File URLs embedded in the data room metadata.
- Flexible Storage: Designed to switch to different storage systems in the future.

@Amol:
I explored several storage options beyond Amazon S3, including:

1. Azure Blob Storage
2. DigitalOcean Spaces
3. Backblaze B2

## After consideration, I believe Amazon S3 is the best option due to the following advantages:
1. Automatically scales to handle vast amounts of data, supporting applications of any size and growth rate.
2. Offers 99% durability and 99.99% availability, ensuring data security and accessibility.
3. Robust security features, including encryption at rest and in transit, IAM policies, and integration with AWS Key Management Service (KMS).
4. Performance: Provides low-latency access and high throughput, ideal for fast and reliable data retrieval.
5. Includes versioning, cross-region replication, lifecycle policies, and event notifications for enhanced data management.
6. Use AWS CloudFront or another CDN to improve access speeds for frequently accessed files.

In conclusion, Amazon S3's scalability, durability, security, and integration with the broader AWS ecosystem make it the superior choice for primary file storage.


## Security and Audit
- Encryption: AWS KMS for managing encryption keys.
- Access Control: Fine-grained permissions at data room, cabinet, and file levels.
- Audit Logs: Tracking who accessed files, when, and for how long.

These detailed design specifications outline the architecture, data models, API endpoints, and integration points for the Data Room Service, ensuring secure and organized document management with fine-grained access control and comprehensive audit tracking.



@Amol:
1. Data Encryption: Ensure end-to-end encryption, not only for stored data but also for data in transit
2. Version Control: Implement version control for files to allow users to revert to previous versions.
3. Search Functionality: Add a powerful search engine (like Elasticsearch) to enable fast and efficient searching of documents and metadata.
4. Bulk Operations: Allow bulk upload, download, and permission management for efficiency.
5. API Documentation: Provide comprehensive API documentation using tools like Swagger.

