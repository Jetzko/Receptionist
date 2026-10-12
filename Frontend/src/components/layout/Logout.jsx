import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../reusable/ButtonIcon';
import { useLogout } from '../../hooks/useLogout';

function Logout() {
  const { logout } = useLogout();

  function handleClick() {
    logout();
  }
  return (
    <ButtonIcon onClick={handleClick}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
