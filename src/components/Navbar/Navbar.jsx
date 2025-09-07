// src/components/Navbar/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../AuthModal/AuthModal';
import { LogOut } from 'lucide-react';
import { MicVocal, House, History } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold hover:text-gray-200 transition-colors"
          >
            <MicVocal className="w-6 h-6" />
            <span>Speech Transcriber</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {/* Navigation Links (only show if authenticated) */}
            {isAuthenticated && (
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 ${
                    location.pathname === "/" 
                      ? "bg-blue-700 font-semibold" 
                      : ""
                  }`}
                >
                  <House className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/history"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 ${
                    location.pathname === "/history" 
                      ? "bg-blue-700 font-semibold" 
                      : ""
                  }`}
                >
                  <History className="w-5 h-5"/>
                  <span>History</span>
                </Link>
              </div>
            )}

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    {getUserInitials(user?.name || user?.email || 'U')}
                  </div>
                  <span className="hidden md:block">{user?.name || user?.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    
                    {/* Mobile Navigation Links */}
                    <div className="md:hidden">
                      <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <House className="w-4 h-4" /> Home
                      </Link>
                      <Link
                        to="/history"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <History className="w-4 h-4" /> History
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                    </div>
                    
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors rounded-md"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>

                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 text-blue-100 hover:text-white border border-blue-400 hover:border-blue-300 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Close user menu when clicking outside */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
