const request = require('supertest');
const app = require('../server'); // Import the Express app
const mongoose = require('mongoose');

describe('Auth API Endpoints', () => {
  // Before all tests, connect to a test database or mock MongoDB
  // For simplicity, we'll connect to the main DB defined in .env
  // In a real project, you'd use a separate test DB or in-memory DB
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });

  // After all tests, close the MongoDB connection
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a greeting on the root path', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('MERN Auth Backend is running!');
  });

  it('should initiate Azure AD login and return a redirect URL', async () => {
    const res = await request(app).get('/api/auth/login');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('redirectUrl');
    expect(res.body.redirectUrl).toMatch(/^https:\/\/login\.microsoftonline\.com\//);
    expect(res.body.redirectUrl).toContain('client_id=' + process.env.AZURE_AD_CLIENT_ID);
    expect(res.body.redirectUrl).toContain('response_type=code');
    expect(res.body.redirectUrl).toContain('redirect_uri=' + process.env.AZURE_AD_REDIRECT_URI);
  });

  it('should handle callback with authorization code successfully', async () => {
    const mockCode = 'mockAuthorizationCode123';
    const mockState = '12345';
    const res = await request(app)
      .get(`/api/auth/callback?code=${mockCode}&state=${mockState}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Authentication code received. Ready to exchange for tokens.');
  });

  it('should handle callback without authorization code as a failure', async () => {
    const res = await request(app).get('/api/auth/callback');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'No authorization code received.');
  });

  it('should handle callback with an error parameter', async () => {
    const mockError = 'access_denied';
    const mockErrorDescription = 'The user denied the request.';
    const res = await request(app)
      .get(`/api/auth/callback?error=${mockError}&error_description=${mockErrorDescription}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Authentication failed');
    expect(res.body).toHaveProperty('error', mockErrorDescription);
  });
});