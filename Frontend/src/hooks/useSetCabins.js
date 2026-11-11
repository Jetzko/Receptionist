import { useCallback, useState } from 'react';
import { useCabinsContext } from './useCabinsContext';
import { useAuthContext } from './useAuthContext';

export function useSetCabins() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useCabinsContext();
  const { user } = useAuthContext();

  const setCabins = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cabins', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Unable to download cabins');
      }

      dispatch({ type: 'SET_CABINS', payload: json });
    } catch (err) {
      setError(err.message);
      console.error('Downloading cabins error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, dispatch]);

  return { setCabins, isLoading, error };
}
