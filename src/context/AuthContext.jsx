import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!api.getAuthToken()) {
        setLoading(false);
        return;
      }
      try {
        const current = await api.getCurrentUser();
        if (mounted) setUser(current);
      } catch {
        api.setAuthToken(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      async login(credentials) {
        const { token, user: nextUser } = await api.login(credentials);
        api.setAuthToken(token);
        setUser(nextUser);
        return nextUser;
      },
      async signup(payload) {
        const { token, user: nextUser } = await api.signup(payload);
        api.setAuthToken(token);
        setUser(nextUser);
        return nextUser;
      },
      logout() {
        api.setAuthToken(null);
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
