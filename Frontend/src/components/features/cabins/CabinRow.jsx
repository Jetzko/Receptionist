import styled from 'styled-components';
import Table from './Table';
import { formatCurrency } from '../../../scripts/utils';
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

function CabinRow({ cabin, isLoading }) {
  const { _id, name, price, address, capacity, status, users } = cabin;

  if (!isLoading)
    return (
      <Table.Row>
        <div></div>
        <Cabin>{name}</Cabin>
        <div>Fits up to ${capacity} guests</div>
        <Price>{formatCurrency(price)}</Price>
        <div>{address}</div>
        <div>{status}</div>
        <div></div>
      </Table.Row>
    );
  if (isLoading)
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

export default CabinRow;
