import styled from 'styled-components';

const UserCardStyled = styled.li`
  width: 30.4rem;
  height: 49.2rem;
  background-color: purple;
  flex-shrink: 0;
`;

function UserCard() {
  return <UserCardStyled></UserCardStyled>;
}

export default UserCard;
