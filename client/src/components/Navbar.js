import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineFundProjectionScreen, AiOutlineLogout } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { useAdmin } from '../context/AdminContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', icon: <AiOutlineHome />, label: 'Home' },
    { path: '/about', icon: <AiOutlineUser />, label: 'About' },
    { path: '/projects', icon: <AiOutlineFundProjectionScreen />, label: 'Projects' },
    { path: '/resume', icon: <CgFileDocument />, label: 'Resume' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-darker/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="w-16 h-16 rounded-full border-2 border-primary object-cover hover:scale-150 transition-transform duration-300 cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'text-gray-300 hover:text-primary hover:bg-primary/10'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Admin Status & Sign Out */}
            {isAdmin && (
              <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-primary/30">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                  Admin
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                  title="Sign Out"
                >
                  <AiOutlineLogout className="text-lg" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IoClose /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-darker/98 backdrop-blur-lg border-t border-primary/20">
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'text-gray-300 hover:text-primary hover:bg-primary/10'
                }`}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-lg">{link.label}</span>
              </Link>
            ))}
            
            {/* Mobile Admin Status & Sign Out */}
            {isAdmin && (
              <div className="pt-3 border-t border-primary/30">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                    Logged in as Admin
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <AiOutlineLogout />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
