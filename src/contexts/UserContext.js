// UserContext.js

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  const setUser = (email) => {
    setUserEmail(email);
  };

  return (
    <UserContext.Provider value={{ userEmail, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
