import request from 'supertest';
import app from './app';

describe('Test the root path', () => {
  it('should respond with a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to our application!');
  });
});

describe('Test error handling', () => {
  it('should handle errors properly', async () => {
    const response = await request(app).get('/test-error');
    expect(response.status).toBe(500);
    expect(response.text).toContain('Test error handling');
  });
});

