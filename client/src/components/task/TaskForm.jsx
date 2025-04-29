import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../store/slices/taskSlice';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function TaskForm() {
    const navigate = useNavigate()
    const defaultForm = {
        title: "",
        description: "",
        dueDate: "",
        status: "",
        priority: ""
    };

    const [formData, setFormData] = useState(defaultForm);

    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.task);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(createTask(formData));
            if (createTask.fulfilled.match(resultAction)) {
                toast.success("Task created successfully!");
                setFormData(defaultForm);
                navigate("/tasks")
            } else {
                toast.error(resultAction.payload?.message || "Failed to create task");
            }
        } catch (err) {
            toast.error("Something went wrong!");
            console.error("Submit Error:", err);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4 my-2">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-blue-600">
                    {loading ? "Creating..." : "Create Task"}
                </button>
            </form>
        </div>
    );
}
