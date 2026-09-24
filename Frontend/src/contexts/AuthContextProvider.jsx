import { useReducer } from 'react';
import { useEffect } from 'react';
import {
  authReducer,
  AuthContext,
} from '../../../MERN-App/frontend/src/context/AuthContext';

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) dispatch({ type: 'LOGIN', payload: user });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
