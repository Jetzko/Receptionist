import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { dispatch } = useAuthContext();

  async function signup(email, password) {
    setisLoading(true);
    setError(null);

    const response = await fetch('api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = response.json();

    if (!response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({ type: 'LOGIN', payload: json });
      setisLoading(false);
    }
  }

  return { signup, isLoading, error };
}
