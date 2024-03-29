import React, { useState, createContext } from 'react';

export const UserContext = createContext(null);

export default function ProvideAuth ({ children }) {
  const [token, setToken] = useState('');
  // const auth = {token, setToken};  --> makes it an object and better than array below
  const auth = [token, setToken];
  return <UserContext.Provider value={auth}>{ children }</UserContext.Provider>
}