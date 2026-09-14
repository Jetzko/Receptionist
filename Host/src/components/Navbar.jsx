import { Link } from 'react-router';

function Navbar() {
  return (
    <header>
      <div className='container'>
        <Link to={'/'}>Home</Link>
        <Link to={'/cabins'}>Cabins</Link>
        <Link to={'/account'}>Account</Link>
        <Link to={'/bookings'}>Bookings</Link>
        <Link to={'/economics'}>Economics</Link>
        <Link to={'/settings'}>Settings</Link>
        <Link to={'/login'}>Login</Link>
        {/* <Link to={'/not-found'}></Link> */}
      </div>
    </header>
  );
}

export default Navbar;
