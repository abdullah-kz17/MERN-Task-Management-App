import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
       <div className="text-white">
  <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
    <FaTasks className="text-white text-2xl" />
    <span>Task Manager</span>
  </h2>
  <p className="text-sm leading-relaxed text-indigo-100">
    Simplify your productivity. Organize tasks, collaborate easily, and achieve more every day with Task Manager.
  </p>
</div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link to="/tasks" className="hover:text-indigo-400 transition-colors">Tasks</Link></li>
            <li><Link to="/profile" className="hover:text-indigo-400 transition-colors">Profile</Link></li>
            <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-indigo-400 transition-transform transform hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-indigo-400 transition-transform transform hover:scale-110">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-indigo-400 transition-transform transform hover:scale-110">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-indigo-400 transition-transform transform hover:scale-110">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </div>
    </footer>
  );
}
