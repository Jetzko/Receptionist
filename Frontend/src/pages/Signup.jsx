import styled from 'styled-components';
import Logo from '../components/layout/Logo';
import Heading from '../components/reusable/Heading';
import SignupForm from '../components/features/authentication/SignupForm';

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: var(--space-6);
  background-color: var(--color-primary-tint-950);
`;

function Signup() {
  return (
    <SignupLayout>
      <Logo />
      <Heading as='h4'>Create a new account</Heading>
      <SignupForm />
    </SignupLayout>
  );
}

export default Signup;
