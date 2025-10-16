import React, { createContext, useState, useEffect, useRef } from 'react';
import { authService } from '../services/auth';
import { clearTokens } from '../services/token';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { getCurrentUser } = authService();
  const isInitialized = useRef(false); // Защита от повторного вызова

  useEffect(() => {
    // Защита от двойного вызова в Strict Mode
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeAuth = async () => {
      await login();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
    setIsAuthenticated(!!userData);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearTokens();
  };

  const authValue = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
