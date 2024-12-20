# Functional Specifications for the Data Room Service
## Overview
The Data Room Service provides a secure and organized way to store documents and files, supporting fine-grained access control and extensive audit tracking. Three types of files are supported: SHARED, TEMPLATES, and SECURE. Each property or farm can have its own data room, with cabinets for organizing files. The service integrates with external storage systems like S3 and supports document e-signing through Docusign.

## Functional Components
### Data Room
A data room is a secure container for organizing documents and files with fine-grained access control and audit tracking. Each data room can have multiple cabinets and supports different types of files.

#### Attributes:

- dataroom_id: Unique identifier for the data room.
- farm_id: Identifier of the farm associated with the data room.
- name: Name of the data room.
- description: Description of the data room.
- user_id: Owner of the data room.
- creation_date: Date the data room was created.
- key_info: Encryption key information.
- permissions: List of permissions associated with the data room.

#### Permissions:

- permission_id: Unique identifier for the permission.
- type: Type of permission (View, Read, Write, Create).
- roles: List of roles that have this permission.
- users: List of users that have this permission.
- start_time: Start time for the permission.
- end_time: End time for the permission.

### Cabinet
A cabinet is a container within a data room for organizing different types of files. Cabinets can have their own permissions and may support additional processes like document signing.

#### Attributes:

- cabinet_id: Unique identifier for the cabinet.
- dataroom_id: Identifier of the data room the cabinet belongs to.
- name: Name of the cabinet.
- description: Description of the cabinet.
- user_id: Owner of the cabinet.
- creation_date: Date the cabinet was created.
- type: Type of cabinet (REGULAR, SECURE).
- permissions: List of permissions associated with the cabinet.
- files: List of files within the cabinet.

#### Permissions:

- permission_id: Unique identifier for the permission.
- type: Type of permission (View, Read, Write, Create).
- roles: List of roles that have this permission.
- users: List of users that have this permission.
- start_time: Start time for the permission.
- end_time: End time for the permission.

### File
A file is a document or other item stored within a cabinet. Files can inherit permissions from their parent cabinet or have their own more restrictive permissions.

#### Attributes:

- file_id: Unique identifier for the file.
- cabinet_id: Identifier of the cabinet the file belongs to.
- name: Name of the file.
- description: Description of the file.
- user_id: Owner of the file.
- creation_date: Date the file was created.
- type: Type of file (SHARED, TEMPLATES, SECURE).
- status: Status of the file (e.g., signed, unsigned).
- permissions: List of permissions associated with the file.

#### Permissions:

- permission_id: Unique identifier for the permission.
- type: Type of permission (View, Read, Write, Create).
- roles: List of roles that have this permission.
- users: List of users that have this permission.
- start_time: Start time for the permission.
- end_time: End time for the permission.

## File Types
### SHARED

- Description: Shareable files like images, videos, maps, webinars.
- Security: Stored without encryption and extensive logging.
- Use Cases: Files shared among multiple users.

### TEMPLATES

- Description: Document, envelope, and template files for e-signing.
- Security: Encrypted, extensive logging.
- Use Cases: Documents that require e-signing, automatically moved to secure area post-signing.

### SECURE

- Description: Legal, contractual, and operational documents.
- Security: Encrypted with fine-grained access control, managed via AWS KMS.
- Use Cases: Highly sensitive documents requiring maximum security.

## API Endpoints
### Data Room Endpoints

- GET /datarooms/{dataroom_id}: Retrieve a specific data room.
- GET /datarooms: Retrieve a list of all data rooms.
- POST /datarooms: Create a new data room.
- PUT /datarooms/{dataroom_id}: Update an existing data room.
- DELETE /datarooms/{dataroom_id}: Delete a data room.
- GET /datarooms/{dataroom_id}/permissions/{permission_id}: Retrieve a specific data room permission.
- GET /datarooms/{dataroom_id}/permissions: Retrieve a list of all permissions for a data room.
- POST /datarooms/{dataroom_id}/permissions: Create a new data room permission.
- PUT /datarooms/{dataroom_id}/permissions/{permission_id}: Update an existing data room permission.
- DELETE /datarooms/{dataroom_id}/permissions/{permission_id}: Delete a data room permission.
- POST /datarooms/{dataroom_id}/user/{user_id}/checkpermission: Check if a user has the required permissions for the data room.

### Cabinet Endpoints

- GET /cabinets/{cabinet_id}: Retrieve a specific cabinet.
- GET /cabinets: Retrieve a list of all cabinets.
- POST /cabinets: Create a new cabinet.
- PUT /cabinets/{cabinets_id}: Update an existing cabinet.
- DELETE /cabinets/{cabinet_id}: Delete a cabinet.
- GET /cabinets/{cabinet_id}/permissions/{permission_id}: Retrieve a specific cabinet permission.
- GET /cabinets/{cabinet_id}/permissions: Retrieve a list of all permissions for a cabinet.
- POST /cabinets/{cabinets_id}/permissions: Create a new cabinet permission.
- PUT /cabinets/{cabinet_id}/permissions/{permission_id}: Update an existing cabinet permission.
- DELETE /cabinets/{cabinet_id}/permissions/{permission_id}: Delete a cabinet permission.
- POST /cabinets/{cabinet_id}/user/{user_id}/checkpermission: Check if a user has the required permissions for the cabinet.

### File Endpoints

- GET /cabinets/{cabinet_id}/files/{file_id}: Retrieve a specific file in a cabinet.
- GET /cabinets/{cabinet_id}/files: Retrieve a list of all files in a cabinet.
- POST /cabinets/{cabinet_id}/files: Create a new file in the cabinet.
- PUT /cabinets/{cabinets_id}/files/{file_id}: Update an existing file in a cabinet.
- DELETE /cabinets/{cabinet_id}/files/{file_id}: Delete a file in a cabinet.
- GET /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}: Retrieve the particular permission of a file in a cabinet.
- GET /cabinets/{cabinet_id}/files/{file_id}/permissions: Retrieve a list of all permissions for a file in a cabinet.
- POST /cabinets/{cabinets_id}/files/{file_id}/permissions: Create a new permission for a file in the cabinet.
- PUT /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}: Update an existing file permission in a cabinet.
- DELETE /cabinets/{cabinet_id}/files/{file_id}/permissions/{permission_id}: Delete a file permission.
- POST /cabinets/{cabinet_id}/files/{file_id}/user/{user_id}/checkpermission: Check if a user has the required permissions to access the file in the cabinet.

## Document E-Signing
Integration with Docusign eSignature API for electronically signing and tracking documents. Supports remote and embedded signing processes.

### Key Components:

- Envelopes: Containers for Docusign transactions, including documents, sender and recipient information, and status tracking.
- Documents: Files to be signed electronically.
- Recipients: Users who will sign the documents.
- Tabs: Fields for signatures and other data.

### E-Signing Methods:

- Remote Signing: Envelopes are sent to recipients for remote signing.
- Embedded Signing: Signing is done within the application's UI.

## Storage System
Files are stored in a storage system like S3, with the location URL embedded within the data room. The system is designed to allow flexibility in switching to different storage systems in the future.
