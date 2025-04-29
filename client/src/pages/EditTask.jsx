import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, updateTask } from '../store/slices/taskSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

export default function EditTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { task, loading, error } = useSelector(state => state.task);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
        status: 'Pending'
    });

    useEffect(() => {
        if (id) {
            dispatch(getTaskById({ id }));
        }
    }, [id, dispatch]);

    useEffect(() => {
    if (task && task._id === id) {
        setFormData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
            status: task.status
        });
    }
}, [task, id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);  
    if (!id) {
        toast.error('Task ID is missing');
        return;
    }
    dispatch(updateTask({ taskId: id, updatedData: formData }));
    toast.success("Task updated successfully");
    navigate(`/tasks/${id}`);
};


    const handleCancel = () => {
        navigate(`/tasks/${id}`);
    };

    if (loading) return <Loader />;

if (!task || task._id !== id) {
    return <div className="text-gray-500">Fetching task details...</div>;
}


    if (error) {
        return <div className="text-red-500">{error.message || 'Something went wrong'}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Edit Task</h1>

            {task ? (
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    {/* Task Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-lg font-semibold text-indigo-600">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-lg font-semibold text-indigo-600">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows="4"
                                required
                            />
                        </div>

                        {/* Priority */}
                        <div className="mb-4">
                            <label htmlFor="priority" className="block text-lg font-semibold text-indigo-600">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block text-lg font-semibold text-indigo-600">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-lg font-semibold text-indigo-600">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 mt-6">
                            <button
                                type="submit"
                                className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md"
                            >
                                <FaSave className="mr-2" /> Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center text-gray-600 hover:text-gray-800 p-2 rounded-md"
                            >
                                <FaArrowLeft className="mr-2" /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <p className="text-gray-500">No task found.</p>
            )}
        </div>
    );
}
