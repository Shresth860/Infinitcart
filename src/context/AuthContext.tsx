import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/services/api';

interface JWTPayload {
  sub: string;
  role: 'ADMIN' | 'CUSTOMER';
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<JWTPayload>(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp > currentTime) {
          setToken(storedToken);
          setUser({
            email: decoded.sub,
            role: decoded.role,
          });
        } else {
          localStorage.removeItem('token');
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode<JWTPayload>(newToken);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser({
        email: decoded.sub,
        role: decoded.role,
      });
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
