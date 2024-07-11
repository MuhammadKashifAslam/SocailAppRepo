import React, { createContext, useContext } from 'react';
import UserStore from './UserStore';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const store = {
    userStore: UserStore,
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
