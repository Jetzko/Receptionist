import styled from 'styled-components';
import UserAvatar from './UserAvatar';
import HeaderMenu from './HeaderMenu';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: flex-end;
  grid-column: 2;
  padding: 1.2rem 4.8rem;
  gap: 2.4rem;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.4rem;
`;

function Header() {
  return (
    <HeaderStyled>
      <UserAvatar />

      <ButtonsGroup>
        <HeaderMenu />
      </ButtonsGroup>
    </HeaderStyled>
  );
}

export default Header;
