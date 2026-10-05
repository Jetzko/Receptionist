import styled from 'styled-components';
import Table from './Table';
import { formatCurrency } from '../../../scripts/utils';

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

function CabinRow({ cabin }) {
  const { _id, name, price, address, capacity, status, users } = cabin;

  return (
    <Table.Row>
      <div></div>
      <Cabin>{name}</Cabin>
      <div>Fits up to {capacity} guests</div>
      <Price>{formatCurrency(price)}</Price>
      <div>{address}</div>
      <div>{status}</div>
    </Table.Row>
  );
}

export default CabinRow;
