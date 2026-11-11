import Row from '../components/layout/Row';
import Heading from '../components/reusable/Heading';
import UsersList from '../components/features/users/UsersList';
import AddUser from '../components/features/users/AddUser';

function Users() {
  return (
    <>
      <Row>
        <Heading>Users</Heading>
      </Row>

      <Row>
        <UsersList />
        {/* <Button $type='primary' $size='large'>A</Button> */}
      </Row>

      <Row>
        <AddUser />
      </Row>
    </>
  );
}

export default Users;
