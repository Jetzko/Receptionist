import styled from 'styled-components';
import UserAvatar from '../reusable/UserAvatar';
import HeaderMenu from './HeaderMenu';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: flex-end;
  grid-column: 2;
  padding: 1.2rem 4.8rem;
  gap: 2.4rem;
  /* background-color: #fff; */
  background-color: var(--color-primary-tint-950);
  border-bottom: 1px solid var(--color-primary-tint-500);
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
