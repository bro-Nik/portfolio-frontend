import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { getToken, isTokenValid, clearTokens } from '../services/token';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { refreshTokens, getProfile } = authService();

  const checkAuth = async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    if (!isTokenValid(token)) {
      console.log('токен просрочен')
      await refreshTokens();
    }

    await tryLogin();
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const tryLogin = async () => {
    const data = await getProfile();
    if (data) {
      login(data);
    } else {
      logout()
    }
  };

  const login = (data) => {
    setUser(data);
    setIsAuthenticated(true);
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
    tryLogin
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
