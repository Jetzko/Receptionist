import { useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import Form from '../../Form';
import FormRowVertical from '../../FormRowVerical';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import SpinnerMini from '../../reusable/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(email, password, {
      onSettled: () => {
        setEmail('');
        setPassword('');
      },
    });
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
      <FormRowVertical label='password'>
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
    </Form>
  );
}

export default LoginForm;
