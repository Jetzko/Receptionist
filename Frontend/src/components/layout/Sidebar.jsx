import styled from 'styled-components';
import Navbar from './Navbar';
import Logo from './Logo';

const Aside = styled.aside`
  grid-row: 1 / -1;
  padding: 3.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  /* background-color: #fff; */
  background-color: var(--color-primary-tint-950);
  border-right: 1px solid var(--color-primary-tint-500);
`;

function Sidebar() {
  return (
    <Aside>
      <Logo />
      <Navbar />
    </Aside>
  );
}

export default Sidebar;
