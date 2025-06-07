
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const newTask = new Task({ ...req.body, userId: req.user.id });
  const savedTask = await newTask.save();
  res.json(savedTask);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
