import styled from 'styled-components';

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
      <span>Icon</span>

      <ButtonsGroup>
        <span>Account</span>
        <span>Dark</span>
        <span>Logout</span>
      </ButtonsGroup>
    </HeaderStyled>
  );
}

export default Header;
