import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center z-50">
      <FaSpinner className="animate-spin text-indigo-600 text-4xl mb-4" />
      <p className="text-gray-700 text-lg font-medium">Loading...</p>
    </div>
  );
}
