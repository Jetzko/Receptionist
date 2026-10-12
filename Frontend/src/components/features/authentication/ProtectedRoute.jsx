import { useUser } from '../../../hooks/useUser';
import Spinner from '../../reusable/Spinner';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-primary-tint-950);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  console.log(user);

  // 1. Load Authenticated user
  const { isLoading, isAuthenticated, checkUserAuth } = useUser();

  // 2. If there is No authenticated user, redirect to /login
  useEffect(() => {
    async function protectRoute() {
      if (!user) {
        navigate('/login');
      }

      if (user) {
        await checkUserAuth(user._id);
      }
    }
    protectRoute();
  }, [user]);

  // 3.While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
