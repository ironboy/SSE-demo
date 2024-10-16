import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './sass/main.scss';
import * as ReactBootstrap from 'react-bootstrap';
import * as Easier from 'react-easier';

// export React Bootstrap and React Easier components & hooks as globals
Object.assign(globalThis, ReactBootstrap, Easier);

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
