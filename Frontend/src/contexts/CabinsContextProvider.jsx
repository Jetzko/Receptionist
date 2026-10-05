import { useReducer } from 'react';
import { CabinsContext, cabinsReducer } from './CabinsContext';

export const CabinsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cabinsReducer, {
    cabins: [],
  });

  return (
    <CabinsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CabinsContext.Provider>
  );
};
