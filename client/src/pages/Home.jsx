import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaCheckCircle, FaUserAlt } from 'react-icons/fa'; // Importing React Icons for features
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const {isLoggedIn,user} = useAuth()
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="text-center py-20 bg-indigo-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Welcome {user?.username} to Todo App
        </h1>
        <p className="text-lg mb-8">
          Your ultimate task management solution to stay organized and productive.
        </p>
        <Link
          to="/tasks"
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-center">
            <FaTasks className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">
              Easily manage your tasks with custom due dates, priorities, and statuses.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-center">
            <FaCheckCircle className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Task Completion</h3>
            <p className="text-gray-600">
              Mark your tasks as completed and keep track of your progress.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-center">
            <FaUserAlt className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Profile</h3>
            <p className="text-gray-600">
              Customize your profile and manage personal task settings.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
     <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-indigo-600 mb-8">How It Works</h2>
          <p className="text-lg text-gray-700 mb-4">
            Get started by creating an account, add your tasks, and start managing them efficiently.
          </p>
          
          {isLoggedIn ? (
            // If the user is logged in, show this button to go to the Dashboard
            <Link
              to="/tasks"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300"
            >
              Go to Dashboard
            </Link>
          ) : (
            // If the user is not logged in, show the Sign Up button
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
