import { useCallback, useState } from 'react';
import { useUsersContext } from './useUsersContext';
import { useAuthContext } from './useAuthContext';

export function useGetAllUsers() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useUsersContext();
  const { user } = useAuthContext();

  const getAllUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/required/${user?._id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });

      const users = await response.json();

      if (!response.ok) {
        setError(
          users.error ?? users.message ?? `HTTP Error: ${response.status}`,
        );
        return null;
      }

      dispatch({ type: 'GET_ALL_USERS', payload: users });

      return users;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, dispatch]);

  return { getAllUsers, isLoading, error };
}
