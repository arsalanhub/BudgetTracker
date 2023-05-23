require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { app, server } = require('../index');
const User = require('../model/userModel');
const { sampleData, correctData, correctUsername, correctPassword } = require('../utils/tests/user.mock');

const MONGODB_URI = process.env.DB_URL; // Update with your test database URL

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.findOneAndDelete({ username: 'testuser' });
}, 10000);

afterAll(async () => {
  await User.findOneAndDelete({ username: 'testuser' });
  await mongoose.connection.close();
  server.close();
});

describe('Register API', () => {
  it('should register a new user', async () => {
    // Register User
    var response = await request(app)
      .post('/register')
      .send(sampleData)
      .expect('Content-Type', /json/)
      .expect(200);

    // Check response
    expect(response.body.status).toBe(true);
    expect(response.body.user.username).toBe(sampleData.username);
    expect(response.body.user.email).toBe(sampleData.email);
  });

  it('should check password encrypted', async () => {
    const savedUser = await User.findOne({ email: sampleData.email });
    expect(savedUser).toBeTruthy();

    const passwordMatch = await bcrypt.compare(
      sampleData.password,
      savedUser.password,
    );

    expect(passwordMatch).toBe(true);
  });

  it('should check unique username and email', async () => {
    var response = await request(app)
      .post('/register')
      .send(sampleData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBeDefined();
  });
});

describe("Login API", () => {
  it('should check login with correct credentials', async () => {
    var response = await request(app)
      .post("/login")
      .send(correctData)
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(response.body.status).toBe(true);
    expect(response.body.user.username).toBeDefined();
    expect(response.body.user.email).toBeDefined();
    expect(response.body.user.password).toBeDefined();
  });

  it('should check login with correct username only', async () => {
    var response = await request(app)
      .post("/login")
      .send(correctUsername)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBeDefined();
  })

  it('should check login with correct password only', async () => {
    var response = await request(app)
      .post("/login")
      .send(correctPassword)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBeDefined();
  })
})