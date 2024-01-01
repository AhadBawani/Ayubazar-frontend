import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing/Routing';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  </React.StrictMode>
);