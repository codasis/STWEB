import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout as authLogout, getAccessToken } from './auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  needsAuth: boolean;
  isLoggingIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  fetchToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const login = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
    setToken(null);
    setNeedsAuth(true);
  };

  const fetchToken = async () => {
    return await getAccessToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, needsAuth, isLoggingIn, login, logout, fetchToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
