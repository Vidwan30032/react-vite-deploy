import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Heart, Search, PawPrint, User, LogOut, UserPlus, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        isScrolled ? 'bg-white/80 shadow-md py-2' : 'bg-white/30 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <PawPrint className="h-8 w-8 text-primary-600" />
          <span className="text-2xl font-extrabold text-primary-800 tracking-wide">Zoopta</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/pets" label="Find a Pet" icon={<Search className="h-4 w-4" />} />
          <NavLink to="/about" label="About Us" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-sm hover:text-primary-600 flex items-center space-x-1">
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                    alt={user?.name || 'User'}
                    className="h-8 w-8 rounded-full border-2 border-primary-300 shadow-sm"
                  />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50">
                    <User className="inline mr-2 h-4 w-4" /> My Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                  >
                    <LogOut className="inline mr-2 h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-primary-600 flex items-center space-x-1">
                <LogIn className="h-4 w-4" /> <span>Log In</span>
              </Link>
              <Link to="/register" className="btn btn-primary flex items-center">
                <UserPlus className="mr-1 h-4 w-4" /> <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-primary-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-4">
                <MobileNavLink to="/" label="Home" />
                <MobileNavLink to="/pets" label="Find a Pet" icon={<Search className="h-5 w-5 mr-2" />} />
                <MobileNavLink to="/about" label="About Us" />
                <MobileNavLink to="/contact" label="Contact" />
              </nav>
              <div className="pt-4 border-t mt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                        alt={user?.name || 'User'}
                        className="h-10 w-10 rounded-full border-2 border-primary-300"
                      />
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                      <User className="h-5 w-5" /> <span>My Dashboard</span>
                    </Link>
                    <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                      <Heart className="h-5 w-5" /> <span>Favorites</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 w-full"
                    >
                      <LogOut className="h-5 w-5" /> <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" className="btn btn-outline w-full">
                      <LogIn className="mr-2 h-5 w-5" /> <span>Log In</span>
                    </Link>
                    <Link to="/register" className="btn btn-primary w-full">
                      <UserPlus className="mr-2 h-5 w-5" /> <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink: React.FC<{ to: string; label: string; icon?: React.ReactNode }> = ({ to, label, icon }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={`relative flex items-center space-x-1 font-semibold transition-colors ${
        isActive ? 'text-primary-600' : 'text-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary-600 rounded-full"
        />
      )}
    </Link>
  );
};

const MobileNavLink: React.FC<{ to: string; label: string; icon?: React.ReactNode }> = ({ to, label, icon }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={`flex items-center py-2 font-medium transition-colors ${
        isActive ? 'text-primary-600 bg-primary-50 -mx-4 px-4 rounded-md' : 'text-gray-700 hover:text-primary-600'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;