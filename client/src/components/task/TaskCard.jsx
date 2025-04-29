import React from 'react';
import { FaEye } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import { getTaskById } from '../../store/slices/taskSlice'; 
import { useNavigate } from 'react-router-dom'; 

export default function TaskCard({ task }) {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    // Handler to view task details
    const handleViewTask = () => {
        dispatch(getTaskById({ id: task._id }));
        navigate(`/tasks/${task._id}`); 
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            {/* Card Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-indigo-600">{task.title}</h2>
                <span 
                    className={`px-3 py-1 rounded-lg text-white text-sm ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                    {task.priority}
                </span>
            </div>

            {/* Card Body */}
            <p className="mt-2 text-gray-600">{task.description}</p>
            
            {/* Due Date */}
            <div className="mt-2 text-sm text-gray-500">
                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </div>

            {/* Status */}
            <div className="mt-2 text-sm text-gray-500">
                <strong>Status:</strong> <span className={`font-semibold ${task.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{task.status}</span>
            </div>

            {/* User Details - Showing who created the task */}
            <div className="mt-4 flex items-center">
                {/* Profile Picture */}
                <img 
                    src={task.userId.profilePic || '/default-avatar.png'} 
                    alt="User Avatar" 
                    className="w-10 h-10 rounded-full object-cover mr-3" 
                />
                {/* User Name and Email */}
                <div>
                    <strong className="font-semibold">{task.userId.username}</strong> 
                </div>
            </div>

            {/* Card Footer - View Details Button */}
            <button
                type="button"
                onClick={handleViewTask}
                className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200"
            >
                <FaEye className="mr-2" /> View Details
            </button>
        </div>
    );
}
