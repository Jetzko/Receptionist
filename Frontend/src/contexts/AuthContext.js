import { createContext } from 'react';

export const AuthContext = createContext();

export function AuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
  }
}
