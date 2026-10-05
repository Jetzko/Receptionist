import { CabinsContext } from '../contexts/CabinsContext';
import { useContext } from 'react';

export const useCabinsContext = () => {
  const context = useContext(CabinsContext);

  if (!context) {
    throw Error('useCabinsContext must be inside a CabinsContextProvider');
  }

  return context;
};
