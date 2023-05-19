require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');
const axios = require('axios');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log('MongoDB connection established successfully');
});

app.get('/users/:id/tasks', async (req, res) => {
    const userId = req.params.id;
    const tasksResponse = await axios.get(`http://task-service:3001/tasks?userId=${userId}`);
    const tasks = tasksResponse.data;
    res.send(tasks);
  });

app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send(newUser);
});

app.listen(3000, () => {
  console.log('User service listening on port 3000');
});
