import axios from 'axios';

const baseURL = 'http://localhost:6000/api/storage';

async function runTests() {
    try {
        // Test creating a collection
        let response = await axios.post(`${baseURL}/create-collection`, { collectionName: 'testCollection' });
        console.log('Create Collection:', response.data);

        // Test inserting documents
        response = await axios.post(`${baseURL}/insert-documents`, {
            collectionName: 'testCollection',
            documents: [
                { name: 'Alice', age: 25, city: 'New York' },
                { name: 'Bob', age: 30, city: 'San Francisco' }
            ]
        });
        console.log('Insert Documents:', response.data);

        // Test finding documents
        response = await axios.get(`${baseURL}/find-documents`, {
            params: {
                collectionName: 'testCollection',
                query: JSON.stringify({ age: { $gt: 20 } })
            }
        });
        console.log('Find Documents:', response.data);

    } catch (error) {
        console.error('Error running tests:', error);
    }
}

runTests();

