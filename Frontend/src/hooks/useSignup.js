import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  async function signup(email, password, fullName) {
    setisLoading(true);
    setError(null);

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    });

    const json = await response.json();

    if (!response.ok) {
      setisLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({ type: 'SIGNUP', payload: json });
      setisLoading(false);
      navigate('/');
    }
  }

  return { signup, isLoading, error };
}
