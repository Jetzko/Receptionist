import styled from 'styled-components';
import Form from '../../Form';
import Input from '../../reusable/Input';
import Button from '../../reusable/Button';
import FormRowVertical from '../../FormRowVerical';
import { useState } from 'react';
import FormRow from '../../FormRow';
import { useAddUser } from '../../../hooks/useAddUser';

const AddUserContainer = styled.div`
  width: fit-content;
`;

const Select = styled.select`
  border-radius: var(--border-radius-sm);
  padding: var(--padding-xsm);
`;

const FormWindow = styled.div`
  /* position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%); */
  /* z-index: 10; */
  background-color: #fff;
  padding: var(--padding-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-md);
  width: fit-content;
`;

// const Background = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   backdrop-filter: blur(10px);
//   z-index: 9;
// `;

function AddUser() {
  const [nickname, setNickname] = useState('');
  const [role, setRole] = useState('');
  // const [isModalOn, setIsModalOn] = useState(false);
  const { addUser, isLoading, error } = useAddUser();

  async function handleSubmit(e, nickname, user) {
    e.preventDefault();

    const res = await addUser(nickname, user);
    if (res === 'ok') {
      setNickname('');
      setRole('');
      // setIsModalOn(false);
    }
  }

  // function handleQuitModal() {
  //   setIsModalOn(false);
  //   setNickname('');
  //   setRole('');
  // }

  return (
    <AddUserContainer>
      {/* <Button onClick={() => setIsModalOn(true)}>Add a new user</Button> */}
      {/* {isModalOn && (
        <> */}
      {/* <Background onClick={handleQuitModal} /> */}
      {/* <FormWindow> */}
      <Form type='regular' onSubmit={(e) => handleSubmit(e, nickname, role)}>
        <FormRow label='User Nickname' error={error} disabled={isLoading}>
          <Input
            placeholder="Insert user's nickname"
            type='text'
            id='add-user'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </FormRow>
        <FormRow label='Pick a role' error={error} disabled={isLoading}>
          <Select
            name='role'
            id='role-select'
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value=''>--Please chose a role--</option>
            <option value='admin'>Admin</option>
            <option value='collaborator'>Collaborator</option>
          </Select>
        </FormRow>
        <FormRowVertical>
          <Button
            type='submit'
            $size='large'
            $variation='primary'
            disabled={isLoading}
          >
            Add User
          </Button>
        </FormRowVertical>
      </Form>
      {/* </FormWindow> */}
      {/* </> */}
      {/* )} */}
    </AddUserContainer>
  );
}

export default AddUser;
