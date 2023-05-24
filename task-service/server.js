const { app, connectDb } = require('./app');

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_DB_URL);
    app.listen(3000, () => {
      console.log('Task service listening on port 3001');
    });
  } catch (err) {
    console.error(`Failed to connect to DB: ${err.message}`);
    process.exit(1);
  }
};

startServer();
