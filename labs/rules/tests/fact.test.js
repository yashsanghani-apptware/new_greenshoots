const request = require('supertest');
const app = require('../src/app');

describe('Fact API', () => {
  it('should create a new fact', async () => {
    const response = await request(app)
      .post('/api/facts')
      .send({ name: 'customer.age', type: 'Number', value: 30 });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('customer.age');
  });
});

