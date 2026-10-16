import styled from 'styled-components';
import Row from '../components/layout/Row';
import Heading from '../components/reusable/Heading';
import UsersList from '../components/features/users/UsersList';

function Users() {
  return (
    <>
      <Row>
        <Heading>Users</Heading>
      </Row>

      <Row>
        <UsersList />
      </Row>
    </>
  );
}

export default Users;
