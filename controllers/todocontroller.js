const Task = require('../model/todoModel');

// Create a new task for a specific user
exports.createTask = async (req, res) => {
    try {
        // Assuming userId is available from authentication
        const userId = req.body.userId;

        const newTask = new Task({
            ...req.body,
            userId,
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tasks for a specific user
    exports.getAllTasks = async (req, res) => {
        try {
            // Assuming userId is available from authentication
            const userId = req.body.userId;

            const tasks = await Task.find({$or:[{ userId}, {isdeleted: false }]});
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

// Get a single task by ID for a specific user
exports.getTaskById = async (req, res) => {
    try {
        // Assuming userId is available from authentication
        const userId = req.body.userId;

        const task = await Task.findOne({ _id: req.query.id, userId });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a task by ID for a specific user
exports.updateTaskById = async (req, res) => {
    try {
        // Assuming userId is available from authentication
        const userId = req.body.userId;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.query.id, userId },
            { $set: req.body },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task by ID for a specific user
exports.deleteTaskById = async (req, res) => {
    try {
        // Assuming userId is available from authentication
        

        // Soft delete the task by updating the 'deleted' field to true
        const deletedTask = await Task.findOneAndUpdate(
            { _id: req.query.id },
            { $set: { isdeleted: true } },
            { new: true }
        );

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.completTask = async (req, res) => {
    try {
        // Assuming userId is available from authentication
        

        // Soft delete the task by updating the 'deleted' field to true
        const deletedTask = await Task.findOneAndUpdate(
            { _id: req.query.id },
            { $set: { completed: true } },
            { new: true }
        );

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

