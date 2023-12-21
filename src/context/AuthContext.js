import React, { createContext, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../utils/mutations';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken]= useState(localStorage.getItem('token') || '');
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);

  const handleLogin = async (input) => {
    try {
      const { data } = await loginMutation({ variables: { input } });
      if (data && data.login) {
        console.log(data.login.usuario);
        setUser(data.login.usuario);
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('user', JSON.stringify(data.login.usuario));

      }
    } catch (error) {
      console.error('Error during login', error);
      throw error;
    }
  };

  const handleRegister = async (input) => {
    try {
      const { data } = await registerMutation({ variables: { input } });
      if (data && data.register) {
        setUser(data.register.usuario);
        localStorage.setItem('token', data.register.token);
      }
    } catch (error) {
      console.error('Error during registration', error);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
