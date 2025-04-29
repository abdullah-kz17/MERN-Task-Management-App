import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom'; 
import { FaEdit } from 'react-icons/fa';

export default function Profile() {
  const { user } = useAuth(); 

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-8">
      <div className="text-center">
        {/* Profile Picture */}
        <div className="mb-6">
          <img
            src={user?.profilePic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-600"
          />
        </div>

        {/* User Info */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">{user?.username}</h2>
        <p className="text-lg text-gray-600 mb-1">{user?.email}</p>
        <p className="text-lg text-gray-600 mb-4">{user?.role}</p>

        {/* Admin Badge */}
        {user?.isAdmin && (
          <p className="text-sm text-white bg-red-600 inline-block px-3 py-1 rounded-full mb-6">
            Admin
          </p>
        )}

        {/* Edit Profile Button */}
<div className="mt-6">
  <Link
    to="/update-profile"
    className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
  >
    <FaEdit className="text-lg" />
    <span>Edit Profile</span>
  </Link>
</div>

      </div>
    </div>
  );
}
