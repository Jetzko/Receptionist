import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { useCabinsContext } from './useCabinsContext';

export function useLogout() {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: cabinsDispatch } = useCabinsContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');

    authDispatch({ type: 'LOGOUT' });
    cabinsDispatch({ type: 'SET_CABINS', payload: null });
  };

  return { logout };
}
