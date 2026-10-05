import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const StyledLink = styled(NavLink)`
  display: flex;
  gap: var(--space-3);

  align-items: center;
  padding: var(--padding-sm) var(--padding-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-tint-200);

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-primary-shade-350);
    background-color: var(--color-primary-tint-850);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: var(--space-5);
    height: var(--space-5);
    color: var(--color-primary-tint-700);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-tertiary-base);
  }
`;

function Navbar() {
  return (
    <nav>
      <StyledList>
        <li>
          <StyledLink to={'/home'}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to={'/bookings'}>
            <HiOutlineCalendar />
            <span>Bookings</span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to={'/cabins'}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to={'/dashboard'}>
            <HiOutlineChartBar />
            <span>Dashboard</span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to={'/users'}>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledLink>
        </li>

        <li>
          <StyledLink to={'/settings'}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledLink>
        </li>
      </StyledList>
    </nav>
  );
}

export default Navbar;
