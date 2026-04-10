import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('turmaline_token'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('turmaline_token'));
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (tokenToUse) => {
    try {
      const userData = await getMe(tokenToUse);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Erro ao autenticar usuário:", err);
      // Se falhar ao buscar o user com o token, faz logout preventivo
      localStorage.removeItem('turmaline_token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, [token, fetchUser]);

  const login = useCallback((accessToken) => {
    localStorage.setItem('turmaline_token', accessToken);
    setToken(accessToken);
    setIsAuthenticated(true); // Ativa imediatamente para evitar loops de redirect
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('turmaline_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Sincroniza o estado se o token for removido externamente (ex: outro aba)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'turmaline_token') {
        setToken(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acessar o contexto de autenticação em qualquer componente.
 * Uso: const { isAuthenticated, login, logout, token } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
