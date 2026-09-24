import { CabinsContext } from '../contexts/CabinsContextProvider';
import { useContext } from 'react';

export const useCabinsContext = () => {
  const context = useContext(CabinsContext);

  if (!context) {
    throw Error('useCabinsContext must be inside a CabinsContextProvider');
  }

  return context;
};
