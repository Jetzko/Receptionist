import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const { dispatch } = useAuthContext();

  async function login(email, password) {
    setisLoading(true);
    setError(null);

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setisLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({ type: 'LOGIN', payload: json });
      setisLoading(false);
    }
  }

  return { login, isLoading, error };
}
