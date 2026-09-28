import styled from 'styled-components';
import Overview from '../components/features/home/Overview';
import WeekPreview from '../components/features/home/WeekPreview';
import Tasks from '../components/features/home/Tasks';
import Row from '../components/layout/Row';
import Heading from '../components/reusable/Heading';

const News = styled.div`
  display: grid;
  grid-template-rows: auto var(--space-10) auto;
  /* background-color: #fff; */
  gap: var(--space-5);
  box-shadow: -50px, 0, 10px, black;
`;

function Home() {
  return (
    <>
      <Row type='vertical'>
        <Heading as='h1'>Home</Heading>
        <Overview />
      </Row>
      <Row type='vertical'>
        <WeekPreview />
        <Tasks />
      </Row>
    </>
  );
}

export default Home;
