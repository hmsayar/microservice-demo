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

test('responds with json', async () => {
  const response = await request(app)
  .get('/tasks')
  .expect('Content-Type', /json/)
  .expect(200);
})


