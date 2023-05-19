require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./Task');

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

app.get('/tasks', async (req, res) => {
    const userId = req.query.userId;
    const tasks = userId ? await Task.find({userId}) : await Task.find({});
    res.send(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.send(newTask);
});

app.listen(3001, () => {
  console.log('Task service listening on port 3001');
});
