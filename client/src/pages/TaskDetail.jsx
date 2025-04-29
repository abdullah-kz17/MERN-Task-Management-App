import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, deleteTask } from '../store/slices/taskSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

export default function TaskDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { task, loading, error } = useSelector(state => state.task);

    useEffect(() => {
        if (id) {
            dispatch(getTaskById({ id }));
        }
    }, [id, dispatch]);

    const handleDeleteTask = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask({ id }));
            toast.success("Task Deleted Successfully");
            navigate('/tasks');
        }
    };

    const handleEditTask = () => {
        navigate(`/edit-task-form/${id}`);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-red-500">{error.message || 'Something went wrong'}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Task Details</h1>

            {task ? (
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    {/* User Information */}
                    <div className="flex items-center space-x-4 mb-6">
                        <img 
                            src={task.userId.profilePic || '/default-avatar.png'} 
                            alt="User Avatar" 
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-600">{task.userId.username}</h3>
                            <p className="text-sm text-gray-500">{task.userId.email}</p>
                        </div>
                    </div>

                    {/* Task Information */}
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold text-indigo-600">{task.title}</h2>
                        <span 
                            className={`px-3 py-1 rounded-lg text-white text-sm ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                            {task.priority}
                        </span>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-gray-600">{task.description}</p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Due Date</h3>
                        <p className="text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Status</h3>
                        <p className={`font-semibold ${task.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {task.status}
                        </p>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button
                            onClick={handleEditTask}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
                        >
                            <FaEdit className="mr-2" /> Edit Task
                        </button>
                        <button
                            onClick={handleDeleteTask}
                            className="flex items-center text-red-600 hover:text-red-800 transition duration-200"
                        >
                            <FaTrashAlt className="mr-2" /> Delete Task
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No task found.</p>
            )}
        </div>
    );
}
