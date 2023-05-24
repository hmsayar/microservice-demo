require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./Task');

const app = express();

app.use(express.json());


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


const connectDb = async (dbUrl) => {
  await mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
};

const disconnectDb = async () => {
  await mongoose.connection.close();
};

module.exports = {
  app,
  connectDb,
  disconnectDb
};