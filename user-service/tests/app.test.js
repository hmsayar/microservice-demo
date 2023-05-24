const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, connectDb, disconnectDb } = require('../app');

let server;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await connectDb(mongoUri);
  server = app.listen(4000);  
});

afterAll(async () => {
  if (server) {
    server.close();
  }

  await disconnectDb();
  if (mongoServer) {
    await mongoServer.stop();
  }
});


test('should create a new user', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      name: 'Test User',
      email: 'test.user@gmail.com',
      password: '123456'
    })
  expect(res.statusCode).toEqual(200);
  expect(res.body.name).toEqual('Test User');
});

test('should fetch all users', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
});

test('should fail', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toEqual(404);
});
