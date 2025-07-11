const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Task creation failed", error: err.message });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const { search, status, dueBefore, dueAfter, sortBy, order } = req.query;

    const query = { user: req.user.id };

   
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

  
    if (status) {
      query.status = status;
    }

    
    if (dueBefore || dueAfter) {
      query.dueDate = {};
      if (dueBefore) query.dueDate.$lte = new Date(dueBefore);
      if (dueAfter) query.dueDate.$gte = new Date(dueAfter);
    }

   
    let sortOptions = { createdAt: -1 }; // default sort: latest first
    if (sortBy) {
      const field = sortBy === "dueDate" ? "dueDate" : "createdAt";
      sortOptions = { [field]: order === "asc" ? 1 : -1 };
    }

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
