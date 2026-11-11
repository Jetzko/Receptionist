import { useReducer } from 'react';
import { UsersContext, usersReducer } from './UsersContext';

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: null,
  });

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
