import { createContext, useReducer } from 'react';
import cabinsRouter from '../../../Backend/routes/cabinsRouter';

export const CabinsContext = createContext();

export const cabinsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CABINS':
      return {
        ...state,
        cabins: action.payload,
      };
    case 'CREATE_CABIN':
      return {
        cabins: [action.payload, ...state.cabins],
      };
    case 'UPDATE_CABIN':
      return {
        ...state,
        cabins: state.cabins.map((cabin) =>
          cabin._id === action.payload._id ? action.payload : cabin,
        ),
      };
    case 'DELETE_CABIN':
      return {
        ...state,
        cabins: state.cabins.filter(
          (cabin) => cabin._id !== action.payload._id,
        ),
      };
    default:
      return state;
  }
};

export const CabinsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cabinsRouter, {
    cabins: null,
  });

  return (
    <CabinsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CabinsContext.Provider>
  );
};
