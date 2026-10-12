import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export function useUser() {
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState('');
  const { user } = useAuthContext();

  async function checkUserAuth(id) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        setIsAuthenticated(false);
        // throw new Error(json.error || 'Token not valid');
      } else {
        // dispatch({ type: 'GET_USER', payload: json });
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(null);
      console.error('Finding user error:', err);
    } finally {
      setIsLoading(false);
      // setIsAuthenticated(null);
    }
  }

  return { checkUserAuth, isLoading, isAuthenticated, error };
}
