import { useState } from 'react';
import { useCabinsContext } from '../hooks/useCabinsContext';

function CabinForm() {
  const { dispatch } = useCabinsContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [admins, setAdmins] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  return <form></form>;
}

export default CabinForm;
