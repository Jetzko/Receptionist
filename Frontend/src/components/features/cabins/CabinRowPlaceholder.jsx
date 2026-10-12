import styled from 'styled-components';
import Table from './Table';
import SpinnerMini from '../../reusable/SpinnerMini';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

function CabinRowPlaceholder() {
  return (
    <Table.Row>
      <div>
        <SpinnerMini />
      </div>
      <Cabin>{<SpinnerMini />}</Cabin>
      <div>{<SpinnerMini />}</div>
      <Price>{<SpinnerMini />}</Price>
      <div>{<SpinnerMini />}</div>
      <div>{<SpinnerMini />}</div>
      <div></div>
    </Table.Row>
  );
}

export default CabinRowPlaceholder;
