import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Economics from './pages/Economics';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/cabins' element={<Cabins />} />
        <Route path='/economics' element={<Economics />} />
        <Route path='/login' element={<Login />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
