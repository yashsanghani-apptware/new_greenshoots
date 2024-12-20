const axios = require('axios');

const BASE_URL = 'http://localhost:3000/farms';

async function createFarm() {
  try {
    const response = await axios.post(BASE_URL, {
      listing_id: '1',
      name: '217 Pickle Hill',
      address: {
        house_number: '217',
        street: 'Pickle Hill Road',
        apartment: '',
        city: 'Austin',
        state: 'TX',
        zip: '78701'
      },
      location: {
        longitude: '-97.7431',
        latitude: '30.2672'
      },
      property_description: 'A beautiful farm with great soil and crop yield.',
      main_picture: 'main_picture.jpg',
      images: ['image1.jpg', 'image2.jpg'],
      videos: ['video1.mp4'],
      maps: ['map1.png'],
      parcel_information: ['parcel1', 'parcel2'],
      due_diligence: {
        soil_information: {
          documents: ['soil_doc1.pdf'],
          maps: ['soil_map1.png']
        },
        financial_information: {
          cash_flow: {},
          sales_data: {},
          expenses_data: {},
          documents: ['financial_doc1.pdf']
        },
        crop_information: {},
        other: {}
      }
    });
    console.log('Farm created:', response.data);
    return response.data._id;
  } catch (error) {
    console.error('Error creating farm:', error.response ? error.response.data : error.message);
  }
}

async function updateFarm(farmId) {
  try {
    const response = await axios.put(`${BASE_URL}/${farmId}`, {
      name: 'Updated 217 Pickle Hill',
      property_description: 'An updated description for the beautiful farm.'
    });
    console.log('Farm updated:', response.data);
  } catch (error) {
    console.error('Error updating farm:', error.response ? error.response.data : error.message);
  }
}

async function getAllFarms() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('All farms:', response.data);
  } catch (error) {
    console.error('Error getting all farms:', error.response ? error.response.data : error.message);
  }
}

async function getFarm(farmId) {
  try {
    const response = await axios.get(`${BASE_URL}/${farmId}`);
    console.log('Farm details:', response.data);
  } catch (error) {
    console.error('Error getting farm:', error.response ? error.response.data : error.message);
  }
}

async function deleteFarm(farmId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${farmId}`);
    console.log('Farm deleted:', response.data);
  } catch (error) {
    console.error('Error deleting farm:', error.response ? error.response.data : error.message);
  }
}

async function updateSoilInformation(farmId) {
  try {
    const response = await axios.put(`${BASE_URL}/${farmId}/dd/soil`, {
      documents: ['updated_soil_doc1.pdf'],
      maps: ['updated_soil_map1.png']
    });
    console.log('Soil information updated:', response.data);
  } catch (error) {
    console.error('Error updating soil information:', error.response ? error.response.data : error.message);
  }
}

async function updateFinancialInformation(farmId) {
  try {
    const response = await axios.put(`${BASE_URL}/${farmId}/dd/financial`, {
      cash_flow: { '2024': '50000' },
      documents: ['updated_financial_doc1.pdf']
    });
    console.log('Financial information updated:', response.data);
  } catch (error) {
    console.error('Error updating financial information:', error.response ? error.response.data : error.message);
  }
}

async function updateCropInformation(farmId) {
  try {
    const response = await axios.put(`${BASE_URL}/${farmId}/dd/crop`, {
      crop_information: { crop_type: 'corn', yield: '2000' }
    });
    console.log('Crop information updated:', response.data);
  } catch (error) {
    console.error('Error updating crop information:', error.response ? error.response.data : error.message);
  }
}

async function updateOtherInformation(farmId) {
  try {
    const response = await axios.put(`${BASE_URL}/${farmId}/dd/other`, {
      other_information: { misc: 'some other important info' }
    });
    console.log('Other information updated:', response.data);
  } catch (error) {
    console.error('Error updating other information:', error.response ? error.response.data : error.message);
  }
}

(async () => {
  const farmId = await createFarm();
  if (farmId) {
    await updateFarm(farmId);
    await getAllFarms();
    await getFarm(farmId);
    await updateSoilInformation(farmId);
    await updateFinancialInformation(farmId);
    await updateCropInformation(farmId);
    await updateOtherInformation(farmId);
    await deleteFarm(farmId);
  }
})();

