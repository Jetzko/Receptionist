import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCabinsContext } from '../../../hooks/useCabinsContext';
import Form from '../../Form';
import FormRow from '../../FormRow';
import Input from '../../reusable/Input';
import styled from 'styled-components';
import Textarea from '../../reusable/Textarea';
import Button from '../../reusable/Button';

const CabinFormLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: var(--space-3);
  background-color: #fff;
  border-radius: var(--border-radius-sm);

  display: grid;
  grid-template-columns: auto 1fr;
`;

function CabinForm({ modal, cabin, onCloseModal }) {
  const { dispatch } = useCabinsContext();

  const { register, handleSubmit, reset, getValues, formState, errors } =
    useForm();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [admins, setAdmins] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  return (
    <CabinFormLayout>
      <Form>
        <FormRow label='Cabin name' error={errors?.name?.message}>
          <Input type='text' disabled={isWorking} id='cabin-name' />
        </FormRow>
        <FormRow label='Price' error={errors?.price?.message}>
          <Input type='text' disabled={isWorking} id='price' />
        </FormRow>
        <FormRow label='Address' error={errors?.address?.message}>
          <Input type='text' disabled={isWorking} id='address' />
        </FormRow>
        <FormRow label='Capacity' error={errors?.capacity?.message}>
          <Input type='text' disabled={isWorking} id='capacity' />
        </FormRow>
        <FormRow label='Description' error={errors?.description?.message}>
          <Textarea disabled={isWorking} id='description' />
        </FormRow>
        <FormRow label='Admins' error={errors?.admins?.message}>
          <Input type='text' disabled={isWorking} id='admins' />
        </FormRow>

        <Button variation='secondary' type='reset' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>{}</Button>
      </Form>
    </CabinFormLayout>
  );
}

export default CabinForm;
