import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CabinsContextProvider } from './contexts/CabinsContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CabinsContextProvider>
      <App />
    </CabinsContextProvider>
  </StrictMode>,
);
