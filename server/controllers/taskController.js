const Task = require("../models/taskModel");

const createTask = async (req, res) => {
    const { title, description, dueDate, status, priority } = req.body;
    
    if (!title || !description || !dueDate) {
        return res.status(400).json({
            message: "Please Input all fields",
            success: false
        });
    }
    
    if (isNaN(new Date(dueDate))) {
        return res.status(400).json({
            message: "Invalid due date format.",
            success: false
        });
    }

    const user = req.user;

    if (!user) {
        return res.status(401).json({
            message: "User not authenticated.",
            success: false
        });
    }

    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            status: status || 'Pending', 
            priority: priority || 'Medium',  
            userId: user._id  
        });

        await newTask.save();

        const populatedTask = await newTask.populate('userId', 'username email');

        res.status(201).json({
            message: "Task Created successfully",
            success: true,
            task: populatedTask
        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            message: "Error creating task.",
            success: false
        });
    }
};

const getAllTasks = async (req, res) => {
     const user = req.user; 

    if (!user) {
        return res.status(401).json({ message: "User not authenticated.", success: false });
    }

    try {
        const tasks = await Task.find({userId: user._id}).populate('userId', 'username email profilePic'); 

    if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found.", success: false });
        }

        res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            tasks: tasks
        });
    } catch (error) {
        res.status(400).json({
            message: "Error fetching tasks",
            success: false
        });
    }
}

const getTaskById = async (req, res) => {
    const user = req.user; 

    if (!user) {
        return res.status(401).json({ message: "User not authenticated.", success: false });
    }

    const taskId = req.params.id;

    try {
        const task = await Task.findOne({ _id: taskId, userId: user._id }).populate('userId', 'username email profilePic'); 

        if (!task) {
            return res.status(404).json({
                message: "Task not found or not authorized to view this task.",
                success: false
            });
        }

        res.status(200).json({
            message: "Task fetched successfully",
            success: true,
            task: task
        });
    } catch (error) {
        res.status(400).json({
            message: "Error fetching task",
            success: false
        });
    }
}

const updateTaskById = async (req, res) => {
    const user = req.user; 

    if (!user) {
        return res.status(401).json({ message: "User not authenticated.", success: false });
    }

    const taskId = req.params.id; 
    const { title, description, dueDate, status, priority } = req.body; 

    try {
        const task = await Task.findOne({ _id: taskId, userId: user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found or not authorized.", success: false });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        task.priority = priority || task.priority;

        await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            success: true,
            task
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task.", success: false });
    }
};

const deleteTaskById = async (req, res) => {
    const taskId = req.params.id;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "User not authenticated.", success: false });
    }

    try {
        const task = await Task.deleteOne({ _id: taskId, userId: user._id });

        if (task.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found or not authorized to delete.", success: false });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Error deleting task.", success: false });
    }
};


const getSortedTasks = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "User not authenticated.", success: false });
    }

    try {
        const { sortBy } = req.query;

        // Step 1: Fetch all tasks for the user
        const tasks = await Task.find({ userId: user._id }).lean();

        if (!tasks || tasks.length === 0) {
            return res.status(200).json({ 
                message: "No tasks found.", 
                success: true,
                tasks: [] 
            });
        }

        // Step 2: Custom sort logic
        let sortedTasks = [...tasks]; // Create a copy of the array before sorting

        if (sortBy === 'priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        } else if (sortBy === 'status') {
            const statusOrder = { 'Completed': 1, 'In Progress': 2, 'Pending': 3, 'On Hold': 4 };
            sortedTasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        } else if (sortBy === 'dueDate') {
            sortedTasks.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        }

        return res.status(200).json({
            message: "Tasks fetched and sorted successfully",
            success: true,
            tasks: sortedTasks
        });

    } catch (error) {
        console.error("Detailed error:", error);
        return res.status(500).json({
            message: "Error fetching tasks",
            success: false,
            error: error.message
        });
    }
};


module.exports = {createTask,getAllTasks,getTaskById,updateTaskById,deleteTaskById,getSortedTasks}