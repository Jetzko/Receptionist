import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Footer from './Footer';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const Main = styled.main`
  overflow: scroll;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-primary-tint-900);
`;

const Container = styled.section`
  max-width: var(--space-13);
  margin: 0;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
`;

function AppLayout() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </Main>
    </Layout>
  );
}

export default AppLayout;
