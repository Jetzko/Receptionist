import { useAuthContext } from './useAuthContext';
import { useCabinsContext } from './useCabinsContext';

export function useLogout() {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: cabinsDispatch } = useCabinsContext();

  const logout = () => {
    localStorage.removeItem('user');

    authDispatch({ type: 'LOGOUT' });
    cabinsDispatch({ type: 'SET_CABINS', payload: null });
  };

  return { logout };
}
