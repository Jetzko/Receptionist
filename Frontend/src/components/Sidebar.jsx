import styled from 'styled-components';
import Navbar from './Navbar';
import Logo from './Logo';

const Aside = styled.aside`
  grid-row: 1 / -1;
  padding: 3.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
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
