import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Footer from './Footer';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const Main = styled.main`
  overflow: scroll;
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
        <Footer />
      </Main>
    </Layout>
  );
}

export default AppLayout;
