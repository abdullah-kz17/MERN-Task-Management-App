import React from 'react';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';

export default function TaskTable({ tasks, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Priority</th>
            <th className="py-3 px-4 text-left">Due Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No tasks available.
              </td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4 font-medium">{task.title}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                    task.priority === 'High' ? 'bg-red-500' :
                    task.priority === 'Medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold text-xs ${
                    task.status === 'Completed' ? 'text-green-600' :
                    task.status === 'Pending' ? 'text-yellow-500' :
                    'text-gray-500'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-3">
                  <button onClick={() => onView(task._id)} className="text-indigo-600 hover:text-indigo-800"><FaEye /></button>
                  <button onClick={() => onEdit(task._id)} className="text-yellow-500 hover:text-yellow-700"><FaPen /></button>
                  <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
