import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setIsAdmin(true);
      setAdminPassword(savedPassword);
    }
  };

  const login = (password) => {
    sessionStorage.setItem('adminPassword', password);
    setIsAdmin(true);
    setAdminPassword(password);
  };

  const logout = () => {
    sessionStorage.removeItem('adminPassword');
    // Only clear localStorage if "rememberMe" flag is not set to "true"
    const rememberMeEnabled = localStorage.getItem('rememberMe') === 'true';
    if (!rememberMeEnabled) {
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminPassword');
    }
    setIsAdmin(false);
    setAdminPassword('');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminPassword, login, logout, checkAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
};
