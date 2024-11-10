const express = require('express');
const Task = require('../models/Task-model');
const User = require('../models/User-model'); // Import User model to update tasks array
const router = express.Router();
const auth = require('../middleware/auth-controler')

// Middleware to protect routes and get user ID (Assume req.user is populated with user's data)


// Create a new task
router.post('/add',  async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.user._id; // Get the logged-in user's ID from req.user

  try {
    // Create a new task and associate it with the user
    const newTask = new Task({ title, description, status, dueDate, user: userId });
    await newTask.save();

    // Add task ID to the user's tasks array
    await User.findByIdAndUpdate(userId, { $push: { tasks: newTask._id } });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err });
  }
});

// Get all tasks for the logged-in user
router.get('/',auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tasks", error: err });
  }
});

// Update task status for a specific task (Only if it belongs to the user)
router.put('/update/:id',  async (req, res) => {
  const { status } = req.body;
  const userId = req.user._id;
  
  try {
    // Find the task by ID and ensure it belongs to the user
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err });
  }
});

// Delete a task (Only if it belongs to the user)
router.delete('/:id',  async (req, res) => {
  const userId = req.user._id;

  try {
    // Find and delete the task only if it belongs to the user
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: userId });
    
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    // Remove task ID from user's tasks array
    await User.findByIdAndUpdate(userId, { $pull: { tasks: task._id } });

    res.status(200).json({ message: "Task deleted", task });
  } catch (err) {
    res.status(400).json({ message: "Error deleting task", error: err });
  }
});

module.exports = router;
