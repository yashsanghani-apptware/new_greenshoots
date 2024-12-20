import { DataroomClient } from './dataroomClient';
import { config } from './config/config';
import { IFile } from '../../services/dataroom-service/src/models/file';
import mongoose from 'mongoose';
import { translate, initI18n } from '../../services/dataroom-service/src/utils/i18n';
import fs from 'fs';
import path from 'path';

// Function to generate a unique suffix using the current timestamp and a random number
const generateUniqueSuffix = () => {
  return `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
};

// Function to generate a unique name with the "agsiri" prefix and a unique suffix
const generateUniqueName = (baseName: string) => {
  return `agsiri_${baseName}_${generateUniqueSuffix()}`;
};

async function setup() {
  await initI18n(); // Initialize i18n
  const client = new DataroomClient(config.apiEndpoint);

  try {

    interface DataRoom {
      organization_id: mongoose.Types.ObjectId;
      ari: string,
      data_residency: {
        country: string,
        region: string,
        data_center: string,
      },
      name: string;
      description: string;
      created_by: mongoose.Types.ObjectId;
      key_info: Record<string, any>;
      permissions: [];
      owner: mongoose.Types.ObjectId;
    }

    interface Cabinet {
      dataroom: mongoose.Types.ObjectId; // The ID of the DataRoom this Cabinet belongs to
      ari: string; // The unique Agsiri Resource Identifier for the Cabinet
      name: string; // Human-readable name for the Cabinet
      description?: string; // A brief description of the Cabinet
      created_by: mongoose.Types.ObjectId; // User ID of the Cabinet creator
      owner: mongoose.Types.ObjectId; // User ID of the Cabinet creator
      created_at: Date; // Timestamp of when the Cabinet was created
      modified_by?: mongoose.Types.ObjectId; // User ID of the last person who modified the Cabinet
      modified_at?: Date; // Timestamp of the last modification
      deleted_at?: Date; // Timestamp for when the Cabinet was marked as deleted
      isDeleted?: boolean;
      type: "REGULAR" | "SECURE"; // Indicates the security level of the Cabinet
      parent_cabinet_id?: mongoose.Types.ObjectId; // ID of the parent Cabinet if nested
      regulatory_hold?: {
        hold_id: mongoose.Types.ObjectId; // Unique identifier for the regulatory hold
        reason: string; // Reason for the hold
        applied_by: mongoose.Types.ObjectId; // ID of the user who applied the hold
        applied_at: Date; // Date when the hold was applied
        status: "ACTIVE" | "RELEASED"; // Status of the hold
        released_at?: Date; // Date when the hold was lifted
      };
      workflow_triggers?: Array<{
        event: string; // Event that triggers the workflow
        workflow_id: mongoose.Types.ObjectId; // ID of the workflow to be triggered
        conditions?: Array<{
          attribute: string; // Attribute to evaluate in the condition
          operator: string; // Operator used for comparison
          value: any; // Value to compare against
          type: string; // Type of condition
        }>;
      }>;
      audit_trail?: mongoose.Types.ObjectId[]; // List of AuditLog entries related to this Cabinet
      files?: mongoose.Types.ObjectId[]; // List of Files stored in this Cabinet
    }

    const newDataRoom: DataRoom = {
      organization_id: new mongoose.Types.ObjectId(),
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: 'New Data Room',
      description: 'Description of the new data room',
      created_by: new mongoose.Types.ObjectId(),
      key_info: {},
      permissions: [],
      owner: new mongoose.Types.ObjectId()
    };

    // Step 1: Create a data room
    const dataRoom = await client.createDataRoom(newDataRoom).then(response => {
      console.log(translate('DATA_ROOM_CREATED'));
      return response;
    }).catch(error => {
      console.error(translate('ERROR_CREATING_DATA_ROOM', { message: error.message }));
    });


    // Step 2: Getting a Data Room by ID
    await client.getDataRoom(dataRoom.dataRoom._id).then(response => {
      console.log(translate('DATA_ROOM_FOUND', { dataroom_id: response._id }));
    }).catch(error => {
      console.error(translate('ERROR_FETCHING_DATA_ROOMS', { message: error.message }));
    });


    // Step 3: Getting a List of Data Rooms
    await client.getDataRooms().then(response => {
      console.log(translate('LIST_OF_DATA_ROOMS', { count: response.length }));
    }).catch(error => {
      console.error(translate('ERROR_FETCHING_DATA_ROOMS', { message: error.message }));
    });

    const updatedDataRoom: DataRoom = {
      organization_id: dataRoom.dataRoom.client_id,
      ari: "valid_ari",
      data_residency: {
        country: "US",
        region: "us-east-1",
        data_center: "Data Center 1",
      },
      name: 'Updated Data Room',
      description: 'Updated description of the data room',
      created_by: dataRoom.dataRoom.user_id,
      key_info: {},
      permissions: [],
      owner: new mongoose.Types.ObjectId()
    };

    // Step 4: Updating a Data Room
    await client.updateDataRoom(dataRoom.dataRoom._id, updatedDataRoom).then(response => {
      console.log(translate('DATA_ROOM_UPDATED'));
    }).catch(error => {
      console.error(translate('ERROR_UPDATING_DATA_ROOM', { message: error.message }));
    });

    // Step 5: Deleting a Data Room
    await client.deleteDataRoom(dataRoom.dataRoom._id).then(response => {
      console.log(translate('DATA_ROOM_DELETED'));
    }).catch(error => {
      console.error(translate('ERROR_DELETING_DATA_ROOM', { message: error.message }));
    });

    const newCabinet: Cabinet = {
      dataroom: dataRoom.dataRoom._id,
      ari:"test-ari",
      name: 'New Cabinet',
      description: 'Description of the new cabinet',
      created_by: dataRoom.dataRoom.created_by,
      owner: dataRoom.dataRoom.created_by,
      type: 'REGULAR',
      created_at: new Date(),
    };

    // Step 6: Creating a Cabinet
    const cabinet = await client.createCabinet(newCabinet).then(response => {
      console.log(translate('CABINET_CREATED'));
      return response;
    }).catch(error => {
      console.error(translate('ERROR_CREATING_CABINET', { message: error.response.data.message }));
    });


    // Step 7: Getting a Cabinet by ID
    await client.getCabinet(cabinet.cabinet._id).then(response => {
      console.log(translate('CABINET_FOUND', { cabinet_id: response._id }));
    }).catch(error => {
      console.error(translate('ERROR_FETCHING_CABINET', { message: error.response.data }));
    });

    // Step 8: Getting a List of Cabinets
    await client.getCabinets().then(response => {
      console.log(translate('LIST_OF_CABINETS', { count: response.length }));
    }).catch(error => {
      console.error(translate('ERROR_FETCHING_CABINETS', { message: error.response.data }));
    });

    const updateCabinet: Cabinet = {
      dataroom: dataRoom.dataRoom._id,
      name: 'updated Cabinet',
      description: 'Description of the new cabinet',
      ari:"test-ari",
      created_by: dataRoom.dataRoom.user_id,
      owner: dataRoom.dataRoom.user_id,
      type: 'REGULAR',
      created_at: new Date(),
    };

    // Step 9: Updating a Cabinet
    await client.updateCabinet(cabinet.cabinet._id, updateCabinet).then(response => {
      console.log(translate('CABINET_UPDATED'));
    }).catch(error => {
      console.error(translate('ERROR_UPDATING_CABINET', { message: error.response.data }));
    });



    // Step 10: Upload single file
    const organizationId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();
    const fileId = new mongoose.Types.ObjectId();

    const jsonData = {
      key1: "value1",
      key2: "value2"
    };

    const jsonFile = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
    const newFileFormData = new FormData();
    newFileFormData.append('file', jsonFile, 'data.json'); // 'data.json' is the file name

    // Add the metadata to the FormData object
    newFileFormData.append('_id', fileId.toString());
    newFileFormData.append('organization_id', organizationId.toString());
    newFileFormData.append('name', 'New File');
    newFileFormData.append('description', 'Description of the new file');
    newFileFormData.append('created_by', `${userId}`);
    newFileFormData.append('type', 'SHARED');
    newFileFormData.append('status', 'Pending');
    newFileFormData.append('encryption_key', 'someEncryptionKey');
    newFileFormData.append('ari', 'valid_ari_string');

    // Upload the file
    const file = await client.uploadFile(newFileFormData).then(response => {
      console.log(translate('FILE_UPLOADED', { file_id: response._id }));
      return response;
    }).catch(error => {
      console.log(translate('ERROR_UPLOADING_FILE', { message: error.response.data.message || error.response.data }));
    });

    //Step 11: Get a single file
    await client.getFile(fileId).then(response => {
      console.log(translate('FILE_FOUND', { file_id: response._id }));
    }).catch(error => {
      console.log(translate('ERROR_FETCHING_FILE', { message: error.response.data }));
    });

    // Step 12: Get list of files in a cabinet
    await client.getFiles(organizationId).then(response => {
      console.log(translate('LIST_OF_FILES', { count: response.length }));
    }).catch(error => {
      console.error(translate('ERROR_FETCHING_FILES', { message: error.response.data }));
    });

    // Step 13: Update a file
    const updatedFile: Partial<IFile> = {
      organization_id: organizationId,
      name: 'Updated File',
      description: 'Updated description of the file',
      created_by: new mongoose.Types.ObjectId(),
      type: 'SHARED',
      status: 'Pending',
      content_url: 'http://example.com/updated_file.pdf',
    };

    await client.updateFile(fileId, updatedFile).then(response => {
      console.log(translate('FILE_UPDATED', { file_id: response._id }));
    }).catch(error => {
      console.error(translate('ERROR_UPDATING_FILE', { message: error.response.data }));
    });

    //Step 14: Mount File in Cabinet
    await client.mountFile(fileId, cabinet.cabinet._id).then(response => {
      console.log(translate('FILE_MOUNTED'));
    }).catch(error => {
      console.log({ error: error.response.data });
      console.error(translate('ERROR_MOUNTING_FILE', { message: error.response.data }));
    });

    //Step 15: Unmount File from Cabinet
    await client.unmountFile(fileId, cabinet.cabinet._id).then(response => {
      console.log(translate('FILE_UNMOUNTED'));
    }).catch(error => {
      console.log({ error: error.response.data });
      console.error(translate('ERROR_UNMOUNTING_FILE', { message: error.response.data }));
    });

    // Step 16: Deleting a Cabinet
    await client.deleteCabinet(cabinet.cabinet._id).then(response => {
      console.log(translate('CABINET_DELETED'));
    }).catch(error => {
      console.error(translate('ERROR_DELETING_CABINET', { message: error.response.data }));
    });

    // Step 17: Delete a file
    await client.deleteFile(fileId).then(response => {
      console.log(translate('FILE_DELETED'));
    }).catch(error => {
      console.log({ error: error.response.data });
      console.error(translate('ERROR_DELETING_FILE', { message: error.response.data }));
    });

    // Step 18: Routing for Document Signatures
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
    formData.append('signer_email', 'amol.thite@apptware.com'); // Add Signer's email address
    formData.append('signer_name', 'amol thite');
    formData.append('cc_email', 'amolthite1996@gmail.com');
    formData.append('cc_name', 'amol thite home');

    client.routeForSignature(formData).then(response => {
      console.log(translate('SIGNATURE_ROUTED'));
      console.log('Envelope Signature', { data: response });
    }).catch(error => {
      console.error(translate('ERROR_ROUTING_SIGNATURE', { message: error.message }));
    });

  } catch (error) {
    const err = error as Error;
    console.error(translate('ERROR_OCCURRED', { message: err.message }));
  }
}

setup().catch((error) => {
  if (error instanceof Error) {
    if (error.message.includes('Request failed with status code')) {
      console.error(translate('ERROR_OCCURRED', { message: translate('REQUEST_FAILED', { statusCode: error.message.split(' ').pop() }) }));
    } else {
      console.error(translate('ERROR_OCCURRED', { message: error.message }));
    }
  } else {
    console.error(translate('ERROR_OCCURRED', { message: error }));
  }
});

