import { createContext } from 'react';

export const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return {
        users: action.payload,
      };
    case 'ADD_ADMIN':
      return {
        users: {
          admins: [...state.users.admins, action.payload],
          collaborators: [...state.users.collaborators],
        },
      };
    case 'ADD_COLLAB':
      return {
        users: {
          admins: [...state.users.admins],
          collaborators: [...state.users.collaborators, action.payload],
        },
      };
    case 'DELETE_USER':
      return {
        users: {
          admins: state.users.admins.filter(
            (user) => user._id !== action.payload,
          ),
          collaborators: state.users.collaborators.filter(
            (user) => user._id !== action.payload,
          ),
        },
      };
    case 'UPDATE_USER':
      return {
        users: [state.users.map((user) => user)],
      };
  }
};
