import { Navigate } from 'react-router';
import styled from 'styled-components';
import ButtonIcon from './reusable/ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import Logout from './Logout';
import DarkModeToggle from './DarkModeToggle';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => Navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
