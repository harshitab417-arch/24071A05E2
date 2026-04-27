import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('retailer_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('retailer_users') || '[]');
    const exists = users.find(u => u.email === userData.email);
    if (exists) throw new Error('Email already registered');
    const newUser = { ...userData, id: Date.now(), createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('retailer_users', JSON.stringify(users));
    return newUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('retailer_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _p, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('retailer_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('retailer_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
