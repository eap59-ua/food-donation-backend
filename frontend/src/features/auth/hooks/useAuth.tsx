import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface AuthUser {
  sub: string; // The user ID or email encoded in JWT
  role?: string;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const performLogin = (token: string) => {
    try {
      const decoded = jwtDecode<AuthUser>(token);
      localStorage.setItem('auth_token', token);
      setUser(decoded);
    } catch (e) {
      console.error('Invalid token', e);
      performLogout();
    }
  };

  const performLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      performLogout();
    };

    window.addEventListener('auth_unauthorized', handleUnauthorized);
    
    // Check initial token on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decoded = jwtDecode<AuthUser>(token);
        // Check if token is expired (exp is in seconds)
        if (decoded.exp * 1000 < Date.now()) {
          performLogout();
        } else {
          setUser(decoded);
        }
      } catch {
        performLogout();
      }
    }
    
    setIsLoading(false);

    return () => {
      window.removeEventListener('auth_unauthorized', handleUnauthorized);
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      login: performLogin,
      logout: performLogout,
      isLoading
    }}>
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
