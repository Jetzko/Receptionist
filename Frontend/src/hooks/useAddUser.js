import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useUsersContext } from './useUsersContext';

export function useAddUser() {
  const { user, dispatch: dispatchActiveUser } = useAuthContext();
  const { dispatch: dispatchUsers } = useUsersContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async function (nickname, role) {
    setError(null);

    if (!user) {
      setError('There is any user authenticated.');
      return 'error';
    }

    if (role !== 'admin' && role !== 'collaborator') {
      setError('This role is not valid.');
      return 'error';
    }

    setIsLoading(true);

    try {
      const newUserRes = await fetch(`/api/users/nickname/${nickname}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      });

      const newUser = await newUserRes.json();

      if (!newUserRes.ok) {
        setError(`HTTP Error: ${newUser.error}`);
        return 'error';
      }

      if (user.users_id.admins_id.some((admin) => admin === newUser._id)) {
        setError('This admin is already between your users');

        return 'error';
      }
      const adminsBody = {
        users_id: {
          admins_id: [...user.users_id.admins_id, newUser._id],
          collaborators_id: [...user.users_id.collaborators_id],
        },
      };

      if (
        user.users_id.collaborators_id.some(
          (collaborator) => collaborator === newUser._id,
        )
      ) {
        setError('This collaborator is already between your users');

        return 'error';
      }
      const collaboratorsBody = {
        users_id: {
          admins_id: [...user.users_id.admins_id],
          collaborators_id: [...user.users_id.collaborators_id, newUser._id],
        },
      };

      const updateUserRes = await fetch(`/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user?.token}`,
        },
        body:
          role === 'admin'
            ? JSON.stringify(adminsBody)
            : JSON.stringify(collaboratorsBody),
      });

      const updatedUserData = await updateUserRes.json();
      if (!updateUserRes.ok) {
        setError(`HTTP Error: ${updatedUserData.message}`);
        setError(
          updatedUserData.error ??
            updatedUserData.message ??
            `Errore HTTP ${updateUserRes.status}`,
        );

        return 'error';
      }

      const users_id = updatedUserData.users_id;
      const userData = { ...user, users_id };

      if (updateUserRes.ok)
        localStorage.setItem('user', JSON.stringify(userData));

      dispatchActiveUser({ type: 'GET_USER', payload: userData });

      if (role === 'admin')
        dispatchUsers({ type: 'ADD_ADMIN', payload: newUser });
      if (role === 'collaborator')
        dispatchUsers({ type: 'ADD_COLLAB', payload: newUser });

      return 'ok';
    } catch (err) {
      setError(err.message);
      return 'error';
    } finally {
      setIsLoading(false);
    }
  };

  return { addUser, error, isLoading };
}
