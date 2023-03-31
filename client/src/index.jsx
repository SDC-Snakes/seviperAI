import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './components/App';

const domNode = document.getElementById('root') || document.createElement('div'); // for testing purposes
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
