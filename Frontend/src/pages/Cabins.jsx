import styled from 'styled-components';
import CabinsPanel from '../components/features/cabins/CabinsPanel';
import Row from '../components/layout/Row';
import Heading from '../components/reusable/Heading';

const AddCabinButton = styled.button`
  background-color: var(--color-secondary-tint-200);
  color: var(--color-secondary-shade-900);
  padding: var(--padding-sm);
  border-radius: var(--border-radius-md);
  border: none;
  font-weight: var(--font-weight-medium);

  &:active {
    scale: 0.98;
  }

  &:active,
  &:focus {
    outline: 2px solid var(--color-secondary-shade-100);
    outline-offset: -1px;
  }
`;

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Cabins</Heading>
      </Row>

      <Row type='vertical'>
        <CabinsPanel />
        <div>
          <AddCabinButton>Add Cabin</AddCabinButton>
        </div>
      </Row>
    </>
  );
}

export default Cabins;
