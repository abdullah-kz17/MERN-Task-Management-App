import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaList, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaPlusCircle, FaBars, FaTasks, FaCalendarAlt } from 'react-icons/fa';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); 
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center space-x-2">
                    <FaTasks className="text-indigo-600" />
                    <span>Task Manager</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="space-x-6 hidden md:flex items-center">
                    <Link to="/" className="text-gray-700 hover:text-indigo-600 transition flex items-center space-x-1">
                        <FaHome />
                        <span>Home</span>
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/tasks" className="text-gray-700 hover:text-indigo-600 transition flex items-center space-x-1">
                                <FaList />
                                <span>Tasks</span>
                            </Link>
                            <Link to="/profile" className="text-gray-700 hover:text-indigo-600 transition flex items-center space-x-1">
                                <FaUser />
                                <span>Profile</span>
                            </Link>

                            <button
                                onClick={logout}
                                className="text-gray-700 hover:text-indigo-600 transition flex items-center space-x-1"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition flex items-center space-x-1">
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                            <Link to="/register" className="text-gray-700 hover:text-indigo-600 transition flex items-center space-x-1">
                                <FaUserPlus />
                                <span>Register</span>
                            </Link>
                        </>
                    )}

                    {/* Add Task Button */}
                    {isLoggedIn && (
                        <Link
                            to="/taskform"
                            className="text-white bg-indigo-600 hover:bg-indigo-700 transition py-2 px-4 rounded-full flex items-center space-x-2"
                        >
                            <FaPlusCircle />
                            <span>Add Task</span>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-indigo-600">
                        <FaBars className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white py-4 px-6 space-y-4 shadow-md">
                    <Link to="/" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                        <FaHome />
                        <span>Home</span>
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link to="/tasks" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                                <FaList />
                                <span>Tasks</span>
                            </Link>
                            <Link to="/profile" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                                <FaUser />
                                <span>Profile</span>
                            </Link>

                            <button
                                onClick={logout}
                                className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                            <Link to="/register" className="text-gray-700 hover:text-indigo-600 flex items-center space-x-1">
                                <FaUserPlus />
                                <span>Register</span>
                            </Link>
                        </>
                    )}

                    {/* Add Task Button */}
                    {isLoggedIn && (
                        <Link
                            to="/taskform"
                            className="text-white bg-indigo-600 hover:bg-indigo-700 transition py-2 px-4 rounded-full flex items-center space-x-2"
                        >
                            <FaPlusCircle />
                            <span>Add Task</span>
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
