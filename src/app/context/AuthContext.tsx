import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAppData } from './AppDataContext';
import type { LoginCredentials, User, UserRole } from '../types/models';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  loginAsRole: (role: UserRole) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'uni-municipality:session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { authenticate, getDemoUserByRole } = useAppData();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    try {
      const session = JSON.parse(stored) as { user: User };
      return session.user;
    } catch {
      return null;
    }
  });

  const login = async (credentials: LoginCredentials) => {
    const result = await authenticate(credentials);
    setUser(result.user);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
    }

    return result.user;
  };

  const loginAsRole = async (role: UserRole) => {
    const nextUser = getDemoUserByRole(role);
    if (!nextUser) {
      throw new Error(`No active ${role.toLowerCase()} demo user is available.`);
    }

    setUser(nextUser);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: nextUser }));
    }

    return nextUser;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, loginAsRole, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
