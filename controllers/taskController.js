// backend/controllers/taskController.js
const Task = require("../models/Task");

// Create
const createTask = async (req, res) => {
  const { text, status } = req.body;
  try {
    const task = await Task.create({ text, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read all
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { text, status } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(id, { text, status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
