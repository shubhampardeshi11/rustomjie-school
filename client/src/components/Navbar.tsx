import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow-sm fixed w-full z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-900">Rustomjie International School</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
          <Link to="/academics" className="text-gray-700 hover:text-blue-600 transition-colors">Academics</Link>
          <Link to="/admissions" className="text-gray-700 hover:text-blue-600 transition-colors">Admissions</Link>
          <Link to="/news-events" className="text-gray-700 hover:text-blue-600 transition-colors">News & Events</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors font-semibold">Admin</Link>
          <li><a href="/student/login" className="hover:text-blue-700 font-semibold">Student Login</a></li>
          <button className="ml-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar; 