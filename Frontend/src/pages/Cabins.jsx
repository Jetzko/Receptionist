import { useState } from 'react';
import styled from 'styled-components';
import CabinsPanel from '../components/features/cabins/CabinsPanel';
import Row from '../components/layout/Row';
import Heading from '../components/reusable/Heading';
import CabinForm from '../components/features/cabins/CabinForm';
import Modal from '../components/Modal';

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
  const [modal, setModal] = useState(null);
  const [cabin, setCabin] = useState('');

  function handleCreateModal() {
    setModal('create');
  }

  function handleCloseModal() {
    setModal(null);
    setCabin('');
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Cabins</Heading>
      </Row>

      <Row type='vertical'>
        <CabinsPanel modal={modal} />
        <div>
          <AddCabinButton onClick={handleCreateModal}>Add Cabin</AddCabinButton>
        </div>
      </Row>
      {modal && (
        <Modal onClose={handleCloseModal}>
          <CabinForm mode={modal} cabin={cabin} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default Cabins;
