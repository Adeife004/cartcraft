import { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [loading, setLoading] = useState(true);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await userAPI.login({ email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await userAPI.signup({ name, email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Signup failed. Please try again.' 
      };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Open auth modal
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Close auth modal
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Switch between login and signup
  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    switchAuthMode,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};