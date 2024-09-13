import React, { createContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulate registration
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { name, email, password };
        setUser(newUser);
        resolve(newUser);
      }, 1000);
    });
  };

  // Simulate login
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.email === email && user.password === password) {
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  // Simulate logout
  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        resolve();
      }, 500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
