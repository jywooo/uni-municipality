import { createContext, useContext, useMemo, useState } from 'react';
import { useAppData } from './AppDataContext.jsx';

const AuthContext = createContext(undefined);
const STORAGE_KEY = 'municipality-events-session';

function loadSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const { loginUser, getUserByRole, createParticipantUser } = useAppData();
  const [user, setUser] = useState(loadSession);

  const login = ({ email, password }) => {
    const nextUser = loginUser(email, password);
    if (!nextUser) {
      throw new Error('Invalid email, password, or inactive account.');
    }

    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return nextUser;
  };

  const loginAsRole = (role) => {
    const nextUser = getUserByRole(role);
    if (!nextUser) {
      throw new Error(`No active ${role.toLowerCase()} user is available.`);
    }

    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return nextUser;
  };

  const registerParticipant = (values) => {
    const nextUser = createParticipantUser(values);
    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return nextUser;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      loginAsRole,
      registerParticipant,
      logout,
    }),
    [createParticipantUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
