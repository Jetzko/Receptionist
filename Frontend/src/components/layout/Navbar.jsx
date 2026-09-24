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

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledLink = styled(NavLink)`
  display: flex;
  gap: 1.2rem;

  align-items: center;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-indigo-400);

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-indigo-600);
    background-color: var(--color-indigo-0);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-indigo-200);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-indigo-700);
  }
`;

function Navbar() {
  return (
    <StyledNavbar>
      <StyledLink to={'/home'}>
        <HiOutlineHome />
        <span>Home</span>
      </StyledLink>

      <StyledLink to={'/bookings'}>
        <HiOutlineCalendar />
        <span>Bookings</span>
      </StyledLink>

      <StyledLink to={'/cabins'}>
        <HiOutlineHomeModern />
        <span>Cabins</span>
      </StyledLink>

      <StyledLink to={'/dashboard'}>
        <HiOutlineChartBar />
        <span>Dashboard</span>
      </StyledLink>

      <StyledLink to={'/users'}>
        <HiOutlineUsers />
        <span>Users</span>
      </StyledLink>

      <StyledLink to={'/settings'}>
        <HiOutlineCog6Tooth />
        <span>Settings</span>
      </StyledLink>
    </StyledNavbar>
  );
}

export default Navbar;
