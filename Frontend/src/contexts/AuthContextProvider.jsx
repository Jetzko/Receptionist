import { useReducer } from 'react';
import { AuthReducer, AuthContext } from './AuthContext';

function getLocalUser() {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || !storedUser.token || !storedUser._id)
      return { user: null };

    const user = { user: storedUser };
    return user;
  } catch (err) {
    console.error(err.message);
    return { user: null };
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, getLocalUser);
  // const user = JSON.parse(localStorage.getItem('user'));

  // if (state.user) dispatch({ type: 'LOGIN', payload: state.user });
  // useEffect(() => {
  //   console.log('Checking for user in Storage');

  //   if (user) dispatch({ type: 'LOGIN', payload: user });
  // }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
