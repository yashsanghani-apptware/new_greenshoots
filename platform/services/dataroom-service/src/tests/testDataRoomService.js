const axios = require('axios');

const BASE_URL = 'http://localhost:3000/datarooms';

async function createDataRoom() {
  try {
    const response = await axios.post(BASE_URL, {
      farm_id: 'exampleFarmId',
      name: 'Test Data Room',
      description: 'A test data room for the farm',
      user_id: 'exampleUserId',
      key_info: {}
    });
    console.log('Data room created:', response.data);
    return response.data._id;
  } catch (error) {
    console.error('Error creating data room:', error.response ? error.response.data : error.message);
  }
}

async function updateDataRoom(dataRoomId) {
  try {
    const response = await axios.put(`${BASE_URL}/${dataRoomId}`, {
      name: 'Updated Test Data Room',
      description: 'An updated description for the test data room'
    });
    console.log('Data room updated:', response.data);
  } catch (error) {
    console.error('Error updating data room:', error.response ? error.response.data : error.message);
  }
}

async function getDataRooms() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('All data rooms:', response.data);
  } catch (error) {
    console.error('Error getting data rooms:', error.response ? error.response.data : error.message);
  }
}

async function getDataRoom(dataRoomId) {
  try {
    const response = await axios.get(`${BASE_URL}/${dataRoomId}`);
    console.log('Data room details:', response.data);
  } catch (error) {
    console.error('Error getting data room:', error.response ? error.response.data : error.message);
  }
}

async function deleteDataRoom(dataRoomId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${dataRoomId}`);
    console.log('Data room deleted:', response.data);
  } catch (error) {
    console.error('Error deleting data room:', error.response ? error.response.data : error.message);
  }
}

async function createPermission(dataRoomId) {
  try {
    const response = await axios.post(`${BASE_URL}/${dataRoomId}/permissions`, {
      type: 'READ',
      roles: ['admin'],
      users: ['exampleUserId'],
      start_time: '2024-07-10T00:00:00Z',
      end_time: '2024-07-20T00:00:00Z'
    });
    console.log('Permission created:', response.data);
    return response.data._id;
  } catch (error) {
    console.error('Error creating permission:', error.response ? error.response.data : error.message);
  }
}

async function updatePermission(dataRoomId, permissionId) {
  try {
    const response = await axios.put(`${BASE_URL}/${dataRoomId}/permissions/${permissionId}`, {
      type: 'WRITE',
      roles: ['user'],
      users: ['exampleUserId'],
      start_time: '2024-07-12T00:00:00Z',
      end_time: '2024-07-25T00:00:00Z'
    });
    console.log('Permission updated:', response.data);
  } catch (error) {
    console.error('Error updating permission:', error.response ? error.response.data : error.message);
  }
}

async function getPermissions(dataRoomId) {
  try {
    const response = await axios.get(`${BASE_URL}/${dataRoomId}/permissions`);
    console.log('All permissions:', response.data);
  } catch (error) {
    console.error('Error getting permissions:', error.response ? error.response.data : error.message);
  }
}

async function getPermission(dataRoomId, permissionId) {
  try {
    const response = await axios.get(`${BASE_URL}/${dataRoomId}/permissions/${permissionId}`);
    console.log('Permission details:', response.data);
  } catch (error) {
    console.error('Error getting permission:', error.response ? error.response.data : error.message);
  }
}

async function deletePermission(dataRoomId, permissionId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${dataRoomId}/permissions/${permissionId}`);
    console.log('Permission deleted:', response.data);
  } catch (error) {
    console.error('Error deleting permission:', error.response ? error.response.data : error.message);
  }
}

async function checkUserPermission(dataRoomId, userId) {
  try {
    const response = await axios.post(`${BASE_URL}/${dataRoomId}/user/${userId}/checkpermission`, {
      permissions: ['READ']
    });
    console.log('User permission check:', response.data);
  } catch (error) {
    console.error('Error checking user permission:', error.response ? error.response.data : error.message);
  }
}

(async () => {
  const dataRoomId = await createDataRoom();
  if (dataRoomId) {
    await updateDataRoom(dataRoomId);
    await getDataRooms();
    await getDataRoom(dataRoomId);

    const permissionId = await createPermission(dataRoomId);
    if (permissionId) {
      await updatePermission(dataRoomId, permissionId);
      await getPermissions(dataRoomId);
      await getPermission(dataRoomId, permissionId);
      await deletePermission(dataRoomId, permissionId);
    }

    await checkUserPermission(dataRoomId, 'exampleUserId');
    await deleteDataRoom(dataRoomId);
  }
})();

