import { useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import Form from '../../Form';
import FormRowVertical from '../../FormRowVerical';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import SpinnerMini from '../../reusable/SpinnerMini';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';

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
  const [errorComponents, setErrorComponets] = useState([]);
  const { login, isLoading } = useLogin();

  // function errorHandler(errorFields) {
  //   errorFields.map;
  //   if (errorField === '') {
  //     toast.error(`Plase write you ${errorField}`);
  //     setErrorComponets(() => errorComponents.push(errorField));
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === '') {
      toast.error('Plaese write your email');
    }

    if (password === '') {
      toast.error('Plase write your password');
    }

    const res = await login(email, password);

    if (res.ok) {
      setEmail('');
      setPassword('');
      toast.success('Logged in!');
    }

    if (!res.ok) {
      toast.error(res.error);
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
