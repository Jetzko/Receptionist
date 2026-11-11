import { useCallback, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useUsersContext } from './useUsersContext';

export function useDeleteUser() {
  const { user, dispatch: dispatchActiveUser } = useAuthContext();
  const { dispatch: dispatchUsers } = useUsersContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUserFromList = useCallback(
    async (userIdToRemove) => {
      setIsLoading(true);
      setError(null);

      if (
        !user?.users_id ||
        !Array.isArray(user.users_id.admins_id) ||
        !Array.isArray(user.users_id.collaborators_id)
      ) {
        setError('Users data are not available');
        setIsLoading(false);
        return;
      }
      try {
        const { admins_id, collaborators_id } = user.users_id;

        const filteredAdmins_id = admins_id.filter(
          (id) => id !== userIdToRemove,
        );
        const filteredCollaborators_id = collaborators_id.filter(
          (id) => id !== userIdToRemove,
        );

        const body = {
          users_id: {
            admins_id: filteredAdmins_id,
            collaborators_id: filteredCollaborators_id,
          },
        };
        const res = await fetch(`/api/users/${user._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        const { users_id } = data;
        const userData = { ...user, users_id };

        if (!res.ok) {
          setError(data.error ?? data.message ?? `Errore HTTP ${res.status}`);
          return;
        }

        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(userData));

          dispatchActiveUser({ type: 'GET_USER', payload: userData });
          dispatchUsers({ type: 'DELETE_USER', payload: userIdToRemove });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [user, dispatchUsers, dispatchActiveUser],
  );

  return { deleteUserFromList, isLoading, error };
}
