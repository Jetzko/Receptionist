import { useState } from 'react';
import Form from '../../Form';
import { useSignup } from '../../../hooks/useSignup';
import FormRowVertical from '../../FormRowVerical';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import SpinnerMini from '../../reusable/SpinnerMini';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const StyledParagaph = styled.p`
  font-weight: var(--font-weight-medium);
`;

const StyledLink = styled(Link)`
  color: var(--color-tertiary-base);
  font-weight: var(--font-weight-heavy);
`;

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, response, isLoading } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    if (fullName === '' || email === '' || password === '')
      return toast.error('Please compile all fields.');
    if (password === confirmPassword) {
      const res = await signup({ email, password, fullName });

      if (res.ok) {
        toast.success('Successfully signed up!');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res.error);
      }
    }
    if (password !== confirmPassword)
      toast.error('The two passwords do not match.');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Full name'>
        <Input
          type='text'
          id='fullName'
          value={fullName}
          disabled={isLoading}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label='Confirm password'>
        <Input
          type='password'
          id='confirm-password'
          autoComplete='current-password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size='large' disabled={isLoading}>
          {!isLoading ? 'Sign up' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <StyledParagaph>
          Do you have already an account?{' '}
          <StyledLink to='/login'>Log in</StyledLink>.
        </StyledParagaph>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
