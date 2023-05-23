const sampleData = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'testpassword',
};

const correctData = {
  username: 'testing@testing.com',
  email: 'testing@testing.com',
  password: 'testing@testing.com',
};

const correctUsername = {
    username: "testing@testing.com",
    password: "wrong_password"
}

const correctPassword = {
    username: "wrong_username",
    password: "testing@testing.com"
}

module.exports = { sampleData, correctData, correctUsername, correctPassword };