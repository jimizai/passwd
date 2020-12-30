import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configStore from './store';
import './assets/styles/reset.scss';
import './assets/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
