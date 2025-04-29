import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, deleteTask, getTaskById } from '../store/slices/taskSlice';
import { toast } from 'react-toastify';
import { FaList, FaTh } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from '../components/task/TaskCard';
import TaskTable from '../components/task/TaskTable';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';

export default function TaskDashboard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks = [], loading, error } = useSelector(state => state.task);

  const [view, setView] = useState('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const tasksPerPage = 6;

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(getTaskById({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [sortBy]);

  // Memoizing the handler functions
  const handleDeleteTask = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTask({ id }));
      toast.success("Task Deleted Successfully");
      dispatch(getAllTasks());
    }
  }, [dispatch]);

  const handleViewTask = useCallback((id) => navigate(`/tasks/${id}`), [navigate]);
  const handleEditTask = useCallback((id) => navigate(`/edit-task-form/${id}`), [navigate]);

  const sortTasks = (taskList) => {
    if (sortBy === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return [...taskList].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    if (sortBy === 'status') {
      const statusOrder = { Completed: 1, 'In Progress': 2, Pending: 3 };
      return [...taskList].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    }
    if (sortBy === 'dueDate') {
      return [...taskList].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    return taskList;
  };

  const sortedTasks = sortTasks(tasks);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-indigo-600">Your Tasks</h1>

        {/* View Toggle & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Sorting Control */}
          <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                view === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              title="List View"
            >
              <FaList />
            </button>
            <button
              onClick={() => setView('card')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                view === 'card'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              title="Card View"
            >
              <FaTh />
            </button>
          </div>

        </div>

      </div>

      {/* Loading / Error */}
      {loading && <Loader />}
      {error && <p className="text-red-500">{error.message}</p>}

      {/* Content */}
      {view === 'list' ? (
        <TaskTable
          tasks={currentTasks}
          onView={handleViewTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTasks.length === 0 && !loading ? (
            <p className="text-gray-500 font-bold text-xl">No tasks available.</p>
          ) : (
            currentTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {sortedTasks.length > tasksPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
