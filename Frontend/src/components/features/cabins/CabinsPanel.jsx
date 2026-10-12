import Menus from './Menus';
import Table from './Table';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';
import CabinRow from './CabinRow';
import { useSetCabins } from '../../../hooks/useSetCabins';
import { useCabinsContext } from '../../../hooks/useCabinsContext';
import SpinnerMini from '../../reusable/SpinnerMini';

function CabinsPanel() {
  const { setCabins, isLoading, error } = useSetCabins();
  const { cabins } = useCabinsContext();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      setCabins();
    }
  }, [user]);

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Users</div>
          <div>Status</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={cabins}
          isLoading={isLoading}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin._id} isLoading={isLoading} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinsPanel;
