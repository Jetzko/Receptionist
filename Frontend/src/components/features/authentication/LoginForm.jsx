import { useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import Form from '../../Form';
import FormRowVertical from '../../FormRowVerical';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import SpinnerMini from '../../reusable/SpinnerMini';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledParagaph = styled.p`
  font-weight: var(--font-weight-medium);
`;

const StyledLink = styled(Link)`
  color: var(--color-tertiary-base);
  font-weight: var(--font-weight-heavy);
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await login(email, password);

    if (res.ok) {
      setEmail('');
      setPassword('');
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      <FormRowVertical>
        <Button $size='large' disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <StyledParagaph>
          Don't have an account yet?{' '}
          <StyledLink to='/signup'>Sign up</StyledLink>.
        </StyledParagaph>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
