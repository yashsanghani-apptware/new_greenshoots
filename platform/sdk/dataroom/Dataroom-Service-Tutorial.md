# Developer Guide for DataRoomClient

This developer guide will walk you through using the `DataRoomClient` class for managing Data Rooms, Cabinets, Files, and document workflows via a RESTful API. The `DataRoomClient` leverages `axios` for HTTP requests.

## Overview

The `DataRoomClient` class provides methods for:
- Creating, retrieving, updating, and deleting Data Rooms.
- Creating, retrieving, updating, and deleting Cabinets within Data Rooms.
- Uploading, retrieving, updating, and deleting Files within Cabinets.
- Managing document workflows, such as routing for document signatures via DocuSign.
- Subscribing for Data Room events.

## Installation

First, ensure you have `axios` installed in your project:

```bash
npm install @agsiri/dataroom-client
```

## Usage

### Importing the Client

To use the `DataRoomClient`, you need to import it into your project:

```typescript
import DataRoomClient from '@agsiri/dataroom-client';
```

### Initialization

Initialize the client with the base URL of your API:

```typescript
const client = new DataRoomClient('https://api.agsiri.com');
```

## DataRoom Methods

### Creating a Data Room

```typescript
const newDataRoom: DataRoom = {
  client_id: 'client123',
  name: 'New Data Room',
  description: 'Description of the new data room',
  user_id: 'user123',
  key_info: {}
};

client.createDataRoom(newDataRoom).then(response => {
  console.log('Created Data Room:', response.data);
}).catch(error => {
  console.error('Error creating Data Room:', error);
});
```

### Getting a Data Room by ID

```typescript
const dataRoomId = 'dataroom123';

client.getDataRoom(dataRoomId).then(response => {
  console.log('Data Room:', response.data);
}).catch(error => {
  console.error('Error getting Data Room:', error);
});
```

### Getting a List of Data Rooms

```typescript
client.getDataRooms().then(response => {
  console.log('List of Data Rooms:', response.data);
}).catch(error => {
  console.error('Error getting Data Rooms:', error);
});
```

### Updating a Data Room

```typescript
const updatedDataRoom: DataRoom = {
  client_id: 'client123',
  name: 'Updated Data Room',
  description: 'Updated description of the data room',
  user_id: 'user123',
  key_info: {}
};

client.updateDataRoom('dataroom123', updatedDataRoom).then(response => {
  console.log('Updated Data Room:', response.data);
}).catch(error => {
  console.error('Error updating Data Room:', error);
});
```

### Deleting a Data Room

```typescript
client.deleteDataRoom('dataroom123').then(response => {
  console.log('Deleted Data Room:', response.data);
}).catch(error => {
  console.error('Error deleting Data Room:', error);
});
```

## Cabinet Methods

### Creating a Cabinet

```typescript
const newCabinet: Cabinet = {
  dataroom: 'dataroom123',
  name: 'New Cabinet',
  description: 'Description of the new cabinet',
  user_id: 'user123',
  type: 'REGULAR'
};

client.createCabinet(newCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});
```

### Getting a Cabinet by ID

```typescript
const dataroomId = 'dataroom123';
const cabinetId = 'cabinet123';

client.getCabinet(dataroomId, cabinetId).then(response => {
  console.log('Cabinet:', response.data);
}).catch(error => {
  console.error('Error getting Cabinet:', error);
});
```

### Getting a List of Cabinets

```typescript
const dataroomId = 'dataroom123';

client.getCabinets(dataroomId).then(response => {
  console.log('List of Cabinets:', response.data);
}).catch(error => {
  console.error('Error getting Cabinets:', error);
});
```

### Updating a Cabinet

```typescript
const updatedCabinet: Cabinet = {
  dataroom: 'dataroom123',
  name: 'Updated Cabinet',
  description: 'Updated description of the cabinet',
  user_id: 'user123',
  type: 'REGULAR'
};

client.updateCabinet('dataroom123', 'cabinet123', updatedCabinet).then(response => {
  console.log('Updated Cabinet:', response.data);
}).catch(error => {
  console.error('Error updating Cabinet:', error);
});
```

### Deleting a Cabinet

```typescript
const dataroomId = 'dataroom123';
const cabinetId = 'cabinet123';

client.deleteCabinet(dataroomId, cabinetId).then(response => {
  console.log('Deleted Cabinet:', response.data);
}).catch(error => {
  console.error('Error deleting Cabinet:', error);
});
```

## File Methods

### Uploading a File

```typescript
const newFile: File = {
  cabinet_id: 'cabinet123',
  name: 'New File',
  description: 'Description of the new file',
  user_id: 'user123',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'h[Ottp://example.com/file.pdf'
};

client.uploadFile(newFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});
```

### Getting a File by ID

```typescript
const cabinetId = 'cabinet123';
const fileId = 'file123';

client.getFile(cabinetId, fileId).then(response => {
  console.log('File:', response.data);
}).catch(error => {
  console.error('Error getting File:', error);
});
```

### Getting a List of Files

```typescript
const cabinetId = 'cabinet123';

client.getFiles(cabinetId).then(response => {
  console.log('List of Files:', response.data);
}).catch(error => {
  console.error('Error getting Files:', error);
});
```

### Updating a File

```typescript
const updatedFile: File = {
  cabinet_id: 'cabinet123',
  name: 'Updated File',
  description: 'Updated description of the file',
  user_id: 'user123',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/updated_file.pdf'
};

client.updateFile('cabinet123', 'file123', updatedFile).then(response => {
  console.log('Updated File:', response.data);
}).catch(error => {
  console.error('Error updating File:', error);
});
```

### Deleting a File

```typescript
const cabinetId = 'cabinet123';
const fileId = 'file123';

client.deleteFile(cabinetId, fileId).then(response => {
  console.log('Deleted File:', response.data);
}).catch(error => {
  console.error('Error deleting File:', error);
});
```

## Document Workflow Methods

### Routing for Document Signatures via DocuSign

You can route documents for signatures using DocuSign. This method will send a document for signature and return the status.

```typescript
// Usage
  const demoFolderPath = './demoUploads'; // Change this to your actual folder path
  // Create a new FormData instance
  const formData = new FormData();
  // Read all files from the demo folder
  const files = fs.readdirSync(demoFolderPath);
  // Append each file to the FormData
  files.forEach((file) => {
    const filePath = path.join(demoFolderPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const fileBlob = new Blob([fileBuffer], { type: 'application/octet-stream' });
    formData.append('files', fileBlob, file);
  });
  // Append other form fields
  formData.append('signer_email', '<email-id>'); // Add Signer's email address
  formData.append('signer_name', '<name>');
  formData.append('cc_email', '<email-id>');
  formData.append('cc_name', '<name>');

  client.routeForSignature(formData).then(response => {
    console.log('Envelope Signature', { data: response });
  }).catch(error => {
    console.error('Error deleting File:', error);
  });
```

### Subscribing to Data Room Events

You can subscribe to events related to a Data Room, such as when a document is uploaded or updated.

```typescript
interface EventSubscription {
  dataroom_id: string;
  event_type: string;
  callback_url: string;
}

client.subscribeToEvent(eventSubscription: EventSubscription): Promise<AxiosResponse<{ message: string }>> {
  return this.client.post('/events/subscribe', eventSubscription);
}

// Usage
const eventSubscription: EventSubscription = {
  dataroom_id: 'dataroom123',
  event_type: 'document.uploaded',
  callback_url: 'https://example.com/webhook'
};

client.subscribeToEvent(eventSubscription).then(response => {
  console.log('Subscription message:', response.data);
}).catch(error => {
  console.error('Error subscribing to event:', error);
});
```

## Real-World Usage Scenarios

### Scenario 1: Financial Due Diligence

A financial firm needs to create a secure Data Room for due diligence during an acquisition. The Data Room will store sensitive financial documents and provide access to authorized users only.

1. **Create a Data Room:**

```typescript
const dataRoom: DataRoom = {
  client_id: 'financialFirm123',
  name: 'Acquisition Due Diligence',
  description: 'Data Room for financial due diligence',
  user_id: 'user001',
  key_info: { deal: 'Acquisition of Company XYZ' }
};

client.createDataRoom(dataRoom).then(response => {
  console.log('Created Data Room:', response.data);
}).catch(error => {
  console.error('Error creating Data Room:', error);
});


```

2. **Create Cabinets within the Data Room:**

```typescript
const cabinet: Cabinet = {
  dataroom: 'dataroom123',
  name: 'Financial Reports',
  description: 'Cabinet for storing financial reports',
  user_id: 'user001',
  type: 'SECURE'
};

client.createCabinet(cabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});
```

3. **Upload Files to the Cabinet:**

```typescript
const file: File = {
  cabinet_id: 'cabinet123',
  name: 'Q1 Financial Report',
  description: 'Quarter 1 financial report of Company XYZ',
  user_id: 'user001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/q1_report.pdf'
};

client.uploadFile(file).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});
```

4. **Route a Document for Signature via DocuSign:**

```typescript
const docuSignRequest: DocuSignRequest = {
  document_id: 'file123',
  signers: [
    { email: 'ceo@example.com', name: 'CEO' },
    { email: 'cfo@example.com', name: 'CFO' }
  ]
};

client.routeForSignature(docuSignRequest).then(response => {
  console.log('DocuSign status:', response.data);
}).catch(error => {
  console.error('Error routing for signature:', error);
});
```

5. **Subscribe to Data Room Events:**

```typescript
const eventSubscription: EventSubscription = {
  dataroom_id: 'dataroom123',
  event_type: 'document.uploaded',
  callback_url: 'https://example.com/webhook'
};

client.subscribeToEvent(eventSubscription).then(response => {
  console.log('Subscription message:', response.data);
}).catch(error => {
  console.error('Error subscribing to event:', error);
});
```

### Scenario 2: Legal Case Management

A law firm uses Data Rooms to organize documents for various legal cases. Each case has its own Data Room, and different types of documents (e.g., evidence, correspondence) are organized into Cabinets.

1. **Create a Data Room for a Legal Case:**

```typescript
const dataRoom: DataRoom = {
  client_id: 'lawFirm123',
  name: 'Case 45678',
  description: 'Data Room for legal case 45678',
  user_id: 'lawyer001',
  key_info: { case: '45678' }
};

client.createDataRoom(dataRoom).then(response => {
  console.log('Created Data Room:', response.data);
}).catch(error => {
  console.error('Error creating Data Room:', error);
});
```

2. **Create Cabinets for Different Document Types:**

```typescript
const evidenceCabinet: Cabinet = {
  dataroom: 'dataroom45678',
  name: 'Evidence',
  description: 'Cabinet for storing evidence documents',
  user_id: 'lawyer001',
  type: 'REGULAR'
};

client.createCabinet(evidenceCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});

const correspondenceCabinet: Cabinet = {
  dataroom: 'dataroom45678',
  name: 'Correspondence',
  description: 'Cabinet for storing correspondence',
  user_id: 'lawyer001',
  type: 'REGULAR'
};

client.createCabinet(correspondenceCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});
```

3. **Upload Files to the Cabinets:**

```typescript
const evidenceFile: File = {
  cabinet_id: 'cabinetEvidence',
  name: 'Exhibit A',
  description: 'Photograph of the crime scene',
  user_id: 'lawyer001',
  type: 'IMAGE',
  status: 'ACTIVE',
  url: 'http://example.com/exhibit_a.jpg'
};

client.uploadFile(evidenceFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});

const correspondenceFile: File = {
  cabinet_id: 'cabinetCorrespondence',
  name: 'Email from Client',
  description: 'Email from the client regarding the case',
  user_id: 'lawyer001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/email.pdf'
};

client.uploadFile(correspondenceFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});
```

4. **Route a Document for Signature via DocuSign:**

```typescript
const docuSignRequest: DocuSignRequest = {
  document_id: 'file123',
  signers: [
    { email: 'client@example.com', name: 'Client' },
    { email: 'witness@example.com', name: 'Witness' }
  ]
};

client.routeForSignature(docuSignRequest).then(response => {
  console.log('DocuSign status:', response.data);
}).catch(error => {
  console.error('Error routing for signature:', error);
});
```

5. **Subscribe to Data Room Events:**

```typescript
const eventSubscription: EventSubscription = {
  dataroom_id: 'dataroom45678',
  event_type: 'document.updated',
  callback_url: 'https://lawfirm.com/webhook'
};

client.subscribeToEvent(eventSubscription).then(response => {
  console.log('Subscription message:', response.data);
}).catch(error => {
  console.error('Error subscribing to event:', error);
});
```

### Scenario 3: Corporate Document Management

A corporation uses Data Rooms to manage internal documents. Each department has its own Data Room, and documents are categorized into Cabinets based on their type and purpose.

1. **Create a Data Room for a Department:**

```typescript
const dataRoom: DataRoom = {
  client_id: 'corporation123',
  name: 'HR Department',
  description: 'Data Room for HR Department documents',
  user_id: 'admin001',
  key_info: { department: 'HR' }
};

client.createDataRoom(dataRoom).then(response => {
  console.log('Created Data Room:', response.data);
}).catch(error => {
  console.error('Error creating Data Room:', error);
});
```

2. **Create Cabinets for Different Document Categories:**

```typescript
const policiesCabinet: Cabinet = {
  dataroom: 'dataroomHR',
  name: 'Policies',
  description: 'Cabinet for storing HR policies',
  user_id: 'admin001',
  type: 'REGULAR'
};

client.createCabinet(policiesCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});

const employeeRecordsCabinet: Cabinet = {
  dataroom: 'dataroomHR',
  name: 'Employee Records',
  description: 'Cabinet for storing employee records',
  user_id: 'admin001',
  type: 'SECURE'
};

client.createCabinet(employeeRecordsCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});
```

3. **Upload Files to the Cabinets:**

```typescript
const policyFile: File = {
  cabinet_id: 'cabinetPolicies',
  name: 'Leave Policy',
  description: 'Document detailing the leave policy',
  user_id: 'admin001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/leave_policy.pdf'
};

client.uploadFile(policyFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});

const employeeRecordFile: File = {
  cabinet_id: 'cabinetEmployeeRecords',
  name: 'John Doe Record',
  description: 'Record of employee John Doe',
  user_id: 'admin001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/john_doe_record.pdf'
};

client.uploadFile(employeeRecordFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});
```

4. **Route a Document for Signature via DocuSign:**

```typescript
const docuSignRequest: DocuSignRequest = {
  document_id: 'file123',
  signers: [
    { email: 'hr.manager@example.com', name: 'HR Manager' },
    { email: 'employee@example.com', name: 'Employee' }
  ]
};

client.routeForSignature(docuSignRequest).then(response => {
  console.log('DocuSign status:', response.data);
}).catch(error => {
  console.error('Error routing for signature:', error);
});
```

5. **Subscribe to Data Room Events:**

```typescript
const eventSubscription: EventSubscription = {
  dataroom_id: 'dataroomHR',
  event_type: 'document.uploaded',
  callback_url: 'https://corporation.com/webhook'
};

client.subscribeToEvent(eventSubscription).then(response => {
  console.log('Subscription message:', response.data);
}).catch(error => {
  console.error('

Error subscribing to event:', error);
});
```

### Scenario 4: Managing Agsiri Investor Subscription Documents

Agsiri needs to manage investor subscription documents securely. Each investor has a Data Room containing subscription documents categorized into Cabinets based on document types.

1. **Create a Data Room for an Investor:**

```typescript
const dataRoom: DataRoom = {
  client_id: 'agsiri123',
  name: 'Investor John Doe',
  description: 'Data Room for John Doe\'s subscription documents',
  user_id: 'admin001',
  key_info: { investor: 'John Doe' }
};

client.createDataRoom(dataRoom).then(response => {
  console.log('Created Data Room:', response.data);
}).catch(error => {
  console.error('Error creating Data Room:', error);
});
```

2. **Create Cabinets for Different Document Types:**

```typescript
const subscriptionCabinet: Cabinet = {
  dataroom: 'dataroomInvestorJohnDoe',
  name: 'Subscription Agreements',
  description: 'Cabinet for storing subscription agreements',
  user_id: 'admin001',
  type: 'SECURE'
};

client.createCabinet(subscriptionCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});

const complianceCabinet: Cabinet = {
  dataroom: 'dataroomInvestorJohnDoe',
  name: 'Compliance Documents',
  description: 'Cabinet for storing compliance documents',
  user_id: 'admin001',
  type: 'SECURE'
};

client.createCabinet(complianceCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});
```

3. **Upload Files to the Cabinets:**

```typescript
const subscriptionFile: File = {
  cabinet_id: 'cabinetSubscriptionAgreements',
  name: 'Subscription Agreement 2023',
  description: 'John Doe\'s subscription agreement for 2023',
  user_id: 'admin001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/subscription_agreement_2023.pdf'
};

client.uploadFile(subscriptionFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});

const complianceFile: File = {
  cabinet_id: 'cabinetComplianceDocuments',
  name: 'KYC Document',
  description: 'Know Your Customer (KYC) document for John Doe',
  user_id: 'admin001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/kyc_document.pdf'
};

client.uploadFile(complianceFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});
```

4. **Route a Document for Signature via DocuSign:**

```typescript
const docuSignRequest: DocuSignRequest = {
  document_id: 'file123',
  signers: [
    { email: 'investor@example.com', name: 'John Doe' },
    { email: 'compliance@example.com', name: 'Compliance Officer' }
  ]
};

client.routeForSignature(docuSignRequest).then(response => {
  console.log('DocuSign status:', response.data);
}).catch(error => {
  console.error('Error routing for signature:', error);
});
```

5. **Subscribe to Data Room Events:**

```typescript
const eventSubscription: EventSubscription = {
  dataroom_id: 'dataroomInvestorJohnDoe',
  event_type: 'document.signed',
  callback_url: 'https://agsiri.com/webhook'
};

client.subscribeToEvent(eventSubscription).then(response => {
  console.log('Subscription message:', response.data);
}).catch(error => {
  console.error('Error subscribing to event:', error);
});
```

### Scenario 5: Managing Agsiri Investor Reports

Agsiri needs to provide regular financial reports to investors. Each investor has a Data Room containing financial reports categorized into Cabinets based on the reporting period.

1. **Create a Data Room for an Investor:**

```typescript
const dataRoom: DataRoom = {
  client_id: 'agsiri123',
  name: 'Investor Jane Smith',
  description: 'Data Room for Jane Smith\'s financial reports',
  user_id: 'admin001',
  key_info: { investor: 'Jane Smith' }
};

client.createDataRoom(dataRoom).then(response => {
  console.log('Created Data Room:', response.data);
}).catch(error => {
  console.error('Error creating Data Room:', error);
});
```

2. **Create Cabinets for Different Reporting Periods:**

```typescript
const q1ReportsCabinet: Cabinet = {
  dataroom: 'dataroomInvestorJaneSmith',
  name: 'Q1 2023 Reports',
  description: 'Cabinet for storing Q1 2023 financial reports',
  user_id: 'admin001',
  type: 'REGULAR'
};

client.createCabinet(q1ReportsCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});

const q2ReportsCabinet: Cabinet = {
  dataroom: 'dataroomInvestorJaneSmith',
  name: 'Q2 2023 Reports',
  description: 'Cabinet for storing Q2 2023 financial reports',
  user_id: 'admin001',
  type: 'REGULAR'
};

client.createCabinet(q2ReportsCabinet).then(response => {
  console.log('Created Cabinet:', response.data);
}).catch(error => {
  console.error('Error creating Cabinet:', error);
});
```

3. **Upload Files to the Cabinets:**

```typescript
const q1ReportFile: File = {
  cabinet_id: 'cabinetQ1Reports',
  name: 'Q1 2023 Financial Report',
  description: 'Q1 2023 financial report for Jane Smith',
  user_id: 'admin001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/q1_2023_financial_report.pdf'
};

client.uploadFile(q1ReportFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});

const q2ReportFile: File = {
  cabinet_id: 'cabinetQ2Reports',
  name: 'Q2 2023 Financial Report',
  description: 'Q2 2023 financial report for Jane Smith',
  user_id: 'admin001',
  type: 'DOCUMENT',
  status: 'ACTIVE',
  url: 'http://example.com/q2_2023_financial_report.pdf'
};

client.uploadFile(q2ReportFile).then(response => {
  console.log('Uploaded File:', response.data);
}).catch(error => {
  console.error('Error uploading File:', error);
});
```

4. **Route a Document for Signature via DocuSign:**

```typescript
const docuSignRequest: DocuSignRequest = {
  document_id: 'file123',
  signers: [
    { email: 'investor@example.com', name: 'Jane Smith' },
    { email: 'compliance@example.com', name: 'Compliance Officer' }
  ]
};

client.routeForSignature(docuSignRequest).then(response => {
  console.log('DocuSign status:', response.data);
}).catch(error => {
  console.error('Error routing for signature:', error);
});
```

5. **Subscribe to Data Room Events:**

```typescript
const eventSubscription: EventSubscription = {
  dataroom_id: 'dataroomInvestorJaneSmith',
  event_type: 'document.uploaded',
  callback_url: 'https://agsiri.com/webhook'
};

client.subscribeToEvent(eventSubscription).then(response => {
  console.log('Subscription message:', response.data);
}).catch(error => {
  console.error('Error subscribing to event:', error);
});
```

## Conclusion

This guide provides a comprehensive overview of how to use the `DataRoomClient` to interact with Data Rooms, Cabinets, Files, and document workflows. Each method is illustrated with an example, demonstrating how to create, retrieve, update, and delete these resources. Real-world usage scenarios provide context for how this client can be integrated into various applications, including financial due diligence, legal case management, corporate document management, and managing investor subscription and financial report documents. Use this guide as a reference for integrating the `DataRoomClient` into your project.
