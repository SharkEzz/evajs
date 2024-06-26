import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { Toaster } from './components/ui/toaster';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);
