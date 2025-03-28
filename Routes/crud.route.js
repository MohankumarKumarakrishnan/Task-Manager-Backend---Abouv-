const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const Tasks = require("../Models/tasks");
const router = express.Router();

// ✅ Get all tasks
router.post("/getalltasks", async (req, res) => {
  try {
    const { jwtToken } = req.body;
    if (!jwtToken) {
      return res.status(401).json({ error: "Please login first" });
    }

    let { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const tasks = await Tasks.findOne({ userId }).lean();

    return res.status(200).json({ allTasks: tasks?.tasks || [] });
  } catch (err) {
    console.error(`Error in get all tasks controller: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Create a new task
router.post("/createtask", async (req, res) => {
  try {
    const { task, jwtToken } = req.body;
    if (!jwtToken) {
      return res.status(401).json({ error: "Please login first" });
    }

    let { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
    let userTasks = await Tasks.findOne({ userId });

    if (!userTasks) {
      userTasks = new Tasks({
        userId,
        tasks: [{ taskName: task, completed: false }],
      });
    } else {
      userTasks.tasks.push({ taskName: task, completed: false });
    }

    await userTasks.save();
    return res.status(201).json({ message: "Task added successfully", allTasks: userTasks.tasks });
  } catch (err) {
    console.error(`Error in create task controller: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update a task
router.patch("/updatetask", async (req, res) => {
  try {
    const { taskId, updatedTask, jwtToken } = req.body;
    if (!jwtToken) {
      return res.status(401).json({ error: "Please login first" });
    }

    let { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
    let userTasks = await Tasks.findOne({ userId });

    if (!userTasks) {
      return res.status(404).json({ error: "Task list not found" });
    }

    let taskToUpdate = userTasks.tasks.find((t) => t._id.toString() === taskId);
    if (!taskToUpdate) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskToUpdate.taskName = updatedTask.taskName;
    taskToUpdate.completed = updatedTask.completed;
    await userTasks.save();

    return res.status(200).json({ message: "Task updated successfully", allTasks: userTasks.tasks });
  } catch (err) {
    console.error(`Error in update task controller: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a task
router.delete("/deletetask", async (req, res) => {
  try {
    const { taskId, jwtToken } = req.body;
    if (!jwtToken) {
      return res.status(401).json({ error: "Please login first" });
    }

    let { userId } = jwt.verify(jwtToken, process.env.JWT_SECRET);
    let userTasks = await Tasks.findOne({ userId });

    if (!userTasks) {
      return res.status(404).json({ error: "Task list not found" });
    }

    userTasks.tasks = userTasks.tasks.filter((t) => t._id.toString() !== taskId);
    await userTasks.save();

    return res.status(200).json({ message: "Task deleted successfully", allTasks: userTasks.tasks });
  } catch (err) {
    console.error(`Error in delete task controller: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
