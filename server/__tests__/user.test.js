require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { app, server } = require('../index');
const User = require('../model/userModel');

const MONGODB_URI = process.env.DB_URL; // Update with your test database URL

const userData = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'testpassword',
};

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
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200);

    // Check response
    expect(response.body.status).toBe(true);
    expect(response.body.user.username).toBe(userData.username);
    expect(response.body.user.email).toBe(userData.email);
  });

  it('should check password encrypted', async () => {
    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).toBeTruthy();

    const passwordMatch = await bcrypt.compare(
      userData.password,
      savedUser.password,
    );

    expect(passwordMatch).toBe(true);
  });

  it('should check unique username and email', async () => {
    var response = await request(app)
      .post('/register')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.status).toBe(false);
    expect(response.body.msg).toBeDefined();
  });
});
