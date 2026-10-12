import styled from 'styled-components';
import Logo from '../components/layout/Logo';
import Heading from '../components/reusable/Heading';
import LoginForm from '../components/features/authentication/LoginForm';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: var(--space-6);
  background-color: var(--color-primary-tint-950);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Log into your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
