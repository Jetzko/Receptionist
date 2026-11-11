import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CabinsContextProvider } from './contexts/CabinsContextProvider.jsx';
import { AuthContextProvider } from './contexts/AuthContextProvider.jsx';
import { UsersContextProvider } from './contexts/UsersContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <CabinsContextProvider>
          <App />
        </CabinsContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
