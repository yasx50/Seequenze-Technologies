const express = require('express');
const Task = require('../models/Task-model');
const router = express.Router();

// Create a new task
router.post('/add', async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const newTask = new Task({ title, description, status, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
});

// Update task status
router.put('/update/:id', async (req, res) => {
  const { status } = req.body; // This is the new status for the task, sent in the request body.
  try {
    // Finds the task by its ID (from the URL) and updates its status.
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json(task); // Sends back the updated task data.
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err });
  }
});


// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted", task });
  } catch (err) {
    res.status(400).json({ message: "Error deleting task", error: err });
  }
});

module.exports = router;
