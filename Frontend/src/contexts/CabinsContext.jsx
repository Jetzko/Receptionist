import { useReducer } from 'react';
import { CabinsContext, cabinsReducer } from './CabinsReducer';

export const CabinsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cabinsReducer, {
    cabins: null,
  });

  return (
    <CabinsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CabinsContext.Provider>
  );
};
