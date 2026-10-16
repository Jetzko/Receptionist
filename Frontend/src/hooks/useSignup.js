import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const [isLoading, setisLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);

  async function signup({ email, password, fullName }) {
    setisLoading(true);
    try {
      // faccio la chiamata di rete
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const json = await res.json();

      // se il server mi rifiuta la chiamata
      if (!res.ok) {
        setisLoading(false);

        return { ok: false, error: json.error };
      }

      // se il server mi accetta la chiamta
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(json));

        dispatch({ type: 'SIGNUP', payload: json });
        setisLoading(false);
        setResponse({
          ok: true,
        });

        navigate('/');
        return { ok: true };
      }
    } catch (err) {
      // se la chiamata non funziona
      setisLoading(false);

      return { ok: false, error: err.message };
    }
  }

  return { signup, response, isLoading };
}
